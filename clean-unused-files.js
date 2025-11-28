const fs = require('fs');
const path = require('path');

const REPEATED_ITEMS_DIR = path.join(__dirname, 'repeated_items');
const MODULE_DIR = __dirname;

// Get all files in repeated_items recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Get all files in module directory (excluding repeated_items)
function getModuleFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (
      file === 'repeated_items' ||
      file === 'node_modules' ||
      file === '.git'
    ) {
      return;
    }

    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getModuleFiles(filePath, arrayOfFiles);
    } else if (filePath.match(/\.(tsx?|jsx?)$/)) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Check if a file is referenced in module files or within repeated_items itself
function isFileReferenced(repeatedItemFile, moduleFiles, repeatedItemFiles) {
  const relativePath = path.relative(REPEATED_ITEMS_DIR, repeatedItemFile);
  const fileName = path.basename(
    repeatedItemFile,
    path.extname(repeatedItemFile)
  );

  // Create possible import patterns for external references (from module files)
  const relativePathNormalized = relativePath.replace(/\\/g, '/');
  const relativePathWithoutExt = relativePathNormalized.replace(
    /\.(tsx?|jsx?)$/,
    ''
  );

  const externalPatterns = [
    relativePathNormalized,
    relativePathWithoutExt,
    `./repeated_items/${relativePathNormalized}`,
    `./repeated_items/${relativePathWithoutExt}`,
    `repeated_items/${relativePathNormalized}`,
    `repeated_items/${relativePathWithoutExt}`,
  ];

  // If this is an index file, also check for directory imports
  const isIndexFile = fileName === 'index';
  if (isIndexFile) {
    const fileDir = path.dirname(repeatedItemFile);
    const dirRelativePath = path.relative(REPEATED_ITEMS_DIR, fileDir);
    const dirNormalized = dirRelativePath.replace(/\\/g, '/');
    externalPatterns.push(
      dirNormalized,
      `./${dirNormalized}`,
      `./repeated_items/${dirNormalized}`,
      `repeated_items/${dirNormalized}`
    );
  }

  // Check if referenced from module files
  for (const moduleFile of moduleFiles) {
    const content = fs.readFileSync(moduleFile, 'utf8');

    // Calculate pattern from this specific module file's location
    const moduleFileDir = path.dirname(moduleFile);
    const relativeFromModule = path.relative(moduleFileDir, repeatedItemFile);
    const relativeFromModuleWithoutExt = relativeFromModule.replace(
      /\.(tsx?|jsx?)$/,
      ''
    );
    const normalizedFromModule = relativeFromModuleWithoutExt.replace(
      /\\/g,
      '/'
    );

    // For index files, also check directory import from module
    const specificPatterns = [
      normalizedFromModule,
      `./${normalizedFromModule}`,
    ];
    if (isIndexFile) {
      const fileDir = path.dirname(repeatedItemFile);
      const dirFromModule = path.relative(moduleFileDir, fileDir);
      const normalizedDir = dirFromModule.replace(/\\/g, '/');
      specificPatterns.push(normalizedDir, `./${normalizedDir}`);
    }

    // Check module-specific patterns first
    for (const pattern of specificPatterns) {
      if (isImported(content, pattern)) {
        return true;
      }
    }

    // Check generic path-based patterns
    for (const pattern of externalPatterns) {
      if (isImported(content, pattern)) {
        return true;
      }
    }
  }

  // Check if referenced from other files within repeated_items
  const fileDir = path.dirname(repeatedItemFile);
  const fileNameWithoutExt = path.basename(
    repeatedItemFile,
    path.extname(repeatedItemFile)
  );

  for (const otherFile of repeatedItemFiles) {
    if (otherFile === repeatedItemFile) continue;

    const content = fs.readFileSync(otherFile, 'utf8');
    const otherFileDir = path.dirname(otherFile);

    // Calculate relative path from otherFile to repeatedItemFile
    const relativeFromOther = path.relative(otherFileDir, repeatedItemFile);
    const relativeWithoutExt = relativeFromOther.replace(/\.(tsx?|jsx?)$/, '');
    const normalizedRelative = relativeWithoutExt.replace(/\\/g, '/');

    // Also calculate path relative to repeated_items and check for imports like ../components/...
    const fileRelativeToRepeatedItems = path.relative(
      REPEATED_ITEMS_DIR,
      repeatedItemFile
    );
    const fileRelativeWithoutExt = fileRelativeToRepeatedItems.replace(
      /\.(tsx?|jsx?)$/,
      ''
    );
    const otherRelativeToRepeatedItems = path.relative(
      REPEATED_ITEMS_DIR,
      otherFileDir
    );

    // Build pattern like ../components/room/PlayerName
    const partsToRepeatedItems = otherRelativeToRepeatedItems
      .split(path.sep)
      .filter((p) => p);
    const goUpLevels =
      partsToRepeatedItems.length > 0
        ? '../'.repeat(partsToRepeatedItems.length)
        : './';
    const fromRootPattern =
      goUpLevels + fileRelativeWithoutExt.replace(/\\/g, '/');

    // Also check if this is an index file that might be imported by its directory
    const isIndexFile = fileNameWithoutExt === 'index';

    // Create internal import patterns
    const internalPatterns = [
      normalizedRelative,
      `./${normalizedRelative}`,
      fromRootPattern,
    ];

    // If it's an index file, also check for directory imports
    if (isIndexFile) {
      const relativeDir = path.relative(otherFileDir, fileDir);
      const normalizedDir = relativeDir.replace(/\\/g, '/');
      if (normalizedDir && normalizedDir !== '.') {
        internalPatterns.push(normalizedDir, `./${normalizedDir}`);
      }

      // Also check for imports from repeated_items root
      const dirRelativeToRepeatedItems = path.relative(
        REPEATED_ITEMS_DIR,
        fileDir
      );
      if (partsToRepeatedItems.length > 0) {
        const dirFromRootPattern =
          goUpLevels + dirRelativeToRepeatedItems.replace(/\\/g, '/');
        internalPatterns.push(dirFromRootPattern);
      } else {
        // If we're at the root of repeated_items, check for ./dirname pattern
        const dirName = path.basename(fileDir);
        internalPatterns.push(`./${dirName}`, dirName);
      }
    }

    for (const pattern of internalPatterns) {
      if (isImported(content, pattern)) {
        return true;
      }
    }
  }

  return false;
}

// Check if a path is imported in the content using regex
function isImported(content, importPath) {
  // Escape special regex characters in the import path
  const escapedPath = importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Match import statements:
  // - import ... from 'path' or "path"
  // - require('path') or require("path")
  // - import('path') or import("path")
  const importRegex = new RegExp(
    `(?:from\\s+['"\`]${escapedPath}['"\`]|` +
      `require\\s*\\(['"\`]${escapedPath}['"\`]\\)|` +
      `import\\s*\\(['"\`]${escapedPath}['"\`]\\))`,
    'g'
  );

  return importRegex.test(content);
}

// Main function
function cleanUnusedFiles() {
  console.log('🔍 Scanning for unused files...\n');

  const repeatedItemFiles = getAllFiles(REPEATED_ITEMS_DIR).filter((file) =>
    file.match(/\.(tsx?|jsx?)$/)
  );
  const moduleFiles = getModuleFiles(MODULE_DIR);

  console.log(`Found ${repeatedItemFiles.length} files in repeated_items`);
  console.log(`Found ${moduleFiles.length} module files to check\n`);

  const unusedFiles = [];

  repeatedItemFiles.forEach((repeatedFile) => {
    if (!isFileReferenced(repeatedFile, moduleFiles, repeatedItemFiles)) {
      unusedFiles.push(repeatedFile);
    }
  });

  if (unusedFiles.length === 0) {
    console.log('✅ No unused files found!');
    return;
  }

  console.log(`\n⚠️  Found ${unusedFiles.length} unused files:\n`);
  unusedFiles.forEach((file) => {
    const relativePath = path.relative(MODULE_DIR, file);
    console.log(`  - ${relativePath}`);
  });

  console.log('\n❓ Do you want to delete these files?');
  console.log('   Run with --delete flag to delete them.\n');

  if (process.argv.includes('--delete')) {
    console.log('🗑️  Deleting unused files...\n');

    unusedFiles.forEach((file) => {
      try {
        fs.unlinkSync(file);
        const relativePath = path.relative(MODULE_DIR, file);
        console.log(`  ✓ Deleted: ${relativePath}`);
      } catch (err) {
        console.error(`  ✗ Failed to delete: ${file}`, err.message);
      }
    });

    // Clean up empty directories
    cleanEmptyDirectories(REPEATED_ITEMS_DIR);

    console.log('\n✅ Cleanup complete!');
  }
}

// Remove empty directories
function cleanEmptyDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);

  if (files.length === 0) {
    fs.rmdirSync(dirPath);
    console.log(
      `  ✓ Removed empty directory: ${path.relative(MODULE_DIR, dirPath)}`
    );
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      cleanEmptyDirectories(filePath);
    }
  });

  // Check again after cleaning subdirectories
  if (fs.readdirSync(dirPath).length === 0) {
    fs.rmdirSync(dirPath);
    console.log(
      `  ✓ Removed empty directory: ${path.relative(MODULE_DIR, dirPath)}`
    );
  }
}

// Extract exported constants/variables from a file
function getExportedConstants(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const constants = [];

  // Match: export const NAME = ...
  const namedExportRegex = /export\s+const\s+(\w+)\s*[:=]/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    constants.push(match[1]);
  }

  // Match: export { NAME1, NAME2 }
  const exportListRegex = /export\s*\{([^}]+)\}/g;
  while ((match = exportListRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) =>
      n
        .trim()
        .split(/\s+as\s+/)[0]
        .trim()
    );
    constants.push(...names);
  }

  return [...new Set(constants)]; // Remove duplicates
}

// Check if a constant is used in any file
function isConstantUsed(
  constantName,
  filePath,
  moduleFiles,
  repeatedItemFiles
) {
  const allFiles = [
    ...moduleFiles,
    ...repeatedItemFiles.filter((f) => f !== filePath),
  ];

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');

      // Check if constant is imported by name
      const importRegex = new RegExp(
        `\\{[^}]*\\b${constantName}\\b[^}]*\\}`,
        'g'
      );

      // Check if constant is used directly in code
      const usageRegex = new RegExp(`\\b${constantName}\\b`, 'g');

      if (importRegex.test(content) || usageRegex.test(content)) {
        return true;
      }
    } catch (err) {
      // Skip files that can't be read
    }
  }

  return false;
}

// Remove unused constants from a file
function removeUnusedConstants(filePath, unusedConstants) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const constantName of unusedConstants) {
    // Remove: export const NAME = ...;
    const exportConstRegex = new RegExp(
      `export\\s+const\\s+${constantName}\\s*[:=][^;]*;?\\s*\\n?`,
      'g'
    );

    // Remove: NAME from export { NAME, ... }
    const exportListRegex = new RegExp(
      `(export\\s*\\{[^}]*),?\\s*${constantName}\\s*,?([^}]*\\})`,
      'g'
    );

    const newContent = content
      .replace(exportConstRegex, '')
      .replace(exportListRegex, (match, before, after) => {
        // Clean up commas
        let cleaned = before.replace(/,\s*$/, '') + after.replace(/^\s*,/, '');
        // Remove empty export statements
        if (cleaned.match(/export\s*\{\s*\}/)) {
          return '';
        }
        return cleaned;
      });

    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return modified;
}

// Clean unused constants from repeated_items files
function cleanUnusedConstants() {
  console.log('🔍 Scanning for unused constants in repeated_items...\n');

  const repeatedItemFiles = getAllFiles(REPEATED_ITEMS_DIR).filter((file) =>
    file.match(/\.(tsx?|jsx?)$/)
  );
  const moduleFiles = getModuleFiles(MODULE_DIR);

  const unusedConstantsMap = new Map();

  repeatedItemFiles.forEach((file) => {
    const constants = getExportedConstants(file);
    if (constants.length === 0) return;

    const unusedInFile = [];

    constants.forEach((constantName) => {
      if (!isConstantUsed(constantName, file, moduleFiles, repeatedItemFiles)) {
        unusedInFile.push(constantName);
      }
    });

    if (unusedInFile.length > 0) {
      unusedConstantsMap.set(file, unusedInFile);
    }
  });

  if (unusedConstantsMap.size === 0) {
    console.log('✅ No unused constants found!');
    return;
  }

  console.log(
    `\n⚠️  Found unused constants in ${unusedConstantsMap.size} files:\n`
  );

  for (const [file, constants] of unusedConstantsMap) {
    const relativePath = path.relative(MODULE_DIR, file);
    console.log(`  📄 ${relativePath}:`);
    constants.forEach((c) => console.log(`     - ${c}`));
  }

  console.log('\n❓ Do you want to delete these constants?');
  console.log('   Run with --delete-constants flag to delete them.\n');

  if (process.argv.includes('--delete-constants')) {
    console.log('🗑️  Deleting unused constants...\n');

    for (const [file, constants] of unusedConstantsMap) {
      const relativePath = path.relative(MODULE_DIR, file);
      if (removeUnusedConstants(file, constants)) {
        console.log(`  ✓ Updated: ${relativePath}`);
        constants.forEach((c) => console.log(`     - Removed: ${c}`));
      }
    }

    console.log('\n✅ Constants cleanup complete!');
  }
}

// Run the script
const args = process.argv.slice(2);

if (args.includes('--delete-constants') || args.includes('--constants')) {
  cleanUnusedConstants();
} else {
  cleanUnusedFiles();
}

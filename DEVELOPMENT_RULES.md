# Development Rules for frontend_ballot_league

## Version Management

### Rule 1: Package Version Consistency

Current version must be: **1.0.0**

This must match the version in frontend_ballot/package.json:

```json
"@abdlarahman/frontend-league": "^1.0.0"
```

**Enforcement:**

- Check `package.json` version before publishing
- Coordinate with frontend_ballot team before version bumps
- Follow semantic versioning (MAJOR.MINOR.PATCH)

### Rule 1.1: Dependency Version Synchronization

**CRITICAL:** All dependency and devDependency versions MUST match frontend_ballot/package.json exactly.

**Required devDependencies:**

```json
{
  "@babel/core": "^7.24.0",
  "@types/react": "~19.0.10",
  "babel-plugin-module-resolver": "^5.0.2",
  "jest": "^29.7.0",
  "jest-expo": "~53.0.10",
  "react-test-renderer": "18.2.0",
  "typescript": "~5.8.3"
}
```

**Enforcement:**

- Before every publish, compare with frontend_ballot/package.json
- Never use different versions than frontend_ballot
- If frontend_ballot updates a package, update this module immediately

## Module Independence

### Rule 2: No Cross-Module Imports

This module should be completely independent and NEVER import from other ballot modules.

**✅ Allowed:**

```typescript
// NPM packages
import { ApolloClient, gql } from '@apollo/client';
import { View, Text, FlatList } from 'react-native';

// Internal module files
import { leagueStyles } from './styles/leagueStyles';
import { GET_LEAGUE_DATA } from './schema/league';
```

**❌ Forbidden:**

```typescript
import { Room } from '@abdlarahman/frontend-game-logic';
import { Login } from '@abdlarahman/frontend-auth';
import { Chat } from '@abdlarahman/frontend-general-chat';
import { SomeUtil } from '../frontend_ballot_auth/utils';
```

**Enforcement:**

- Grep check: `grep -r "@abdlarahman/frontend-" src/`
- All module dependencies must be peer dependencies if needed
- Keep module focused on league management only

## Code Modification Guidelines

### Rule 3: Protected Files - No Modifications Without Markers

Files in `repeated_items` folders should NOT be modified directly. If changes are absolutely necessary, use comment markers:

**Required Format:**

```typescript
// ! start changing [reason for change]
// Modified code here
// ! end of changing
```

**Example:**

```typescript
// ! start changing - Added league ranking calculation
export const calculateRanking = (teams: Team[]) => {
  return teams.sort((a, b) => b.points - a.points);
};
// ! end of changing
```

**Protected Directories:**

- `repeated_items/*` (if exists in this module)

## Module Scope

### Rule 4: League Module Boundaries

This module should ONLY handle:

- League creation and management
- Team standings and rankings
- League schedules
- League-related UI components
- League-related GraphQL schemas

**Out of Scope:**

- Game logic/gameplay
- User authentication
- Chat functionality
- Any features from other modules

### Rule 5: Export Guidelines

Only export what's needed by frontend_ballot:

**Main Exports (index.ts or src/index.ts):**

```typescript
// Components
export { League } from './components/League';
export { CreateLeague } from './components/CreateLeague';
export { LeagueList } from './components/LeagueList';

// Hooks
export { useLeague } from './hooks/useLeague';

// Types
export type { LeagueData, TeamData } from './types';

// Styles (if needed)
export { leagueStyles } from './styles/leagueStyles';
```

## Publishing Rules

### Rule 6: Pre-Publish Checklist

Before running `npm publish`:

- [ ] Version matches frontend_ballot expectations (1.0.0)
- [ ] No imports from other @abdlarahman modules
- [ ] All repeated_items changes have markers
- [ ] TypeScript compiles without errors
- [ ] README is up-to-date
- [ ] CHANGELOG documents changes
- [ ] Tests pass

### Rule 7: Post-Publish Steps

After publishing:

1. Test installation in frontend_ballot
2. Verify all exports are accessible
3. Check for TypeScript errors in consuming project
4. Update frontend_ballot if needed

## Violation Checklist

Before committing, verify:

- [ ] Version is 1.0.0 (or coordinated bump)
- [ ] Zero imports from other ballot modules
- [ ] Changes to repeated_items have proper markers
- [ ] Module stays within league management scope
- [ ] All exports are clean and documented

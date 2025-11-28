# External Dependencies

This module requires the following external dependencies from the main project:

## Constants
- `constants/Colors.ts` - Color definitions
- `constants/fonts.ts` - Font definitions
- `constants/Images.ts` - Image constants

## Shared Components
- `components/shared/Header` - Header component
- `components/shared/Mix` - Mix component
- `components/shared/AvatarWith4Cards` - Avatar component
- `components/friends/linearButton2` - Linear button component

## Assets
- `assets/shared/sharedIcons` - Shared icon assets

## Utilities
- `utils/changeLevelsToAR` - Level conversion utility
- `utils/Display` - Display utility

## Contexts
- `context/onlineContext` - Online context for league state management

## Styles
- `styles/authStyles` - Authentication styles
- `styles/commonStyles` - Common styles

## Other Components Dependencies
- `components/chat/icons` - Chat icons
- `components/chat/styles` - Chat styles
- `components/friends/svg` - Friends SVG components
- `components/friends/Index` - Friends styles

## Usage in Main Project

When using this module in the main project, ensure these paths are properly configured:

```typescript
// In main project, you may need to re-export these
export { default as Colors } from './constants/Colors';
export { default as fonts } from './constants/fonts';
// ... etc
```

Or configure path aliases in your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/constants/*": ["./constants/*"],
      "@/components/*": ["./components/*"],
      "@/utils/*": ["./utils/*"],
      "@/context/*": ["./context/*"],
      "@/styles/*": ["./styles/*"],
      "@/assets/*": ["./assets/*"]
    }
  }
}
```

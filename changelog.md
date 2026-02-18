# Changelog

All notable changes to the Daggerheart Spotlight Tracker module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2025-02-17

### Added
- UI button in Token Controls (left sidebar) for quick access to Spotlight Tracker
- Button appears at bottom of Token Control tools when GM is logged in
- Matches Foundry's native tool button styling

### Technical Details
- Uses `renderSceneControls` hook for reliable button placement
- jQuery wrapping for Foundry v13 compatibility
- Button auto-removes and re-adds on sidebar re-render to prevent duplicates

## [1.0.1] - 2025-01-23

### Changed
- Removed excessive debug logging from console output
- Simplified module load message
- Cleaned up verbose console chatter for production release

### Technical Details
- Removed emoji debugging logs (🟢🟡🌟✅)
- Removed detailed hook firing messages
- Kept only essential load confirmation message
- No functional changes to module behavior

## [1.0.0] - 2025-01-23

### Added
- Initial release of Daggerheart Spotlight Tracker
- Automatic spotlight tracking for duality rolls (non-reaction)
- Manual increment/decrement controls for spotlight counts
- Draggable tracker window with character list
- Smart sorting (characters with fewer spotlights appear first)
- "Refresh List" button to update character list when players join/leave
- Only shows characters of currently online players
- "Reset All Counts" button to clear session data
- Keyboard shortcut (Shift+T) to open tracker
- Macro support for opening tracker
- Persistent storage of spotlight counts between sessions
- GM-only visibility
- Real-time tracker updates when duality rolls occur
- Visual notifications when characters are spotlighted

### Technical Details
- Compatible with Foundry VTT v12-v13
- Built for Daggerheart system (Foundryborne)
- Uses `createChatMessage` hook to detect duality rolls
- Filters by `message.type === 'dualityRoll'`
- Stores data in world settings (persistent)

[Unreleased]: https://github.com/MrJamela/daggerheart-spotlight-tracker/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/MrJamela/daggerheart-spotlight-tracker/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/MrJamela/daggerheart-spotlight-tracker/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/MrJamela/daggerheart-spotlight-tracker/releases/tag/v1.0.0

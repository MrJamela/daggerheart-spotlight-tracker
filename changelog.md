# Changelog

All notable changes to the Daggerheart Spotlight Tracker module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/MrJamela/daggerheart-spotlight-tracker/releases/tag/1.0.0

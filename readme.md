# Daggerheart Spotlight Tracker

A Foundry VTT module for GMs running Daggerheart games to track how many times each player character has been spotlighted during a session, helping maintain balanced player engagement.

![Foundry Version](https://img.shields.io/badge/Foundry-v12%20--%20v13-green)
![System](https://img.shields.io/badge/System-Daggerheart-blue)
![Latest Release](https://img.shields.io/github/v/release/yourusername/daggerheart-spotlight-tracker)

## Features

- 🌟 **Automatic Tracking**: Automatically increments spotlight count when players make duality rolls
- 📊 **Visual Tracker Window**: Clean, draggable interface showing all active player characters
- 🎯 **Smart Sorting**: Characters with fewer spotlights appear first, making it easy to balance engagement
- ✋ **Manual Controls**: Increment/decrement counts manually if needed
- 🔄 **Refresh List**: Update the character list when players join or leave
- 🔴 **Session Reset**: Clear all counts at the start of a new session
- 🎮 **GM Only**: All tracking is visible only to the GM
- ⌨️ **Keyboard Shortcut**: Press Shift+T to quickly open the tracker
- 💾 **Persistent Storage**: Counts are saved and persist between sessions until manually reset

## Installation

### Method 1: Via Foundry (Recommended - Once Published)

1. In Foundry VTT, go to **Add-on Modules**
2. Click **Install Module**
3. Search for "Daggerheart Spotlight Tracker"
4. Click **Install**

### Method 2: Manual Installation

1. Download the [latest release](https://github.com/MrJamela/daggerheart-spotlight-tracker/releases/latest)
2. Extract the zip file to your `Data/modules/` folder
3. Restart Foundry VTT
4. Enable the module in your Daggerheart world

### Method 3: Manifest URL

Use this URL in the "Install Module" dialog:
```
https://github.com/MrJamela/daggerheart-spotlight-tracker/releases/latest/download/module.json
```

## Usage

### Opening the Tracker

**Option 1: Keyboard Shortcut**
- Press `Shift + T` to open the tracker window

**Option 2: Macro**
1. Create a new Script macro
2. Paste: `openSpotlightTracker();`
3. Drag to your hotbar and click to open

### Automatic Tracking

The module automatically tracks spotlight moments when:
- A player character makes a **duality roll** (the 2d12 Hope/Fear roll)
- The roll is **not a reaction roll**

When a duality roll is made:
- The character's spotlight count increments by 1
- A notification appears (optional)
- If the tracker is open, it updates in real-time

### Manual Controls

**Increment (+)**: Click the `+` button next to a character to manually add a spotlight

**Decrement (-)**: Click the `-` button to reduce the count (useful for corrections)

**Refresh List**: Click to update the character list when players join/leave

**Reset All Counts**: Click to clear all spotlight counts (asks for confirmation)

### Understanding the Tracker

- **Characters are sorted by spotlight count** (lowest first)
- **Only shows online players** by default
- **Green/Red highlights** (future feature) could indicate who needs attention
- **Total Spotlights** shows the session total across all characters

## Configuration

### Settings

Currently, the module has no user-configurable settings. All functionality is accessed through the tracker window.

### Customization

If you want to customize notifications or behavior, you can edit the module files directly (advanced users only).

## Tips for GMs

- **Don't stress perfect equality**: This is a guide, not a strict rule. Some scenes naturally focus on certain characters.
- **Use as a reminder**: If someone's at 1 spotlight while others are at 5-6, look for opportunities to bring them in.
- **Define "spotlight" for your table**: A spotlight could be a major scene, a skill check, or just meaningful character interaction.
- **Reset between sessions**: Click "Reset All Counts" at the start of each session for a fresh start.
- **Keep it visible**: Leave the tracker open during play for quick reference.

## Compatibility

- **Foundry VTT**: v12 - v13
- **Game System**: Daggerheart (Foundryborne) v1.0.0+
- **Conflicts**: None known

## Known Issues

- None currently reported

## Roadmap

Potential future features:
- [ ] Visual indicators (color coding) for spotlight imbalance
- [ ] Session history tracking
- [ ] Export/import spotlight data
- [ ] Customizable notification settings
- [ ] Support for different "spotlight types" (combat, roleplay, etc.)

## Support

- **Issues**: [Report bugs or request features](https://github.com/MrJamela/daggerheart-spotlight-tracker/issues)
- **Discussions**: [Join the discussion](https://github.com/MrJamela/daggerheart-spotlight-tracker/discussions)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This module is licensed under the [MIT License](LICENSE).

## Credits

- **Created by**: MrJamela - using ClaudeAI (Sonnet 4.5)
- **Daggerheart System**: [Foundryborne](https://github.com/Foundryborne/daggerheart)
- **Daggerheart RPG**: © Darrington Press LLC

## Disclaimer

This is an unofficial fan-created module and is not affiliated with or endorsed by Darrington Press, Critical Role, or the Foundryborne development team.

---

**If you find this module helpful, consider:**
- ⭐ Starring the repository
- 🐛 Reporting bugs or suggesting features
- 📢 Sharing with other Daggerheart GMs

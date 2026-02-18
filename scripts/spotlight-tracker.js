// Setup when Foundry is ready
Hooks.once('ready', function() {
  console.log('Daggerheart Spotlight Tracker | Ready');
  
  // Only show notification for GMs
  if (!game.user.isGM) {
    console.log('Daggerheart Spotlight Tracker | User is not GM');
    return;
  }
  
  // Test if hooks are working
  console.log('Daggerheart Spotlight Tracker | Testing if createChatMessage hook is registered...');
  console.log('Daggerheart Spotlight Tracker | Registered hooks:', Hooks.events.createChatMessage);
  
  // Show a notification about how to open it
  ui.notifications.info('Spotlight Tracker loaded! Use macro or press Shift+T to open.');
  
  // Try to detect ALL possible hooks that might fire
  console.log('Daggerheart Spotlight Tracker | Listening to ALL chat-related hooks for debugging...');
});

// AUTO-INCREMENT: Listen for duality dice rolls
Hooks.on('createChatMessage', async (message, options, userId) => {
  // Only run for GMs
  if (!game.user.isGM) return;
  
  // Check if this is a duality roll (not a reaction)
  if (message.type === 'dualityRoll') {
    // Get the actor who made the roll
    const actorId = message.speaker?.actor;
    const actor = actorId ? game.actors.get(actorId) : null;
    
    if (actor && actor.type === 'character' && actor.hasPlayerOwner) {
      // Increment the spotlight count
      const counts = game.settings.get('daggerheart-spotlight-tracker', 'spotlightCounts');
      counts[actor.id] = (counts[actor.id] || 0) + 1;
      await game.settings.set('daggerheart-spotlight-tracker', 'spotlightCounts', counts);
      
      // Show a notification
      ui.notifications.info(`${actor.name} spotlighted! (${counts[actor.id]} times this session)`);
      
      // If the tracker window is open, refresh it
      const trackerApp = Object.values(ui.windows).find(app => app.id === 'spotlight-tracker');
      if (trackerApp) {
        trackerApp.render();
      }
    }
  }
});// ========================================
// DAGGERHEART SPOTLIGHT TRACKER MODULE
// ========================================
// This module helps GMs track how many times each player character
// has been spotlighted during a session for balanced gameplay

console.log("Daggerheart Spotlight Tracker | Script loaded");

// MODULE INITIALIZATION
Hooks.once('init', async function() {
  console.log('Daggerheart Spotlight Tracker | Initializing');
  
  // Register module settings (saves data between sessions)
  game.settings.register('daggerheart-spotlight-tracker', 'spotlightCounts', {
    name: 'Spotlight Counts',
    scope: 'world',
    config: false,
    type: Object,
    default: {}
  });
  
  // Register keybinding DURING init (required by Foundry v13)
  try {
    game.keybindings.register('daggerheart-spotlight-tracker', 'openTracker', {
      name: 'Open Spotlight Tracker',
      hint: 'Opens the spotlight tracker window',
      editable: [
        {
          key: 'KeyT',
          modifiers: ['Shift']
        }
      ],
      onDown: () => {
        if (game.user.isGM) {
          new SpotlightTracker().render(true);
        }
        return true;
      },
      restricted: true  // GM only
    });
    
    console.log('Daggerheart Spotlight Tracker | Keybinding registered (Shift+T)');
  } catch (e) {
    console.error('Daggerheart Spotlight Tracker | Error registering keybinding:', e);
  }
  
  console.log('Daggerheart Spotlight Tracker | Settings registered');
});

// Setup when Foundry is ready
Hooks.once('ready', function() {
  console.log('Daggerheart Spotlight Tracker | Module loaded');
  
  // Only show notification for GMs
  if (!game.user.isGM) return;
  
  // Show a notification about how to open it
  ui.notifications.info('Spotlight Tracker loaded! Press Shift+T to open.');
});

// Add Spotlight Tracker button to left sidebar (Token Controls)
Hooks.on('renderSceneControls', (app, html, data) => {
  if (!game.user.isGM) return;
  
  // Wrap html in jQuery if it's not already (Foundry v13 compatibility)
  const $html = html instanceof jQuery ? html : $(html);
  
  // Find the tools menu in the Token controls
  const toolsMenu = $html.find('#scene-controls-tools');
  
  if (toolsMenu.length === 0) return;
  
  // Remove existing button if it exists (clean slate)
  toolsMenu.find('.spotlight-tracker-tool').remove();
  
  // Create container (li element)
  const container = $('<li></li>');
  
  // Create button (matching token control style)
  const button = $(`
    <button type="button" 
            class="control ui-control tool icon button fa-solid fa-star spotlight-tracker-tool" 
            data-action="tool" 
            data-tool="spotlight-tracker" 
            aria-label="Spotlight Tracker" 
            aria-pressed="false" 
            data-tooltip="">
    </button>
  `);
  
  button.on('click', () => {
    new SpotlightTracker().render(true);
  });
  
  container.append(button);
  
  // Append to the end of the tools menu
  toolsMenu.append(container);
});

// SPOTLIGHT TRACKER WINDOW CLASS
// Using legacy Application class for maximum compatibility
class SpotlightTracker extends Application {
  
  // Define window properties
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'spotlight-tracker',
      title: 'Spotlight Tracker',
      template: 'modules/daggerheart-spotlight-tracker/templates/tracker.html',
      width: 400,
      height: 'auto',
      resizable: true,
      classes: ['spotlight-tracker-window']
    });
  }
  
  // Prepare data to send to the template
  getData() {
    // Get all player-owned characters whose players are currently online
    const characters = game.actors.filter(actor => {
      // Must be a character type
      if (actor.type !== 'character') return false;
      
      // Must have a player owner
      if (!actor.hasPlayerOwner) return false;
      
      // Check if any of the actor's owners are currently online
      const hasActivePlayer = game.users.some(user => 
        user.active && user.character?.id === actor.id
      );
      
      return hasActivePlayer;
    });
    
    // Get saved spotlight counts
    const counts = game.settings.get('daggerheart-spotlight-tracker', 'spotlightCounts');
    
    // Build character data with counts
    const characterData = characters.map(char => ({
      id: char.id,
      name: char.name,
      img: char.img,
      count: counts[char.id] || 0
    }));
    
    // Sort by count (lowest first) so you can easily see who needs spotlight
    characterData.sort((a, b) => a.count - b.count);
    
    return {
      characters: characterData,
      totalSpotlights: characterData.reduce((sum, char) => sum + char.count, 0)
    };
  }
  
  // Handle button clicks in the window
  activateListeners(html) {
    super.activateListeners(html);
    
    // Increment button clicked
    html.find('.increment-spotlight').on('click', async (event) => {
      const characterId = $(event.currentTarget).data('character-id');
      await this.incrementSpotlight(characterId);
    });
    
    // Decrement button clicked
    html.find('.decrement-spotlight').on('click', async (event) => {
      const characterId = $(event.currentTarget).data('character-id');
      await this.decrementSpotlight(characterId);
    });
    
    // Refresh list button clicked
    html.find('.refresh-list').on('click', () => {
      ui.notifications.info('Character list refreshed');
      this.render();
    });
    
    // Reset all button clicked
    html.find('.reset-all').on('click', async () => {
      const confirmed = await Dialog.confirm({
        title: 'Reset All Spotlights',
        content: '<p>Are you sure you want to reset all spotlight counts to 0?</p>',
        yes: () => true,
        no: () => false
      });
      
      if (confirmed) {
        await this.resetAll();
      }
    });
  }
  
  // Increment a character's spotlight count
  async incrementSpotlight(characterId) {
    const counts = game.settings.get('daggerheart-spotlight-tracker', 'spotlightCounts');
    counts[characterId] = (counts[characterId] || 0) + 1;
    await game.settings.set('daggerheart-spotlight-tracker', 'spotlightCounts', counts);
    
    // Show notification
    const character = game.actors.get(characterId);
    ui.notifications.info(`${character.name} spotlighted (${counts[characterId]} times)`);
    
    // Refresh the window
    this.render();
  }
  
  // Decrement a character's spotlight count (can't go below 0)
  async decrementSpotlight(characterId) {
    const counts = game.settings.get('daggerheart-spotlight-tracker', 'spotlightCounts');
    if (counts[characterId] && counts[characterId] > 0) {
      counts[characterId] = counts[characterId] - 1;
      await game.settings.set('daggerheart-spotlight-tracker', 'spotlightCounts', counts);
      this.render();
    }
  }
  
  // Reset all counts to 0
  async resetAll() {
    await game.settings.set('daggerheart-spotlight-tracker', 'spotlightCounts', {});
    ui.notifications.info('All spotlight counts reset');
    this.render();
  }
}

// Make the class globally available so macros can use it
window.SpotlightTracker = SpotlightTracker;

// MACRO FUNCTION - Opens the tracker window
window.openSpotlightTracker = function() {
  new SpotlightTracker().render(true);
};

// MACRO FUNCTION - Spotlight a character by name or ID
window.spotlightCharacter = async function(characterNameOrId) {
  const character = game.actors.find(a => 
    a.name === characterNameOrId || a.id === characterNameOrId
  );
  
  if (!character) {
    ui.notifications.warn(`Character "${characterNameOrId}" not found`);
    return;
  }
  
  const counts = game.settings.get('daggerheart-spotlight-tracker', 'spotlightCounts');
  counts[character.id] = (counts[character.id] || 0) + 1;
  await game.settings.set('daggerheart-spotlight-tracker', 'spotlightCounts', counts);
  
  ui.notifications.info(`${character.name} spotlighted (${counts[character.id]} times)`);
};

console.log('Daggerheart Spotlight Tracker | All functions defined');
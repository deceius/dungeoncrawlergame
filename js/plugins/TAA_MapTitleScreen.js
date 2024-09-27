//=============================================================================
// TAA_MapTitleScreen.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.mts = {};
TAA.mts.Version = "1.2.2";
TAA.mts.PluginName = "TAA_MapTitleScreen";
TAA.mts.alias = {};

var Imported = Imported || {};

/*:
 * @target MV MZ
 *
 * @plugindesc [1.2.2] Use a map in your title screen
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/ 
 * 
 * @help
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 *  
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * Sometimes we want something extra in our game's title screen. Maybe something
 * moving, an animation, or have it change as the game progresses, showing
 * a different scene according to some event happened in the most recent save
 * story. This plugin allows you to have maps as your title screen, and use
 * plugin commands to update which title configuration to use. For example, you
 * can have two configs using the same page, but one with a fixed camera at a 
 * certain point in the map, and another following a specific event as it goes
 * around.
 * 
 * A new function introduced on version 1.2.0 is the ability to skip the title
 * scene entirely, which can be useful for testing, but also allow you to create
 * a game where the player is thrown straight into action when the game boots, 
 * and only the title scene becomes accessible!
 * 
 * The plugin is compatible with TileD, Terrax Lighting, Victor Engine Fog & Overlay
 * and Yanfly Engine (all for MV). Other compatibilities may exist but were not 
 * officially tested.
 *  
 * =============================================================================
 * Parameters
 * =============================================================================
 * 
 * The plugin has three basic configurations:
 *  - Enabled by Default: Turns map titles on or off by default. You can change
 *    it using plugin commands later, but this determines the behavior at least
 *    for the first time the game loads;
 *  - Title Configs: Array of objects containing map title configurations. Each
 *    config has the following parameters:
 *      + Map ID: Determines the map to be loaded at the title screen;
 *      + Camera: Defines the camera as either static or to follow a specific event;
 *      + Static Camera X: If the camera is set as static, this defines the x
 *        coordinate of the left upper corner. It can be ignored if the camera is
 *        set to follow an event;
 *      + Static Camera Y: If the camera is set as static, this defines the y
 *        coordinate of the left upper corner. It can be ignored if the camera is
 *        set to follow an event;
 *      + Event ID to Follow: When the camera is set to follow an event, this
 *        parameter will identify which one to follow. The event must exist in
 *        the map selected on "Map ID". It can be ignored if the camera is set
 *        to static;
 *  - Default Title: Defines which Title Config to use by default, if it hasn't been
 *    changed during the game through plugin commands. The number represents the config
 *    index in the Title Configs array;
 * 
 * This plugin also allows you to customize your game name displayed at the
 * title screen, as long as the system option "Draw Game Title" is enabled.
 * 
 * You can customize text outline, color, size and font, and you can also replace
 * your title text by an image located at the /img/titles1 folder. Define the
 * desired behavior through the "Title Type" parameter.
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * There are a few script calls available with this plugin. They're all listed
 * below.
 * 
 * $gameSystem.setMapTitleConfig(index)
 *  - Changes the map configuration used to display the title screen to the one
 *    specified by "index";
 * 
 * $gameSystem.resetMapTitleConfig()
 *  - Resets the map title configuration used to display the title screen back to
 *    the default settings;
 * 
 * $gameSystem.getCurrentMapTitleConfig()
 *  - Returns the current title config ID saved for title screen display;
 * 
 * $gameSystem.enableMapTitleScreen()
 *  - Enables the plugin to load maps as title screens;
 * 
 * $gameSystem.disableMapTitleScreen()
 *  - Disables the plugin, preventing loading maps as title screens;
 * 
 * $gameSystem.isMapTitleScreenEnabled()
 *  - Returns true if the plugin is enabled, or false if it isn't;
 * 
 * $gameSystem.enableCustomGameTitle()
 *  - Enables the plugin custom game title feature;
 * 
 * $gameSystem.disableCustomGameTitle()
 *  - Disables the plugin custom game title feature;
 * 
 * $gameSystem.isCustomGameTitleEnabled()
 *  - Returns true if the plugin custom game title feature is enabled, false if it isn't.
 * 
 * $gameSystem.enableCustomTitleCommands()
 *  - Enables the plugin custom title commands window feature;
 * 
 * $gameSystem.disableCustomTitleCommands()
 *  - Disables the plugin custom title commands window feature;
 * 
 * $gameSystem.isCustomTitleCommandsEnabled()
 *  - Returns true if the plugin custom title commands window feature is enabled, false if it isn't.
 * 
 * $gameSystem.setTitleMapSkip()
 *  - Change title skipping settings. There are currently three options:
 *      + loadtitle (which loads the title scene as usual)
 *      + newgame (which starts a new game without loading the title scene)
 *      + lastsave (skip the title scene and loads the most recent save)
 * 
 * ============================================================================
 * Plugin Commands (MV)
 * ============================================================================
 * 
 * TitleMap enable
 * TitleMap on
 *  - Enables the plugin to load maps as title screens;
 * 
 * TitleMap disable
 * TitleMap off
 *  - Disables the plugin to load maps as title screens;
 * 
 * TitleMap set <ID>
 *  - Changes the title configuration to the one specified by "<ID>". <ID> must
 *    be a valid index from the Title Configs array param;
 * 
 * TitleMap Title enable
 * TitleMap Title on
 *  - Enables the plugin custom game title feature;
 * 
 * TitleMap Title disable
 * TitleMap Title off
 *  - Disables the plugin custom game title feature;
 * 
 * TitleMap Command enable
 * TitleMap Command on
 *  - Enables the plugin custom title commands feature;
 * 
 * TitleMap Command disable
 * TitleMap Command off
 *  - Disables the plugin custom title commands feature;
 * 
 * TitleMap reset
 *  - Resets the map title configuration used to display the title screen back 
 *    to the default settings;
 * 
 * TitleMap SkipType <option>
 *  - Change title skipping settings. There are currently three options:
 *      + loadTitle (which loads the title scene as usual)
 *      + newGame (which starts a new game without loading the title scene)
 *      + lastSave (skip the title scene and loads the most recent save)
 * 
 * ============================================================================
 * Plugin Commands (MZ)
 * ============================================================================
 * 
 * Manage Title Scene
 *  - Use this command to change the plugin behavior and control each of this 
 *    features, enabling or disabling the map as title scene, custom game title
 *    and custom command window individually.
 * 
 * Change Title Map
 *  - Changes the title configuration to the one specified by "<ID>". <ID> must
 *    be a valid index from the Title Configs array param;
 * 
 * Reset Configs
 *  - Resets the map title configuration used to display the title screen back 
 *    to the default settings;
 * 
 * Skip Type
 *  - Change title skipping settings. There are currently three options:
 *      + Do not skip (which loads the title scene as usual)
 *      + Skip to new game (which starts a new game without loading the title scene)
 *      + Skip to latest save (skip the title scene and loads the most recent save)
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 * - Initial release;
 * Version 1.1.0:
 * - Added options to customized the title command window.
 * - Fixed an issue with the title being loaded before the map.
 * Version 1.2.0:
 * - Added MZ support;
 * - Included options to skip the title scene entirely;
 * Version 1.2.1:
 * - Fixed a bug that could cause the map scene to be loaded incorrectly (usually
 *   with the camera in the wrong position);
 * Version 1.2.2:
 * - Small changes for compatibility with TAA_GameCursor;
 * 
 * ============================================================================
 * End of Help
 * ============================================================================
 * 
 * ============================================================================
 * MZ Commands
 * ============================================================================
 * 
 * @command manage
 * @text Manage Title Scene
 * @desc Manage which plugin features should be enabled (title map, custom game title, custom commands).
 * 
 * @arg feature
 * @text Feature
 * @type select
 * @option Title Map
 * @option Game Title
 * @option Command Window
 * @default Title Map
 * @desc Choose what feature to manage.
 * 
 * @arg action
 * @text Action
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Choose what to do with the selected feature.
 * 
 * @command changeTitle
 * @text Change Title Map
 * @desc Change the map config displayed at the title scene.
 * 
 * @arg id
 * @text Config ID
 * @type number
 * @min 1
 * @default 1
 * @desc Index of the title config array param to set as your current title config.
 * 
 * @command reset
 * @text Reset Configs
 * @desc Reset to plugin's default configuration.
 * 
 * @command skipTitle
 * @text Skip Title Config
 * @desc Change title skipping settings.
 * 
 * @arg action
 * @text Action
 * @type select
 * @option Change skip type: Do not skip
 * @option Change skip type: Skip to new game
 * @option Change skip type: Skip to latest save
 * @option Enable options menu
 * @option Disable options menu
 * @default Change skip type: Do not skip
 * @desc Set title skipping options.
 * 
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * @param ---Main Configs---
 * @type text
 * 
 * @param Enabled by Default
 * @parent ---Main Configs---
 * @type boolean
 * @on true
 * @off false
 * @default true
 * @desc Is the plugin enabled by default? Can be overwritten with Plugin Commands or script calls.
 * 
 * @param Title Configs
 * @parent ---Main Configs---
 * @type struct<TitleSetup>[]
 * @default []
 * @desc List of title map configs.
 * 
 * @param Default Title
 * @parent ---Main Configs---
 * @type number
 * @min 1
 * @default 1
 * @desc Default Title Map config index. Can be overwritten with Plugin Commands or script calls.
 * 
 * @param Skip Title Default
 * @parent ---Main Configs---
 * @type select
 * @option Do not skip
 * @option Skip to new game
 * @option Skip to latest save
 * @default Do not skip
 * @desc Set title skipping default value. It can be changed through plugin commands later.
 * 
 * @param Skip Title Option Menu
 * @parent ---Main Configs---
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 * @desc Show or hide the option menu entry to change title skipping behavior.
 * 
 * @param Skip Title Texts
 * @parent ---Main Configs---
 * @type struct<SkipOptions>
 * @default {"Menu Text":"Skip Title To","Do Not Skip":"Load Title","Skip to New Game":"New Game","Skip to Latest Save":"Latest Save"}
 * @desc Skip Title options menu status texts. Try to keep it short and simple.
 * 
 * @param ---Game Title---
 * @type text
 * 
 * @param Custom Title Enabled
 * @parent ---Game Title---
 * @type boolean
 * @on ENABLED
 * @off DISABLED
 * @default true
 * @desc Enable plugin's game title customizations by default? This setting can be overwritten by plugin commands.
 * 
 * @param Replace Default Title
 * @parent ---Game Title---
 * @type boolean
 * @on ENABLED
 * @off DISABLED
 * @desc Enable plugin title draw, replacing the engine default.
 * 
 * @param Title Type
 * @parent ---Game Title---
 * @type select
 * @option Text
 * @option Image
 * @default Text
 * @desc How should we handle title drawing?
 * 
 * @param Enable Title FadeOut
 * @parent ---Game Title---
 * @type boolean
 * @on ENABLE
 * @off DISABLE
 * @default true
 * @desc Determine if the title text/image should fade out when going out of the title screen.
 * 
 * @param Title X Position
 * @parent ---Game Title---
 * @type text
 * @default 20
 * @desc X position where to place the title (be it text or image). Can be replaced by an eval code.
 * 
 * @param Title Y Position
 * @parent ---Game Title---
 * @type text
 * @default Graphics.height / 4
 * @desc Y position where to place the title (be it text or image). Can be replaced by an eval code.
 * 
 * @param ---Text Configs---
 * @parent ---Game Title---
 * @type text
 * 
 * @param Outline Color
 * @parent ---Text Configs---
 * @type text
 * @default #000000
 * @desc CSS color code to use as the text outline color.
 * 
 * @param Outline Width
 * @parent ---Text Configs---
 * @type number
 * @min 0
 * @default 8
 * @desc Outline width to use on title text.
 * 
 * @param Text Color
 * @parent ---Text Configs---
 * @type text
 * @default #ffffff
 * @desc CSS color code to use as the text color.
 * 
 * @param Font Size
 * @parent ---Text Configs---
 * @type number
 * @min 0
 * @default 72
 * @desc Title text font size.
 * 
 * @param Font Face
 * @parent ---Text Configs---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @default GameFont
 * @desc Font used on the title text.
 * 
 * @param Text Alignment
 * @parent ---Text Configs---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Title Text alignment.
 * 
 * @param ---Image Config---
 * @parent ---Game Title---
 * @type text
 * 
 * @param Title Image
 * @parent ---Image Config---
 * @type file
 * @dir img/titles1/
 * @require 1
 * @default
 * @desc When title type is set for Image, select an image here to be loaded at the title screen.
 * 
 * @param ---Title Commands---
 * @type text
 * 
 * @param Enable Window Params
 * @parent ---Title Commands---
 * @type boolean
 * @on ENABLED
 * @off DISABLED
 * @default true
 * @desc Should this plugin's title command window customizations be enabled? This setting can be overwritten by plugin commands.
 * 
 * @param Window Orientation
 * @parent ---Title Commands---
 * @type select
 * @option Vertical
 * @option Horizontal
 * @default Vertical
 * @desc Define how title commands window are to be presented, vertical or horizontal.
 * 
 * @param Commands X Position
 * @parent ---Title Commands---
 * @type text
 * @default (Graphics.boxWidth - this.width) / 2
 * @desc Title command window x position. Should be treated as an eval. Default: (Graphics.boxWidth - this.width) / 2
 * 
 * @param Commands Y Position
 * @parent ---Title Commands---
 * @type text
 * @default Graphics.boxHeight - this.height - 96
 * @desc Title command window y position. Should be treated as an eval. Default: Graphics.boxHeight - this.height - 96
 * 
 * @param Commands Width
 * @parent ---Title Commands---
 * @type text
 * @default 240
 * @desc Title command window width. Should be treated as an eval. Default: 240
 * 
 * @param Commands Height
 * @parent ---Title Commands---
 * @type text
 * @default this.fittingHeight(this.numVisibleRows())
 * @desc Title command window height. Should be treated as an eval. Default: this.fittingHeight(this.numVisibleRows())
 * 
 * @param Max Columns
 * @parent ---Title Commands---
 * @type number
 * @min 3
 * @default 3
 * @desc Number of columns to use when horizontal orientation is set. This parameter is ignored for vertical orientation.
 * 
 * @param Item Text Align
 * @parent ---Title Commands---
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc Defines alignment on each command item text.
 * 
 * @param Window Skin
 * @parent ---Title Commands---
 * @type file
 * @dir img/system/
 * @require 1
 * @default Window
 * @desc Select a window skin to use on the title commands window.
 * 
 */

//=============================================================================
// Title Setup
//=============================================================================
/*~struct~TitleSetup:
 * @param Map ID
 * @type number
 * @min 1
 * @default 1
 * @desc Map number to use as title.
 * 
 * @param Camera
 * @type select
 * @option Static
 * @option Follow Event
 * @default Static
 * @desc Select your scene camera type.
 * 
 * @param Static Camera X
 * @type number
 * @min -100
 * @default 0
 * @desc Camera X position for the upper left corner when using static option.
 * 
 * @param Static Camera Y
 * @type number
 * @min -100
 * @default 0
 * @desc Camera Y position for the upper left corner when using static option.
 * 
 * @param Event ID to Follow
 * @type number
 * @min 0
 * @default 1
 * @desc When using a camera that center and follows an event, specify the event ID to follow.
 * 
 */
//=============================================================================
// Skip Title options
//=============================================================================
/*~struct~SkipOptions:
 * @param Menu Text
 * @type text
 * @default Skip Title To
 * @desc Text to identify the option menu entry.
 *
 * @param Do Not Skip
 * @type text
 * @default Load Title
 * @desc Text for the option to load the title scene as usual.
 * 
 * @param Skip to New Game
 * @type text
 * @default New Game
 * @desc Text for the option to skip to new game.
 * 
 * @param Skip to Latest Save
 * @type text
 * @default Latest Save
 * @desc Text for the option to skip to the latest save.
 */
//=============================================================================
// Local Functions
//=============================================================================

TAA.mts.functions = TAA.mts.functions || {};
TAA.mts.functions.buildTitleConfigs = function(array){
    var configArray = [];
    for(var i=0; i < array.length; i++){
        var titleConfig = {};
        if(array[i] === undefined || Object.keys(array[i]).length <= 0) continue;
        var object = JSON.parse(array[i]);
        titleConfig.MapID = parseInt(object['Map ID']);
        titleConfig.CameraType = object['Camera'];
        titleConfig.StaticCameraX = parseInt(object['Static Camera X']);
        titleConfig.StaticCameraY = parseInt(object['Static Camera Y']);
        titleConfig.FollowEventID = parseInt(object['Event ID to Follow']);
        if(titleConfig.MapID > 0 && configArray[i+1] === undefined)
            configArray[i+1] = titleConfig;
    }
    return configArray;
};

TAA.mts.functions.getCSSColorFromString = function(color){
    if(color.match(/^\s*#?([0-9a-f]{1,6})\s*$/i)){
        var colorCode = new String(RegExp.$1);
        var trailingZeros = 6 - colorCode.length;
        while(trailingZeros > 0) {
            colorCode = '0' + colorCode;
            trailingZeros--;
        }

        return '#'+colorCode;
    }
    return '#ffffff';
};

TAA.mts.functions.parseSkipTitleOptions = function(option){
    option = (option === undefined) ? '1' : option;
    switch(option.toLowerCase()){
        case 'skip to new game':
        case 'newgame':
        case '2':
            return 2;
        case 'skip to latest save':
        case 'lastsave':
        case '3':
            return 3;
        case 'do not skip':
        case 'loadtitle':
        case '1':
        default:
            return 1;
    }
};

//=============================================================================
// Parameters Setup
//=============================================================================

TAA.mts.Parameters = TAA.mts.Parameters || {};
var Parameters = PluginManager.parameters(TAA.mts.PluginName);

// Main configs
TAA.mts.Parameters.Enabled = Parameters['Enabled by Default'];
TAA.mts.Parameters.TitleConfigs = TAA.mts.functions.buildTitleConfigs(JSON.parse(Parameters['Title Configs']));
TAA.mts.Parameters.DefaultMap = Parameters['Default Title'];
TAA.mts.Parameters.SkipTitle = Parameters['Skip Title Default'];
TAA.mts.Parameters.SkipTitleMenu = Parameters['Skip Title Option Menu'] === 'true';
TAA.mts.Parameters.SkipTitleOptions = JSON.parse(Parameters['Skip Title Texts']);

// Title name config
TAA.mts.Parameters.GameTitle = TAA.mts.Parameters.GameTitle || {};
TAA.mts.Parameters.GameTitle.Enabled = JSON.parse(Parameters['Custom Title Enabled']);
TAA.mts.Parameters.GameTitle.Type = Parameters['Title Type'];
TAA.mts.Parameters.GameTitle.TitleFadeOut = JSON.parse(Parameters['Enable Title FadeOut']);
TAA.mts.Parameters.GameTitle.X = Parameters['Title X Position'];
TAA.mts.Parameters.GameTitle.Y = Parameters['Title Y Position'];

TAA.mts.Parameters.GameTitle.Text = TAA.mts.Parameters.GameTitle.Text || {};
TAA.mts.Parameters.GameTitle.Text.OutlineColor = TAA.mts.functions.getCSSColorFromString(Parameters['Outline Color']);
TAA.mts.Parameters.GameTitle.Text.OutlineWidth = parseInt(Parameters['Outline Width']);
TAA.mts.Parameters.GameTitle.Text.TextColor = TAA.mts.functions.getCSSColorFromString(Parameters['Text Color']);
TAA.mts.Parameters.GameTitle.Text.FontSize = parseInt(Parameters['Font Size']);
TAA.mts.Parameters.GameTitle.Text.FontFace = Parameters['Font Face'];
TAA.mts.Parameters.GameTitle.Text.Alignment = Parameters['Text Alignment'];
TAA.mts.Parameters.GameTitle.ImageName = Parameters['Title Image'];

// Title command window config
TAA.mts.Parameters.TitleCommands = TAA.mts.Parameters.TitleCommands || {};
TAA.mts.Parameters.TitleCommands.Enabled = JSON.parse(Parameters['Enable Window Params']);
TAA.mts.Parameters.TitleCommands.Orientation = Parameters['Window Orientation'];
TAA.mts.Parameters.TitleCommands.X = Parameters['Commands X Position'];
TAA.mts.Parameters.TitleCommands.Y = Parameters['Commands Y Position'];
TAA.mts.Parameters.TitleCommands.Width = Parameters['Commands Width'];
TAA.mts.Parameters.TitleCommands.Height = Parameters['Commands Height'];
TAA.mts.Parameters.TitleCommands.MaxCols = Parameters['Max Columns'];
TAA.mts.Parameters.TitleCommands.ItemAlign = Parameters['Item Text Align'];
TAA.mts.Parameters.TitleCommands.WindowSkin = Parameters['Window Skin'];

//=============================================================================
// ConfigManager
//=============================================================================

TAA.mts.alias.ConfigManager = TAA.mts.alias.ConfigManager || {};

ConfigManager.titleMapConfigId = parseInt(TAA.mts.Parameters.DefaultMap);
ConfigManager.titleMapId = parseInt(TAA.mts.Parameters.TitleConfigs[TAA.mts.Parameters.DefaultMap].MapID);
ConfigManager.titleMapEnabled = JSON.parse(TAA.mts.Parameters.Enabled);
ConfigManager.titleMapTitleEnabled = JSON.parse(TAA.mts.Parameters.GameTitle.Enabled);
ConfigManager.titleMapCommandEnabled = JSON.parse(TAA.mts.Parameters.TitleCommands.Enabled);
ConfigManager.titleMapSkip = TAA.mts.functions.parseSkipTitleOptions(TAA.mts.Parameters.SkipTitle);

TAA.mts.alias.ConfigManager.makeData = ConfigManager.makeData;
ConfigManager.makeData = function(){
    var config = TAA.mts.alias.ConfigManager.makeData.call(this);
    config.titleMapId = this.titleMapId;
    config.titleMapConfigId = this.titleMapConfigId;
    config.titleMapEnabled = this.titleMapEnabled;
    config.titleMapTitleEnabled = this.titleMapTitleEnabled;
    config.titleMapCommandEnabled = this.titleMapCommandEnabled;
    config.titleMapSkip = this.titleMapSkip;
    return config;
};

TAA.mts.alias.ConfigManager.applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config){
    TAA.mts.alias.ConfigManager.applyData.call(this, config);
    this.titleMapId = this.readNumber(config, 'titleMapId');
    this.titleMapConfigId = this.readNumber(config, 'titleMapConfigId');
    this.titleMapEnabled = this.readFlag(config, 'titleMapEnabled');
    this.titleMapTitleEnabled = this.readFlag(config, 'titleMapTitleEnabled');
    this.titleMapCommandEnabled = this.readFlag(config, 'titleMapCommandEnabled');
    this.titleMapSkip = this.readNumber(config, 'titleMapSkip');
};

ConfigManager.readNumber = function(config, name){
    var value = config[name];
    if(!isNaN(value) && value > 0){
        return parseInt(value);
    }
    else{
        if(name === 'titleMapConfigId'){
            return parseInt(TAA.mts.Parameters.DefaultMap);
        }
        if(name === 'titleMapId'){
            return parseInt(TAA.mts.Parameters.TitleConfigs[TAA.mts.Parameters.DefaultMap].MapID);
        }
        else if(name === 'titleMapSkip'){
            return TAA.mts.functions.parseSkipTitleOptions(TAA.mts.Parameters.SkipTitle);
        }
    }
};

TAA.mts.alias.ConfigManager.readFlag = ConfigManager.readFlag;
ConfigManager.readFlag = function(config, name){
    if(name === 'titleMapEnabled' && config[name] === undefined){
        config[name] = JSON.parse(TAA.mts.Parameters.Enabled);
    }
    else if(name === 'titleMapTitleEnabled' && config[name] === undefined){
        config[name] = JSON.parse(TAA.mts.Parameters.GameTitle.Enabled);
    }
    else if(name === 'titleMapCommandEnabled' && config[name] === undefined){
        config[name] = JSON.parse(TAA.mts.Parameters.TitleCommands.Enabled);
    }
    return TAA.mts.alias.ConfigManager.readFlag.call(this, config, name);
};

//=============================================================================
// Game_System
//=============================================================================

TAA.mts.alias.Game_System = TAA.mts.alias.Game_System || {};
TAA.mts.alias.Game_System.initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    this._taaTitleMapSkip = TAA.mts.Parameters.SkipTitleMenu;
    TAA.mts.alias.Game_System.initialize.call(this);
};

Game_System.prototype.setMapTitleConfig = function(index){
    if(TAA.mts.Parameters.TitleConfigs[index] === undefined || isNaN(index) || isNaN(TAA.mts.Parameters.TitleConfigs[index]['MapID'])) return;
    ConfigManager.titleMapConfigId = parseInt(index);
    ConfigManager.titleMapId = parseInt(TAA.mts.Parameters.TitleConfigs[index]['MapID']);
    ConfigManager.save();
};

Game_System.prototype.resetMapTitleConfig = function(){
    ConfigManager.titleMapId = parseInt(TAA.mts.Parameters.TitleConfigs[TAA.mts.Parameters.DefaultMap]['MapID']);
    ConfigManager.titleMapConfigId = parseInt(TAA.mts.Parameters.DefaultMap);
    ConfigManager.save();
};

Game_System.prototype.getCurrentMapTitleConfig = function(){
    return ConfigManager.titleMapConfigId;
};

Game_System.prototype.enableMapTitleScreen = function(){
    ConfigManager.titleMapEnabled = true;
    ConfigManager.save();
};

Game_System.prototype.disableMapTitleScreen = function(){
    ConfigManager.titleMapEnabled = false;
    ConfigManager.save();
};

Game_System.prototype.isMapTitleScreenEnabled = function(){
    return ConfigManager.titleMapEnabled;
};

Game_System.prototype.enableCustomGameTitle = function(){
    ConfigManager.titleMapTitleEnabled = true;
    ConfigManager.save();
};

Game_System.prototype.disableCustomGameTitle = function(){
    ConfigManager.titleMapTitleEnabled = false;
    ConfigManager.save();
};

Game_System.prototype.isCustomGameTitleEnabled = function(){
    return ConfigManager.titleMapTitleEnabled;
};

Game_System.prototype.enableCustomTitleCommands = function(){
    ConfigManager.titleMapCommandEnabled = true;
    ConfigManager.save();
};

Game_System.prototype.disableCustomTitleCommands = function(){
    ConfigManager.titleMapCommandEnabled = false;
    ConfigManager.save();
};

Game_System.prototype.isCustomTitleCommandsEnabled = function(){
    return ConfigManager.titleMapCommandEnabled;
};

Game_System.prototype.setTitleMapSkip = function(option){
    ConfigManager.titleMapSkip = TAA.mts.functions.parseSkipTitleOptions(option);
    ConfigManager.save();
};

Game_System.prototype.enableTitleMapSkipOption = function() {
    this._taaTitleMapSkip = true;
};

Game_System.prototype.disableTitleMapSkipOption = function() {
    this._taaTitleMapSkip = false;
};

Game_System.prototype.isTitleMapSkipOptionEnabled = function() {
    return this._taaTitleMapSkip;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

TAA.mts.alias.Game_Interpreter = TAA.mts.alias.Game_Interpreter || {};
TAA.mts.alias.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
    TAA.mts.alias.Game_Interpreter.pluginCommand.call(this, command, args);
    if(command.toLowerCase() === 'titlemap' && args[0] !== undefined){
        if(args[0].toLowerCase() === 'enable' || args[0].toLowerCase() === 'on') 
            $gameSystem.enableMapTitleScreen();
        else if(args[0].toLowerCase() === 'disable' || args[0].toLowerCase() === 'off') 
            $gameSystem.disableMapTitleScreen();
        else if(args[0].toLowerCase() === 'set'){
            if(isNaN(args[1])) return;
            $gameSystem.setMapTitleConfig(args[1]);
        }
        else if(args[0].toLowerCase() === 'title' && args[1] !== undefined){
            if(args[1].toLowerCase() === 'enable' || args[1].toLowerCase() === 'on') 
                $gameSystem.enableCustomGameTitle();
            if(args[1].toLowerCase() === 'disable' || args[1].toLowerCase() === 'off') 
                $gameSystem.disableCustomGameTitle();
        }
        else if(args[0].toLowerCase() === 'command' && args[1] !== undefined){
            if(args[1].toLowerCase() === 'enable' || args[1].toLowerCase() === 'on') 
                $gameSystem.enableCustomTitleCommands();
            if(args[1].toLowerCase() === 'disable' || args[1].toLowerCase() === 'off') 
                $gameSystem.disableCustomTitleCommands();
        }
        else if(args[0].toLowerCase() === 'reset')
            $gameSystem.resetMapTitleConfig();
        else if(args[0].toLowerCase() === 'skiptitle'){
            if(['newgame', 'lastsave', 'loadtitle'].contains(args[1].toLowerCase()))
                $gameSystem.setTitleMapSkip(args[1].toLowerCase());
            else if(args[1].toLowerCase() === 'enablemenu')
                $gameSystem.enableTitleMapSkipOption();
            else if(args[1].toLowerCase() === 'disablemenu')
                $gameSystem.disableTitleMapSkipOption();
        }
    }
};

//=============================================================================
// Plugin_Manager
//=============================================================================

// MZ Plugin Commands
if(Utils.RPGMAKER_NAME === 'MZ'){
    PluginManager.registerCommand(TAA.mts.PluginName, 'manage', args => {
        const feature = args.feature;
        const action = args.action === 'true';
        switch(feature){
            case 'Title Map':
                if(action) $gameSystem.enableMapTitleScreen();
                else $gameSystem.disableMapTitleScreen();
                break;
            case 'Game Title':
                if(action) $gameSystem.enableCustomGameTitle();
                else $gameSystem.disableCustomGameTitle();
                break;
            case 'Command Window':
                if(action) $gameSystem.enableCustomTitleCommands();
                else $gameSystem.disableCustomTitleCommands();
                break;
        }
    });

    PluginManager.registerCommand(TAA.mts.PluginName, 'changeTitle', args => {
        var id = parseInt(args.id);
        if(isNaN(id)) return;
        $gameSystem.setMapTitleConfig(id);
    });

    PluginManager.registerCommand(TAA.mts.PluginName, 'reset', args => {
        $gameSystem.resetMapTitleConfig();
    });

    PluginManager.registerCommand(TAA.mts.PluginName, 'skipTitle', args => {
        var action = args.action.toLowerCase();
        if(action.match(/change skip type: (.*)/)){
            const skipType = RegExp.$1;
            $gameSystem.setTitleMapSkip(skipType);
        }
        else if(action === 'enable options menu')
            $gameSystem.enableTitleMapSkipOption();
        else if(action === 'disable options menu')
            $gameSystem.disableTitleMapSkipOption();
    });
}

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.taaMapTitleDisplayPos = function(){
    var configObj = TAA.mts.Parameters.TitleConfigs[ConfigManager.titleMapConfigId];
    if(configObj === undefined || Object.keys(configObj).length <= 0) return;
    if(configObj.CameraType === 'Static'){
        this.setStaticTitleCamera(configObj);
    }
    else if(configObj.CameraType === 'Follow Event'){
        var id = configObj.FollowEventID;
        if(isNaN(id) || id <= 0) this.setStaticTitleCamera(configObj);
        var event = this._events[id];
        if(event === undefined || event === null) this.setStaticTitleCamera(configObj);
        var x = event._realX - (Graphics.width / this.tileWidth() - 1) / 2;
        var y = event._realY - (Graphics.height / this.tileHeight() -2) / 2;
        this.setDisplayPos(x, y);
    }
};

Game_Map.prototype.setStaticTitleCamera = function(configObj){
    this._displayX = configObj.StaticCameraX;
    this._displayY = configObj.StaticCameraY;
};

//=============================================================================
// Scene_TitleMap
//=============================================================================

function Scene_TitleMap(){
    this.initialize.apply(this, arguments);
};

Scene_TitleMap.prototype = Object.create(Scene_Map.prototype);
Scene_TitleMap.prototype.constructor = Scene_TitleMap;

Scene_TitleMap.prototype.create = function(){
    $gameSystem.disableMenu();
    Scene_Base.prototype.create.call(this);
    this._fadeIn = true;

    // For compatibility with TAA_GameCursor
    if(this._taaGlobalCursor)
        this._taaGlobalCursor.visible = false;
};

Scene_TitleMap.prototype.createSpriteset = function(){
    this._spriteset = new Spriteset_Map();
    this.addChild(this._spriteset);
    this._spriteset.update();
};

Scene_TitleMap.prototype.onMapLoaded = function(){
    this.createDisplayObjects();
    $gameMap.taaMapTitleDisplayPos();
};

Scene_TitleMap.prototype.update = function() {
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    }
    this.updateWaitCount();
    Scene_Base.prototype.update.call(this);
};

Scene_TitleMap.prototype.updateScene = function() { };

Scene_TitleMap.prototype.updateMain = function(){
    $gameMap.update(this.isActive());
    $gameMap.taaMapTitleDisplayPos();
    $gameTimer.update(this.isActive());
    $gameScreen.update();
};

Scene_TitleMap.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    if(this.needsFadeIn()){
        this.startFadeIn(this.fadeSpeed(), false);
        this._fadeIn = false;
    }
};

Scene_TitleMap.prototype.needsFadeIn = function() {
    return this._fadeIn;
};

Scene_TitleMap.prototype.isMapTouchOk = function() {
    return false;
};

TAA.mts.alias.Scene_Map = TAA.mts.alias.Scene_Map || {};
TAA.mts.alias.Scene_Map.terminate = Scene_Map.prototype.terminate;
Scene_TitleMap.prototype.terminate = function(){
    TAA.mts.alias.Scene_Map.terminate.call(this);
    if(Utils.RPGMAKER_NAME === 'MZ'){
        this.removeChild(this._mapNameWindow);
        this.removeChild(this._windowLayer);
        this.removeChild(this._spriteset);
    }
};

// For compatibility with TAA_GameCursor
Scene_TitleMap.prototype.isGlobalCursorEnabled = function(){
    return false;
};

Scene_TitleMap.prototype.showTaaCursor = function(){
};

Scene_TitleMap.prototype.updateCursor = function(rect, pad, windowX, windowY, callerWindow){
};

Scene_TitleMap.prototype.ensureCursorZIndex = function(){
};

Scene_TitleMap.prototype.updateGlobalCursorPattern = function(){
};

Scene_TitleMap.prototype.updateGlobalCursorPosition = function(x, y){
};

Scene_TitleMap.prototype.moveGlobalCursor = function(){
};
// End of compatibility adjustments for TAA_GameCursor

//=============================================================================
// Window_TitleCommand
//=============================================================================

TAA.mts.alias.WindowTitleCommand = TAA.mts.alias.WindowTitleCommand || {};
if(Utils.RPGMAKER_NAME === 'MZ'){
    TAA.mts.alias.WindowTitleCommand.initialize = Window_TitleCommand.prototype.initialize;
    Window_TitleCommand.prototype.initialize = function(rect){
        var width = eval(TAA.mts.Parameters.TitleCommands.Width);
        var height = eval(TAA.mts.Parameters.TitleCommands.Height);
        if(!isNaN(width) && width > 0) rect.width = width;
        if(!isNaN(height) && height > 0) rect.height = height;
        TAA.mts.alias.WindowTitleCommand.initialize.call(this, rect);
        this.updatePlacement();
        this.refresh();
    };
}

TAA.mts.alias.WindowTitleCommand.windowWidth = Window_TitleCommand.prototype.windowWidth;
Window_TitleCommand.prototype.windowWidth = function() {
    if(ConfigManager.titleMapCommandEnabled === false) return TAA.mts.alias.WindowTitleCommand.windowWidth.call(this);

    var width = eval(TAA.mts.Parameters.TitleCommands.Width);
    if(isNaN(width) || width <= 0) return TAA.mts.alias.WindowTitleCommand.windowWidth.call(this);
    return width;
};

TAA.mts.alias.WindowTitleCommand.windowHeight = Window_TitleCommand.prototype.windowHeight;
Window_Command.prototype.windowHeight = function() {
    if(ConfigManager.titleMapCommandEnabled === false) return TAA.mts.alias.WindowTitleCommand.windowHeight.call(this);

    var height = eval(TAA.mts.Parameters.TitleCommands.Height);
    if(isNaN(height) || height <= 0) return TAA.mts.alias.WindowTitleCommand.windowHeight.call(this);
    return height;
};

TAA.mts.alias.WindowTitleCommand.updatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
    if(ConfigManager.titleMapCommandEnabled === false) {
        if(Utils.RPGMAKER_NAME === 'MV') TAA.mts.alias.WindowTitleCommand.updatePlacement.call(this);
    }
    else{
        var x = eval(TAA.mts.Parameters.TitleCommands.X);
        if(!isNaN(x)) 
            this.x = x;
        else 
            this.x = (Graphics.boxWidth - this.width) / 2;
        var y = eval(TAA.mts.Parameters.TitleCommands.Y);
        if(!isNaN(y))
            this.y = y;
        else
            this.y = Graphics.boxHeight - this.height - 96;
    }
};

TAA.mts.alias.WindowTitleCommand.numVisibleRows = Window_TitleCommand.prototype.numVisibleRows;
Window_TitleCommand.prototype.numVisibleRows = function() {
    if(ConfigManager.titleMapCommandEnabled === false){
        if(Utils.RPGMAKER_NAME === 'MZ') return 3;
        return TAA.mts.alias.WindowTitleCommand.numVisibleRows.call(this);
    }
    if(TAA.mts.Parameters.TitleCommands.Orientation === 'Horizontal')
        return 1;
    else if(Utils.RPGMAKER_NAME === 'MZ')
        return 3;
    else
        return TAA.mts.alias.WindowTitleCommand.numVisibleRows.call(this);
};

TAA.mts.alias.WindowTitleCommand.maxCols = Window_TitleCommand.prototype.maxCols;
Window_TitleCommand.prototype.maxCols = function() {
    if(ConfigManager.titleMapCommandEnabled === false) return TAA.mts.alias.WindowTitleCommand.maxCols.call(this);
    
    if(TAA.mts.Parameters.TitleCommands.Orientation === 'Horizontal')
        return parseInt(TAA.mts.Parameters.TitleCommands.MaxCols);
    else
        return TAA.mts.alias.WindowTitleCommand.maxCols.call(this);
};

TAA.mts.alias.WindowTitleCommand.drawItem = Window_TitleCommand.prototype.drawItem;
Window_TitleCommand.prototype.drawItem = function(index){
    if(ConfigManager.titleMapCommandEnabled === false)
        TAA.mts.alias.WindowTitleCommand.drawItem.call(this, index);
    else{
        if(Utils.RPGMAKER_NAME === 'MV')
            var rect = this.itemRectForText(index);
        else
            var rect = this.itemLineRect(index);
        var align = TAA.mts.Parameters.TitleCommands.ItemAlign;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    }
};

TAA.mts.alias.WindowTitleCommand.loadWindowskin = Window_TitleCommand.prototype.loadWindowskin;
Window_TitleCommand.prototype.loadWindowskin = function() {
    if(ConfigManager.titleMapCommandEnabled === false)
        TAA.mts.alias.WindowTitleCommand.loadWindowskin.call(this);
    else{
        var windowSkin = TAA.mts.Parameters.TitleCommands.WindowSkin;
        this._windowskin = ImageManager.loadSystem(windowSkin);
    }
};

//=============================================================================
// Scene_Title
//=============================================================================

TAA.mts.alias.Scene_Title = TAA.mts.alias.Scene_Title || {};
TAA.mts.alias.Scene_Title.create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function(){
    SceneManager.clearStack();
    if(ConfigManager.titleMapEnabled === true){
        Scene_Base.prototype.create.call(this);
        DataManager.loadMapData(ConfigManager.titleMapId);
    }
    else{
        TAA.mts.alias.Scene_Title.create.call(this);
    }
    this._loaded = false;
    this._titleMap = undefined;
    this._playing = false;
};

TAA.mts.alias.Scene_Title.start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function(){
    if(ConfigManager.titleMapEnabled === true){
        Scene_Base.prototype.start.call(this);
        this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
    }
    else{
        TAA.mts.alias.Scene_Title.start.call(this);
    }
};

TAA.mts.alias.Scene_Title.update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function(){
    if(ConfigManager.titleMapEnabled === false)
        TAA.mts.alias.Scene_Title.update.call(this);
    else{
        if(this.isActive()){
            if(!this.isMapLoaded() && $dataMap !== undefined && $dataMap !== null) this.setupMapScene();
            if(this.isMapLoaded() && this._titleMap !== undefined){
                this.startMapScene();
            } 
        }
        if(this._commandWindow !== undefined)
            TAA.mts.alias.Scene_Title.update.call(this);
    }
};

Scene_Title.prototype.isMapLoaded = function(){
    return this._loaded;
};

Scene_Title.prototype.toggleMapLoaded = function(){
    this._loaded = !this._loaded;
};

Scene_Title.prototype.isMapPlaying = function(){
    return this._playing;
};

Scene_Title.prototype.toggleMapState = function(){
    this._playing = !this._playing;
};

Scene_Title.prototype.setupMapScene = function(){
    DataManager.createGameObjects();
    $gameMap.setup(ConfigManager.titleMapId);
    this._titleMap = new Scene_TitleMap();
    this._titleMap.create();
    SceneManager.onSceneCreate();
    this.toggleMapLoaded();
    this.createWindowLayer();
    this.createCommandWindow();
};

Scene_Title.prototype.startMapScene = function(){
    if(this.isMapPlaying() || this._titleMap === undefined || !this._titleMap.isReady()) return;
    this._titleMap.start();
    this._titleMap.update();
    this.toggleMapState();
    this.addChildAt(this._titleMap, 0);
    if(Imported.TerraxLighting){
        $gameVariables.SetRadiusSpeed(0);
        $gameVariables.SetRadius(0);
    }
    SceneManager.onSceneStart();
};

TAA.mts.alias.Scene_Title.commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    if(ConfigManager.titleMapEnabled === false)
        TAA.mts.alias.Scene_Title.commandNewGame.call(this);
    else{
        DataManager.setupNewGame();
        this._commandWindow.close();
        $gameSystem.enableMenu();
        this.fadeOutAll();
        this.removeChild(this._titleMap);
        SceneManager.goto(Scene_Map);
    }
};

// Prevents the title to be drawn before the map is fully loaded
TAA.mts.alias.Scene_Title.updateFade = Scene_Title.prototype.updateFade;
Scene_Title.prototype.updateFade = function() {
    if(ConfigManager.titleMapEnabled === true || ConfigManager.titleMapTitleEnabled === true){
        if(this._fadeDuration === 0 && this._gameTitleSprite === undefined && this._gameTitleCustomSprite === undefined){
            this.createForeground();
        }
        else if(TAA.mts.Parameters.GameTitle.TitleFadeOut === true){
            this.titleFadeOut();
        }
    }
    TAA.mts.alias.Scene_Title.updateFade.call(this);
};

Scene_Title.prototype.titleFadeOut = function(){
    if(ConfigManager.titleMapTitleEnabled === true && this._fadeDuration > 0 && (this._gameTitleSprite !== undefined || this._gameTitleCustomSprite !== undefined)){
        var d = this._fadeDuration;
        var isImg = (this._gameTitleCustomSprite !== undefined) ? true : false;
        if (this._fadeSign < 0) {
            if(isImg)
                this._gameTitleCustomSprite.alpha -= this._gameTitleCustomSprite.alpha / d;
            else
                this._gameTitleSprite.opacity -= this._gameTitleSprite.opacity / d;
        } else {
            if(isImg)
                this._gameTitleCustomSprite.alpha += (255 - this._gameTitleCustomSprite.alpha) / d;
            else
                this._gameTitleSprite.opacity += (255 - this._gameTitleSprite.opacity) / d;
        }
    }
};

TAA.mts.alias.Scene_Title.createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
    if(ConfigManager.titleMapEnabled === false)
        TAA.mts.alias.Scene_Title.createForeground.call(this);
    else{
        if ($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
    }
};

TAA.mts.alias.Scene_Title.drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function(){
    var index = this.children.indexOf(this._windowLayer);
    if(index < 0) index = this.children.length;
    if(ConfigManager.titleMapTitleEnabled === false){
        this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChildAt(this._gameTitleSprite, index);
        TAA.mts.alias.Scene_Title.drawGameTitle.call(this);
    }
    else{
        var x = eval(TAA.mts.Parameters.GameTitle.X);
        var y = eval(TAA.mts.Parameters.GameTitle.Y);
        var maxWidth = Graphics.width - x * 2;
        if(TAA.mts.Parameters.GameTitle.Type === undefined || TAA.mts.Parameters.GameTitle.Type === 'Text')
            this.createTextTitle(x, y, maxWidth, index);
        else if(TAA.mts.Parameters.GameTitle.Type === 'Image')
            this.createImageTitle(x, y, index);
    }
};

Scene_Title.prototype.createTextTitle = function(x, y, maxWidth, index){
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChildAt(this._gameTitleSprite, index);
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = TAA.mts.Parameters.GameTitle.Text.OutlineColor;
    this._gameTitleSprite.bitmap.outlineWidth = TAA.mts.Parameters.GameTitle.Text.OutlineWidth;
    this._gameTitleSprite.bitmap.fontFace = TAA.mts.Parameters.GameTitle.Text.FontFace;
    this._gameTitleSprite.bitmap.fontSize = TAA.mts.Parameters.GameTitle.Text.FontSize;
    this._gameTitleSprite.bitmap.textColor = TAA.mts.Parameters.GameTitle.Text.TextColor;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, TAA.mts.Parameters.GameTitle.Text.Alignment);
};

Scene_Title.prototype.createImageTitle = function(x, y, index){
    var titleImg = 'img/titles1/' + TAA.mts.Parameters.GameTitle.ImageName + ".png";
    var texture = PIXI.Texture.from(titleImg);
    var sprite = new PIXI.Sprite(texture);
    this._gameTitleCustomSprite = sprite;
    this._gameTitleCustomSprite.position.x = x;
    this._gameTitleCustomSprite.position.y = y;
    this.addChildAt(this._gameTitleCustomSprite, index);
};

TAA.mts.alias.Scene_Title.terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
    TAA.mts.alias.Scene_Title.terminate.call(this);
    if (this._gameTitleCustomSprite) {
        this._gameTitleCustomSprite.destroy();
    }
};

//=============================================================================
// Scene_Boot
//=============================================================================

TAA.mts.alias.Scene_Boot = TAA.mts.alias.Scene_Boot || {};
TAA.mts.alias.Scene_Boot.start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function(){
    if(DataManager.isBattleTest() || DataManager.isEventTest() || !([2, 3].contains(ConfigManager.titleMapSkip))){
        TAA.mts.alias.Scene_Boot.start.call(this);
    }
    else {
        this.taaSkipTitleScene();
    }
};

Scene_Boot.prototype.taaSkipTitleScene = function(){
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if(ConfigManager.titleMapSkip === 2){
        this.startNormalGame(true);
    }
    else if(ConfigManager.titleMapSkip === 3){
        this.loadLatestSave();
    }
};

TAA.mts.alias.Scene_Boot.startNormalGame = Scene_Boot.prototype.startNormalGame;
Scene_Boot.prototype.startNormalGame = function(skip){
    if(skip || Utils.RPGMAKER_NAME === 'MV') {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        if(Utils.RPGMAKER_NAME === 'MZ'){
            this.resizeScreen();
            this.updateDocumentTitle();
        }
        if(skip) SceneManager.goto(Scene_Map);
        else {
            SceneManager.goto(Scene_Title);
            Window_TitleCommand.initCommandPosition();
        }
    }
    else{
        TAA.mts.alias.Scene_Boot.startNormalGame.call(this);
    }
}

Scene_Boot.prototype.savefileId = function() {
    return DataManager.latestSavefileId();
};

Scene_Boot.prototype.loadLatestSave = function() {
    if(this.savefileId() < 0) {
        if(Utils.RPGMAKER_NAME === 'MZ' || (this.savefileId() <= 0 && Utils.RPGMAKER_NAME === 'MV')) 
            this.startNormalGame(); 
    }
    else {
        if(Utils.RPGMAKER_NAME === 'MZ'){
            this.resizeScreen();
            this.updateDocumentTitle();
        }
        Scene_Load.prototype.onSavefileOk.call(this);
    }
};

Scene_Boot.prototype.onLoadSuccess = function() {
    Scene_Load.prototype.onLoadSuccess.call(this);
};

Scene_Boot.prototype.onLoadFailure = function() {
    console.error('TAA_MapTitleScreen: Failed to load save id ' + this.savefileId());
    this.startNormalGame();
};

Scene_Boot.prototype.reloadMapIfUpdated = function(){
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
};

if(Utils.RPGMAKER_NAME === 'MZ') {
    Scene_Boot.prototype.isSavefileEnabled = function() {
        return true;
    };

    Scene_Boot.prototype.executeLoad = function(savefileId) {
        Scene_Load.prototype.executeLoad.call(this, savefileId);
    };
};

//=============================================================================
// Window_Options
//=============================================================================

TAA.mts.alias.Window_Options = TAA.mts.alias.Window_Options || {};
TAA.mts.alias.Window_Options.makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function(){
    TAA.mts.alias.Window_Options.makeCommandList.call(this);
    if($gameSystem.isTitleMapSkipOptionEnabled() === true)
        this.addCommand(TAA.mts.Parameters.SkipTitleOptions['Menu Text'], 'titleMapSkip');
};

Window_Options.prototype.skipTitleStatusText = function(value) {
    switch(value){
        case 2: return TAA.mts.Parameters.SkipTitleOptions['Skip to New Game'];
        case 3: return TAA.mts.Parameters.SkipTitleOptions['Skip to Latest Save'];
        case 1:
        default:
            return TAA.mts.Parameters.SkipTitleOptions['Do Not Skip'];
    }
};

TAA.mts.alias.Window_Options.statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if(symbol === 'titleMapSkip'){
        var value = this.getConfigValue(symbol);
        return this.skipTitleStatusText(value);
    }
    else
        return TAA.mts.alias.Window_Options.statusText.call(this, index);
};

TAA.mts.alias.Window_Options.processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if(symbol === 'titleMapSkip'){
        var value = this.getConfigValue(symbol);
        value = Math.max(1, (value+1) % 4);
        this.changeValue(symbol, value);
    }
    else
        TAA.mts.alias.Window_Options.processOk.call(this);
};

TAA.mts.alias.Window_Options.cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap){
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if(symbol === 'titleMapSkip'){
        var value = this.getConfigValue(symbol);
        value = (value === 1) ? 3 : value-1;
        this.changeValue(symbol, value);
    }
    else
        TAA.mts.alias.Window_Options.cursorLeft.call(this, wrap);
};

TAA.mts.alias.Window_Options.cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap){
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if(symbol === 'titleMapSkip'){
        var value = this.getConfigValue(symbol);
        value = Math.max(1, (value+1) % 4);
        this.changeValue(symbol, value);
    }
    else
        TAA.mts.alias.Window_Options.cursorRight.call(this, wrap);
};
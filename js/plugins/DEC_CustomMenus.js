//=========================================================
// DEC_CustomMenus.js
//=========================================================

/*:
 * @plugindesc v1.0 - a simple menu edit.
 * @author Deceius
 *
 * @help Plugin Commands:
 *   None.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.0	: Initial commit.
 * 
 * @param Inventory
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 * @param Skill
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 * @param Equip
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 * @param Status
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 * @param Options
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 * @param Game End
 * @type number
 * @min 0
 * Default: 90
 * @default 90
 * 
 */

Deceius.CustomMenu = Deceius.CustomMenu || {};

Deceius.Parameters = PluginManager.parameters("DEC_CustomMenus");
Deceius.Param = Deceius.Param || {};
Deceius.Param.Icons = {
    "inventory"     : Deceius.Parameters["Inventory"],
    "skill"         : Deceius.Parameters["Skill"],
    "equip"         : Deceius.Parameters["Equip"],
    "status"        : Deceius.Parameters["Status"],
    "options"       : Deceius.Parameters["Options"],
    "game end"      : Deceius.Parameters["Game End"],
};

Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,       'item');
    this.addCommand(TextManager.equip,      'equip');
    this.addCommand(TextManager.keyItem,    'keyItem');
};

Window_ItemCategory.prototype.maxCols = function() {
    return 3;
};



Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'equip':
        return DataManager.isWeapon(item) || DataManager.isArmor(item);
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
};

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    // this.createStatusWindow();
};

Scene_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.loadImages();
};

Scene_Menu.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.reserveFace(actor.faceName());
    }, this);
};

var og_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    og_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('skill',     this.commandSkill.bind(this));
    this._commandWindow.setHandler('equip',     this.commandEquip.bind(this));
    this._commandWindow.setHandler('status',     this.commandStatus.bind(this));
};

Scene_Menu.prototype.commandSkill = function() {
    $gameParty.setMenuActor($gameParty.members()[0]);
    SceneManager.push(Scene_ToolSkill);
};

Scene_Menu.prototype.commandEquip = function() {
    $gameParty.setMenuActor($gameParty.members()[0]);
    SceneManager.push(Scene_Equip);
};


Scene_Menu.prototype.commandStatus = function() {
    $gameParty.setMenuActor($gameParty.members()[0]);
    SceneManager.push(Scene_Status);
};


Window_MenuCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextWithIcon(this.commandName(index), rect.x, rect.y, rect.width, Deceius.Param.Icons[this.commandName(index).toLowerCase()]);
};

Window_MenuCommand.prototype.drawTextWithIcon = function(value, wx, wy, ww, icon) {
    this.resetTextColor();
    var cx = Window_Base._iconWidth;
    var text = Yanfly.Util.toGroup(value);
    if (this.textWidth(text) > ww - cx) {
      text = Yanfly.Param.GoldOverlap;
    }
    this.drawIcon(icon, wx , wy + 2);
    this.drawText(text, wx + cx + 4, wy, ww - cx - 4 , 'left');
    this.resetFontSettings();
  };

Window_Gold.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawTextWithIcon(this.value(), x, 0, width, Yanfly.Icon.Gold);
};

Window_Gold.prototype.drawTextWithIcon = function(value, wx, wy, ww, icon) {
    this.resetTextColor();
    var cx = Window_Base._iconWidth;
    var text = Yanfly.Util.toGroup(value);
    this.drawIcon(icon, wx , wy + 2);
    this.drawText(text, wx + cx + 4, wy, ww - cx - 4 , 'right');
    this.resetFontSettings();
};

  
  Window_EventItem.prototype.numVisibleRows = function() {
    return 3;
  };
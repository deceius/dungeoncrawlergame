Graphics._centerElement = function(element) {
  var width = element.width * this._realScale;
  var height = element.height * this._realScale;
  element.style.position = "absolute";
  element.style.margin = "auto";
  element.style.top = 0;
  element.style.left = 0;
  element.style.right = 0;
  element.style.bottom = 0;
  element.style.width = width + "px";
  element.style.height = height + "px";
  element.style["image-rendering"] = "pixelated";
  element.style["font-smooth"] = "none";
};

var Imported = Imported || {};
Imported.Shaz_RemoveShadows = true;

var Shaz = Shaz || {};
Shaz.RS = Shaz.RS || {};
Shaz.RS.Version = 1.0;

(function() {
  var _Shaz_RS_DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function(object) {
    _Shaz_RS_DataManager_onLoad.call(this, object);
    if (object === $dataMap) {
      var indexStart = $dataMap.width * $dataMap.height * 4;
      var indexEnd = $dataMap.width * $dataMap.height * 5;
      for (var i = indexStart; i < indexEnd; i++) {
        $dataMap.data[i] = 0;
      }
    }
  };
})();

PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

Scene_Base.prototype.checkGameover = function() {
  if ($gameParty.isAllDead()) {
    $gameTemp.reserveCommonEvent(2);
  }
};

Window_NameEdit.prototype.drawChar = function(index) {
  var rect = this.itemRect(index);
  this.resetTextColor();
  this.drawText(this._name[index] || "", rect.x, rect.y, rect.width, "center");
};

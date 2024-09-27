/*:
 * @plugindesc Teleports to specific regions
 * @author Deceius
 *
 * @help This plugin does not provide plugin commands.
 *
 * @param EntryPoints
 * @type number[]
 * @default ["20","21","22","23"]
 *
 * @param removeEntryPoint
 * @desc If set, change window height to this value
 * @type boolean
 * @default false
 *
 */

var Deceius = Deceius || {};
Deceius.Teleport = Deceius.Teleport || {};

Deceius.Parameters = PluginManager.parameters("DEC_TeleportToRegion");
Deceius.Param = Deceius.Param || {};
Deceius.Param.EntryPoints = JSON.parse(Deceius.Parameters["EntryPoints"]);



Deceius.FetchNextFloor = function(mapIds) {
  var currentMapId = $gameMap._mapId;
  var filteredMapIds = mapIds.filter(function (id) {
      return id !== currentMapId;
  });
  var mapId = filteredMapIds[Math.floor(Math.random() * filteredMapIds.length)];
  return mapId;

};

Deceius.FetchRegionCoordinates = function() {
  var entryPoints = Deceius.Param.EntryPoints;
  var region = entryPoints[Math.floor(Math.random() * entryPoints.length)];
  return $gameMap.findRegionCoordinates(parseInt(region));
};

Game_Map.prototype.findRegionCoordinates = function(regions) {
    var regions = [regions];
    var data = [];
    var width = this.width();
    var height = this.height();
    for (var x = 0; x < width; ++x) {
      for (var y = 0; y < height; ++y) {
        if (!regions.contains(this.regionId(x, y))) continue;
        if (this.eventsXy(x, y).length > 0) continue;
        if ($gamePlayer.x == x && $gamePlayer.y == y) continue;
        if (this.boat().posNt(x, y)) continue;
        if (this.ship().posNt(x, y)) continue;
        data = [x, y];
      }
    }
    return data;
};
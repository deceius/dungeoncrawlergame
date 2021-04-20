/*:
 * Slow Walking by Shaz
 * Ver 1.00 2018.03.07
 * Shaz_SlowWalking.js
 *
 *
 * @plugindesc Makes player walk at normal speed when using mouse
 * @author Shaz
 *
 *
 * @help This plugin does not provide plugin commands.
 *
 */

var Imported = Imported || {};
Imported.Shaz_SlowWalking = true;

var Shaz = Shaz || {};
Shaz.SW = Shaz.SW || {};
Shaz.SW.Version = 1.00;

(function() {
    Game_Player.prototype.updateDashing = function() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = this.isDashButtonPressed();
        } else {
            this._dashing = false;
        }
    };
})();
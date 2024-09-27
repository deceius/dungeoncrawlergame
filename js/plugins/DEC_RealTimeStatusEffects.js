//=========================================================
// DEC_RealTimeStatusEffects.js
//=========================================================

/*:
 * @plugindesc v1.0 - adds real-time status ailment effect check.
 * @author Deceius
 *
 * @help Plugin Commands:
 *   None.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.0	: Initial commit.
 * 
 * @param Tick Rate
 * @type number
 * @min 0
 * Default: 60
 * @default 60
 * 
 */
Deceius.RealtimeStatusEffects = Deceius.RealtimeStatusEffects || {};

Deceius.Parameters = PluginManager.parameters("DEC_RealTimeStatusEffects");
Deceius.Param = Deceius.Param || {};
Deceius.Param.TickRate = Number(Deceius.Parameters["Tick Rate"]);


var og_Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    og_Game_BattlerBase_initialize.call(this);
    this.initializeTickRate();
};


Game_BattlerBase.prototype.initializeTickRate = function() {
    this._tickRate = Deceius.Param.TickRate;
}

Game_BattlerBase.prototype.validateTickRate = function() {
    if(!this._tickRate){ 
        this.initializeTickRate();
        this.updateStates();
        return true;
    }
    this._tickRate--;
    return false;
}


Game_BattlerBase.prototype.updateStates = function() {
    this.regenerateAll();
    this.updateStateTurns();
    this.updateBuffTurns();
    this.removeStatesAuto(1);
    this.removeStatesAuto(2);
    this.removeBuffsAuto();
    this.startDamagePopup();
  };

Game_Battler.prototype.maxSlipDamage = function() {
    return this.hp; // override slip damage.
};



Sprite_StateOverlay.prototype.update = function() {
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updatePattern();
        this.updateFrame();
        this._animationCount = 0;
    }
};

var og_Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    this.battler().validateTickRate()
    og_Game_Player_update.call(this, sceneActive);
};


 // Override turn end on map. It is governed by game_player's update.
Game_Actor.prototype.turnEndOnMap = function() { };

var og_Game_Event_updateRasEvent = Game_Event.prototype.updateRasEvent;
Game_Event.prototype.updateRasEvent = function() {
    og_Game_Event_updateRasEvent.call(this);
    var battler = this.battler()
    if (battler.isEnemy()) {
        if (!battler.isDead()){
            var stateProc = battler.validateTickRate();
            if (battler.isDead() && battler.isEnemy()) {
                this.setDeadEnemy(this, battler);
                battler.handleEnemyDeath();
                this.clearActing();
                this.actionTimesClear();
                this.chainActionClear();
                this.chainActionHitClear();
                battler.clearRasCast();
                return;
            } 
        }
    }
    
};

Game_Enemy.prototype.handleEnemyDeath = function () {
    $gameParty.gainGold(this.gold());
    var oldLevel = $gameParty.leader()._level; 
    $gameParty.leader().gainExpCN(this.exp());
    if ($gameParty.leader()._level > oldLevel) {
        $gamePlayer.requestAnimation(Number(Moghunter.ras_levelAnimationID));
    }
}

Game_BattlerBase.prototype.stateOverlayIndex = function() {
    var states = this.states();
    if (states.length > 0) {
        return states[states.length - 1].overlay;
    } else {
        return 0;
    }
};
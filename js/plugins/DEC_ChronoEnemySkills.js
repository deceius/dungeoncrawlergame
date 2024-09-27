Game_CharacterBase.prototype.rangedAttackAim = function (range, toolId, attackDelay = 10) {
    if(this.getSight_Char($gamePlayer, range, 90)) {
        if (this.getSight_Char($gamePlayer, range, 0)) {
            this.act(toolId); 
            this._waitCount = attackDelay;
        }
        else {
            this.turnTowardPlayer();
            this.moveTowardPlayer();
        }
    } else {
        this.turnTowardPlayer();
        this.moveRandom();
    }
}
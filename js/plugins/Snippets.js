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

Game_Player.prototype.setKnockbackPose = function() {
  if (this.battlerPoses()) {
    this._poses.idle[1] = this._poses.idle[2];
    return this._originalName.name;//+ "_damage";
  }
  return "";
};

// Game_Player.prototype.setDashPose = function() {
//   if (this.battlerPoses()) {
//     this._poses.idle[1] = this._poses.idle[2];
//     return this._originalName.name + "(Y30)_dash";
//   }
//   return "";
// };

// Game_Player.prototype.setIdlePose = function() {
//   this._poses.idle[3] = true;
//   if (this._poses.idle[4] === null) {
//     this._poses.idle[4] = this._stepAnime;
//   }
//   this._stepAnime = true;
//   if (this.isDiagonalIdlePose()) {
//     return this.setDiagonalIdlePose();
//   } else {
//     return this._originalName.name + "(Y30)_idle";
//   }
// };

// Game_Player.prototype.setPose = function() {
//   this._poses.idle[3] = false;
//   if (this.isFaintPose()) {
//     return this.setFaintPose();
//   } else if (this.isKnockbackPose()) {
//     return this.setKnockbackPose();
//   } else if (this.isGuardPose()) {
//     return this.setGuardingPose();
//   } else if (this.isActionPose()) {
//     return this.setActionPose();
//   } else if (this.isVictoryPose()) {
//     return this.setVictoryPose();
//   } else if (this.isCastingPose()) {
//     return this.setCastingPose();
//   } else if (this.isAttackingPose()) {
//     return this.setAttackingPose();
//   } else if (this.isPickUPPose()) {
//     return this.setPickUPPose();
//   } else if (this.isPushPullPose()) {
//     return this.setPushPullPose();
//   } else if (this.isDashingPose()) {
//     return this.setDashPose();
//   } else if (this.isJumpingPose()) {
//     return this.setJumpPose();
//   } else if (this.isIdlePose()) {
//     return this.setIdlePose();
//   }
//   if (this.isDiagonalDefaultPose()) {
//     return this.setDiagonalDefaultPose();
//   } else {
//     return this._originalName.name + "(Y30)";
//   }
// };


Window_Help.prototype.initialize = function(numLines) {
  var width = Graphics.boxWidth;
  var height = this.fittingHeight(numLines || 2) ;
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  this._text = '';
};


Window_Help.prototype.fittingHeight = function(numLines) {
  return numLines * this.lineHeight() + this.standardPadding();
};



/// ABS SNIPPETS

Game_CharacterBase.prototype.horizDashAttacker=function(dashLength,leashX,leashY,battleCry,shieldDash,wallImpactAction)
{
	
	if (!this.logicCycle) //runs first time, determines the area this enemy is allowed to move in
	{
		this.originX=this.x
		this.originY=this.y
		this.logicCycle=1;
	}
	this.touchDamage(true);

	var leashX=leashX||5;
	var leashY=leashY||3;
	var dashLength = dashLength || 5;
	var battleCry = battleCry || 'Run'

	if (this.distanceToPoint($gamePlayer.x,$gamePlayer.y)>(leashX+leashY)*1.5)
		{
				//if the player is really far away, return to wait mode
				
			this.setSelf('A',false)
			this._moveSpeed=4.3;//return quickly
			this.tLoc(this.originX,this.originY)
			this.logicCycle=1;
		}else{

			
			switch ( this.logicCycle ) {
				//move randomly three times
				case 1:
				if (shieldDash)
					{
						this.shield(false);
					}
					this.setDirectionFix(false)
				case 2:
				case 3:
					this._moveSpeed=3.5;
					var newX=Math.max(this.originX-leashX-this.x, Math.min(this.originX+leashX-this.x  ,3*(Math.random()-.5)))
					var newY=Math.max(this.originY-leashY-this.y, Math.min(this.originY+leashY-this.y  ,3*(Math.random()-.5)))
					this.rLoc(newX,newY);
				
				break;
				case 4:
					//step towards player
					this.rLoc(3*(Math.random()) * (.5 - (this.x>$gamePlayer.x)), 3*(Math.random()*(.5 - (this.y>$gamePlayer.y))));
					
				break;
				case 5:
					if ((Math.abs(this.y-$gamePlayer.y)<1) && (Math.abs(this.x-$gamePlayer.x)<dashLength*1.5)) //if we're kinda lined up prepare to charge.  Be willing to whiff a charge as well.
					{
						this.turnTowardPlayer();
						this._shakeData[0] = 40; //charge up with a little shake
						this._waitCount+=40;
						AudioManager.playSe({name: battleCry, pan: 0, pitch: 100, volume: 70});

					}else{
						this.rLoc(3*(Math.random()) * (.5 - (this.x>$gamePlayer.x)),3*(Math.random()-.5));
						this.logicCycle=0;
						// wander and reset to beginning of cycle
					}
					
					
				break;
				case 6:
					if (shieldDash)
					{
						this.shield(true);
					}
						
					this._moveSpeed=5; //not high enough to cause clipping
					
					
					// because creatures with a diagonal target will slide when hitting walls
					// you don't get a good wall impact if it hits, then slides for half a second
					// and then screenshakes
					// so wall impact action only moves exactly horizontally.
					if (wallImpactAction)
					{
						
						//shoot horizontally even if we're facing diagonally.
						this.rLoc(dashLength *(1- 2*[1,4,7].includes(this._direction )),0)
					}else{
						
						if (Math.abs(this.y-$gamePlayer.y)*2< Math.abs(this.x-$gamePlayer.x))
						{
							//if we're still in a valid dash location aim for the player
							this.shootPastPlayer(dashLength,0,0) 
						}else{
							//otherwise just run forward
							this.shootForward(dashLength)
						}
					}

					this.setDirectionFix(true)
					
					if (wallImpactAction)
					{
						this.logicCycle= 10 // jump ahead to special logic
					}else{
						this.logicCycle=0;  //otherwise reset
						this._waitCount+=30; //little delay before it returns to wandering
					}
				
				break;				
				case 11:
					//special impact action
					//check to see if we stopped our moveroute hitting a wall
					if (this.isWallDir(this._direction))
					{
						// if so, shake the screen
						$gameScreen.startShake(4, 8, 30);
						AudioManager.playSe({name: 'Thunder9', pan: 0, pitch: 150, volume: 100});
						//delay the next step
						this._waitCount=50
						//make it vulnerable
						this.shield(false)
						//make it knockback for a second
						this.battler()._ras.knockback[1] =60;
					}
				 
				default: 
				this.logicCycle=0;
			}
			this.logicCycle++
		}
}
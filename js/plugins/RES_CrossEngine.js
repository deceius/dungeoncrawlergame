///////////////////////////////////////////////////////////////////////////////////////
// Character Motion Helper Functions
///////////////////////////////////////////////////////////////////////////////////////

//===============================
//sets target location to coordinates (short so can see in movement route window)
Game_CharacterBase.prototype.tLoc = function(xcoord,ycoord,skippable)
{
	this._moveTargetX = xcoord; 
	this._moveTargetY = ycoord; 
	this.setDirectionVector(xcoord-this.x,ycoord-this.y); // turn
	this._moveTarget = true; 
	if (skippable==undefined)
	{
		this._moveTargetSkippable = true; 
	}else{
		this._moveTargetSkippable = skippable; 
	}
}
//the same, but RELATIVE to your location
// note: doesn't work on looping maps, blame altimit
Game_CharacterBase.prototype.rLoc = function(xcoord,ycoord,skippable)
{
	this._moveTargetX = xcoord+this.x; 
	this._moveTargetY = ycoord+this.y; 
	this.setDirectionVector(xcoord,ycoord); // turn
	this._moveTarget = true; 
	if (skippable==undefined)
	{
		this._moveTargetSkippable = true; 
	}else{
		this._moveTargetSkippable = skippable; 
	}
}

//calculates the distance from an event to a given point.
Game_CharacterBase.prototype.distanceToPoint = function(xcoord,ycoord)
{
	var distance = Math.sqrt( (this.x-xcoord)*(this.x-xcoord) + (this.y-ycoord)*(this.y-ycoord) );
	return distance;
}

//requires tool_diagonal_angle to be OFF
//do a turn towards player on this first, so it actually is aimed properly for guarding
Game_CharacterBase.prototype.rotFacePlayer = function (){
	var vx = $gamePlayer.x - this.x;  
	var vy = $gamePlayer.y - this.y;   
	this.setDirectionVector( vx, vy );
	if (this._frames.dirNum == 4)
	{
		var direcArray = [0,-90,0,0,-90,0,90,180,180,90];//number pad directions -> angle.  
	}else{
		
			 
	//I am assigning everything one step counterclockwise.
	//5 and 0 are facing forward, they're not real directions per se but no reason to tempt fate.
    //return (this._character.direction() - 2) / 2; //original code which didn't handle diagonals

		 //we DO have a custom number of directions!  Now we have to switch based on it
		 switch(this._frames.dirNum)
		 {
			      //NUMPAD [0,1,2,3,4,5,6,7,8,9]
			 case 1:
			 var direcArray=[0,0,0,0,0,0,0,0,0,0];  //one image, one pattern
			 //image is facing DOWN
			 break;
			 case 2:
			 var direcArray=[45,-45,45,45,-45,45,45,-45,-45,45]; //d2 : two-pose fake isometric where down=right and up=left
											      // (sprite sheet is a down-diagonal sprite horizontally flipped
												  // with right in the first slot, left in the second slot)
			 break;
			 case -2:
			 var direcArray=[-45,-45,-45,45,-45,-45,45,-45,45,45]; //d-2 : two-pose fake isometric where down=left and up=right
			 break;
			 case 8:
			 case 9:
			 var direcArray=[0,-45,0,45,-90,0,90,-135,180,135]; 
			 break;
		 }
		
	}
	
	if (Imported.Blizzard_UltraMode7)
	{
		//if we're using ultra mode seven then compensation for weird direction stuff
		this.setAngle((3600 + ((Math.atan2( vy, vx ) -Math.PI/2)*180/Math.PI + direcArray[UltraMode7.rotateDirection(this.direction(),true)]))%360);

		
	}else{
			
		this.setAngle((3600 + ((Math.atan2( vy, vx ) -Math.PI/2)*180/Math.PI + direcArray[this.direction()]))%360);
	}
}

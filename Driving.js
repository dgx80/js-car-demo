/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//50 = 6
//45 = 8
//40 = 8
//35 = 10
//30 = 11
//25 = 12
//20 = 13
//15 = 14
//10 = 14
//5 = 14
//var turnArray = new Array(     0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50);
//var turnArrayRatio = new Array(0,14, 14, 14, 13, 12, 11, 10,  8,  8,  6);
var turnArray = new Array(     0, 5, 10, 15, 20, 25, 30);
var turnArrayRatio = new Array(0,14, 14, 14, 13, 12, 11);

Object.freeze(turnArray);

var DRIVE_CONST = 
{
  WAIT_TURN_INCREASE_STEP_MAX : {value: 10}
};
Object.freeze(DRIVE_CONST);

var ANGLE_TYPE = new Array(0,5,10,15,20,25,30);
Object.freeze(ANGLE_TYPE);

function Driving(parent,axlepos,track)
{
    this.Turningstep = 0;
    this.WaySide = SIDE_TYPE.MID;
    this.WaySideRealWheelAngle = SIDE_TYPE.MID;
    this.waitTurnAngleStepTrigger = new StepTrigger(DRIVE_CONST.WAIT_TURN_INCREASE_STEP_MAX.value);
    this.parent = parent;
    this.axlepos = new Point(axlepos.x,axlepos.y);
    this.wheelframe = 0;
    this.track = track;
}
Driving.prototype.UpdateTurning = function()
{
    var n = 0;
    
    this.UpdateWheelAngle();
    n = turnArray[this.Turningstep];
    if(this.WaySideRealWheelAngle.value == SIDE_TYPE.LEFT.value)
    {
        n = 0 - n;
    }
    return n;
}
Driving.prototype.UpdateWheelAngle = function()
{
    //savoir si langle d<attaque augmente reste pareil
    if(this.waitTurnAngleStepTrigger.Update())
    {
        switch(this.WaySide.value)
        {
            case SIDE_TYPE.MID.value:
                this.DecrementTurningStep();
                break;
            case SIDE_TYPE.RIGHT.value:
                if(this.WaySideRealWheelAngle.value == SIDE_TYPE.LEFT.value)
                {
                    this.DecrementTurningStep();
                }
                else 
                {
                    this.IncrementTurningStep();
                }
                break; 
            case SIDE_TYPE.LEFT.value:
                if(this.WaySideRealWheelAngle.value == SIDE_TYPE.RIGHT.value)
                {
                    this.DecrementTurningStep();
                }
                else 
                {
                    this.IncrementTurningStep();
                }
                break;
        }
    }   
};

Driving.prototype.TurnRight = function() 
{
    if(this.WaySide.value == SIDE_TYPE.MID.value)
    {
        this.WaySide = SIDE_TYPE.RIGHT;
    }   
};
Driving.prototype.TurnLeft = function()
{
    if(this.WaySide.value == SIDE_TYPE.MID.value)
    {
        this.WaySide = SIDE_TYPE.LEFT;
    }
};
Driving.prototype.TurnLeftStop = function()
{
    if(this.WaySide.value == SIDE_TYPE.LEFT.value)
    {
        this.WaySide = SIDE_TYPE.MID;        
    }
};
Driving.prototype.TurnRightStop = function()
{
    if(this.WaySide.value == SIDE_TYPE.RIGHT.value)
    {
        this.WaySide = SIDE_TYPE.MID;
    }
};
Driving.prototype.IncrementTurningStep = function()
{
    if(this.Turningstep < (turnArray.length - 1) )
    {
        if(this.Turningstep == 0)
        {
            this.WaySideRealWheelAngle = this.WaySide;
        }
        this.Turningstep++;
        this.UpdateWheelAnimation();
    }
};
Driving.prototype.UpdateWheelAnimation = function()
{
    var a = turnArray[this.Turningstep];
    var index = 0;

    for(var i = 0; i < ANGLE_TYPE.length; i++)
    {
        if(ANGLE_TYPE[i] >= a)
        {
            var offset = 0;

            if(this.WaySideRealWheelAngle.value == SIDE_TYPE.LEFT.value)
            {
                offset = 1;
            }
            if(i > 0)
            {
                index = (i*2) - offset;
            }
            break;
        }
    }
    this.wheelframe = index;
}
Driving.prototype.DecrementTurningStep = function()
{
    if(this.Turningstep > 0 )
    {
        this.Turningstep--;
        if(this.Turningstep == 0)
        {
            this.wheelframe = SIDE_TYPE.MID.value;
            this.WaySideRealWheelAngle  = SIDE_TYPE.MID;

        }
        else
        {
            this.UpdateWheelAnimation();
        }
    }
};
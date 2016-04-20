/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var MOTOR_ACTION_TYPE = 
{
    STOP: 0,
    ACCELERATE_FORWARD: 1,
    DECCELERATE_FORWARD: 2,
    ACCELERATE_BACKWARD: 3,
    DECCELERATE_BACKWARD: 4
};
Object.freeze(MOTOR_ACTION_TYPE);
var STRING_CARS =
{
     PATH: PATH.ASSETS + 'cars/',
     WHEELS: 'wheel',
     EXT: '.png',
     FRAME : 'frame',
     STRIPE : 'stripe',
     DATA: 'cars_data.xml',
     TAG: 'car'
};
Object.freeze(STRING_CARS);

function Car(x,y,tag,context)
{
    var NodeLst = GetXmlNodeList(STRING_CARS.PATH + STRING_CARS.DATA,STRING_CARS.TAG);
    var index = -1;
    for (i=0;i<myNodes.length;i++)
    {
        var tagname = GetXmlNodeValue(NodeLst,'tag',i);
        if(tag == tagname)
        {
            index = i;
            break;
        }
    }
    if(index >= 0)
    {
        var name = GetXmlNodeValue(NodeLst,'name',index);
        var path = STRING_CARS.PATH + GetXmlNodeValue(NodeLst,'path',index) + name;
        Sprite.call(this,x,y,path + '_' + STRING_CARS.FRAME + STRING_CARS.EXT,context);
        this.distanceEssieu = GetXmlNodeValue(NodeLst,'distanceEssieux',index);
        this.originRot.Append(new Point(GetXmlNodeValue(NodeLst,'originXRot',index),GetXmlNodeValue(NodeLst,'originXRot',index)));
        this.driving = new Driving(this,this.originRot,20);
        this.lastspeed = 0;
        this.lastWheelAngle = 0;
        this.lastAngleIncrement = 0;
        this.distanceRadial = 0;
        this.motorAction = MOTOR_ACTION_TYPE.STOP;
        this.wheelBack = new Sprite(x,y,this.GetWheelPath(path,DIR_TYPE.BACK, ANGLE_TYPE[0],SIDE_TYPE.MID),context);
        this.lstWheelFront = new Array(ANGLE_TYPE.length*2-1);
        this.lstWheelFront[0] = new Sprite(x,y,this.GetWheelPath(path,DIR_TYPE.FRONT,ANGLE_TYPE[0],SIDE_TYPE.MID),context);
        var index = 0;
        for(var i = 1; i < this.lstWheelFront.length; i++)
        {
            index = ((i-1)/2)+1;
            index = Math.floor(index);
            if(i % 2)
            {
                this.lstWheelFront[i] = new Sprite(x,y,this.GetWheelPath(path,DIR_TYPE.FRONT,ANGLE_TYPE[index],SIDE_TYPE.LEFT),context)
            }
            else
            {
                this.lstWheelFront[i] = new Sprite(x,y,this.GetWheelPath(path,DIR_TYPE.FRONT,ANGLE_TYPE[index],SIDE_TYPE.RIGHT),context)
            }
        }
        this.stripe = new Sprite(x,y,path + '_' + STRING_CARS.STRIPE + STRING_CARS.EXT,context);
        
        this.AddBackChild(this.wheelBack);
        this.AddForeChild(this.stripe);
    }
}
Car.prototype = Object.create(Sprite.prototype);

Car.prototype.GetWheelPath = function(path,dirtype, deg, sidetype)
{
    var s = path + '_'+ STRING_CARS.WHEELS + '_' + dirtype.name;
    
    if(dirtype.value == DIR_TYPE.FRONT.value)
    {
        s += '_' + sidetype.code + '_' + deg;
    }
    
    s += STRING_CARS.EXT;
    
    return s;
}
Car.prototype.OnUpdate = function()
{
    this.UpdateAngularSpeed();
    Sprite.prototype.OnUpdate.call(this);
    var n = this.driving.UpdateTurning();
    
    if(n != 0 && this.speedReal != 0)
    {
        //if(n != this.lastWheelAngle)
        {
            this.lastWheelAngle = n;
            n = Math_DegToRad(n);
            var s1 = Math.sin(n);
            this.distanceRadial = this.distanceEssieu / s1;

            var k = this.speedReal/(2 * this.distanceRadial);
            var as = Math.asin(k);
            n = 2 * as;
            n = Math_RadToDeg(n);
            this.lastAngleIncrement = n;
        }/*
        else if(this.lastspeed != this.speedReal)
        {
            this.lastspeed = this.speedReal;
            var k = this.speedReal/(2 * this.distanceRadial);
            var as = Math.asin(k);
            n = 2 * as;
            n = Math_RadToDeg(n);
            this.lastAngleIncrement = n;
        }
        else 
        {
            n = this.lastAngleIncrement;
        }*/
        this.AngleIncrementDeg(n/turnArrayRatio[this.driving.Turningstep]);
    }
    this.UpdateMotorSpeed();
}
Car.prototype.OnDraw = function()
{
    Sprite.prototype.DrawBegin.call(this);
    this.lstWheelFront[this.driving.wheelframe].OnDraw();
    Sprite.prototype.OnDraw.call(this);
    Sprite.prototype.DrawEnd.call(this);
}
Car.prototype.OnKeyDown = function(k)
{
   Sprite.prototype.OnKeyDown.call(this,k);
   // Flêche de droite
    if (k == 39) 
    {
        this.driving.TurnRight();
    }
    // Flêche de gauche
    else if (k == 37) 
    {
        this.driving.TurnLeft();
    }
    else if (k == 65 || k == 38) //a
    {
        this.AccelerateForward();
    }
    else if (k == 83 || k == 40)//s 
    {
        this.AccelerateBackward();
    }
};
Car.prototype.OnKeyUp = function(k)
{
   Sprite.prototype.OnKeyUp.call(this,k);
   // Flêche de droite préssée
    if (k == 39) 
    {
        this.driving.TurnRightStop();
    }
    // Flêche de gauche préssée
    else if (k == 37) 
    {
        this.driving.TurnLeftStop();
    }
    else if (k == 65 || k == 38) //a
    {
        this.ForwardStop();
    }
    else if (k == 83 || k == 40)//s 
    {
        this.BackwardStop();
    }
}
Car.prototype.debug = function(context)
{
    var msg = "Turn:" + this.driving.WaySide.name + '\n';
    msg += 'Real:'+ this.driving.WaySideRealWheelAngle.name + '\n';
    msg += 'turn step:'+ this.driving.Turningstep + '\n';
    msg += 'Wheel angle:'+ turnArray[this.driving.Turningstep] + '\n';
    msg += 'Wheel frame:'+ this.driving.wheelframe + '\n';
    
    mlFillText(context,msg, 10, 10);    
}
Car.prototype.UpdateMotorSpeed = function()
{
    switch(this.motorAction)
    {
        case MOTOR_ACTION_TYPE.STOP:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_FORWARD:
            this.Forward();
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_FORWARD:
            if(this.Brake())
            {
                this.motorAction = MOTOR_ACTION_TYPE.STOP;
            }
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD:
            this.Backward();
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD:
            if(this.Brake())
            {
                this.motorAction = MOTOR_ACTION_TYPE.STOP;
            }
            break;
        
    }
}
Car.prototype.AccelerateForward = function()
{
    switch(this.motorAction)
    {
        case MOTOR_ACTION_TYPE.STOP:
            this.motorAction = MOTOR_ACTION_TYPE.ACCELERATE_FORWARD;
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_FORWARD:
            this.motorAction = MOTOR_ACTION_TYPE.ACCELERATE_FORWARD;
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD:
            break;
        
    }
}
Car.prototype.AccelerateBackward = function()
{
    switch(this.motorAction)
    {
        case MOTOR_ACTION_TYPE.STOP:
            this.motorAction = MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD;
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD:
            this.motorAction = MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD;
            break;        
    }
}
Car.prototype.ForwardStop = function()
{
    switch(this.motorAction)
    {
        case MOTOR_ACTION_TYPE.STOP:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_FORWARD:
            this.motorAction = MOTOR_ACTION_TYPE.DECCELERATE_FORWARD;
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD:
            break;
    }
}
Car.prototype.BackwardStop = function()
{
    switch(this.motorAction)
    {
        case MOTOR_ACTION_TYPE.STOP:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_FORWARD:
            break;
        case MOTOR_ACTION_TYPE.ACCELERATE_BACKWARD:
            this.motorAction = MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD;
            break;
        case MOTOR_ACTION_TYPE.DECCELERATE_BACKWARD:
            break;
    }
}
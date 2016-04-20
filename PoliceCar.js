/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var CONST_POLICE = 
{
    PATH: STRING_CARS.PATH + 'police/',
    FLARE: 'flare',
    FLARE_ANIM_WAIT: 20
};
Object.freeze(CONST_POLICE);
var ANIM_FLARE = new Array('01','02','03','04','05','06'); 
Object.freeze(ANIM_FLARE);

//var SIREN_LIST = new Array('sirene_police_01.ogg','sirene_police_02.ogg','sirene_police_03.ogg');
var SIREN_LIST = new Array('sirene_police_02.ogg','sirene_police_03.ogg');

Object.freeze(SIREN_LIST);

function PoliceCar(x,y,tag,context)
{
    Car.call(this,x,y,tag,context);
    this.TriggerFlareLightAnim = new StepTrigger(CONST_POLICE.FLARE_ANIM_WAIT);
    this.flare = new Sprite(x,y,CONST_POLICE.PATH + CONST_POLICE.FLARE + '.png',context);
    this.siren = new Array();
    
    for(var i = 0; i < SIREN_LIST.length; i++)
    {
        var s = new Audio(PATH.SOUND + SIREN_LIST[i])
        s.volume = 0.2;
        this.siren.push(s);
        s.addEventListener("ended", function() 
        {
            this.sirenIndex++;
            if(this.sirenIndex >= SIREN_LIST.length)
            {
                this.sirenIndex--;
            }
            if(this.Alarm)
            {
                this.siren[this.sirenIndex].play();
            }
        }.bind(this),false);
    
    }
    
    this.sirenIndex = 0;
    
        
    for(var i = 0 ; i < ANIM_FLARE.length; i++)
    {
        var path = CONST_POLICE.PATH + CONST_POLICE.FLARE + '_' + ANIM_FLARE[i] + '.png'
        ;
        if(i == 0)
        {
            this.flareLight = new Sprite(x,y,path,context);
        }
        else 
        {   
            this.flareLight.AddImage(path);
        }
    }
    this.Alarm = false;
    this.flareLight.SetVisible(false);
    this.AddForeChild(this.flare);
    this.AddForeChild(this.flareLight);
}

PoliceCar.prototype = Object.create(Car.prototype);

PoliceCar.prototype.OnUpdate = function()
{
    Car.prototype.OnUpdate.call(this);

    if(this.TriggerFlareLightAnim.Update())
    {
        this.flareLight.AnimationNextFrame();
    }
}
PoliceCar.prototype.OnKeyDown = function(k)
{
    Car.prototype.OnKeyDown.call(this,k);
}
PoliceCar.prototype.OnKeyUp = function(k)
{
    Car.prototype.OnKeyUp.call(this,k);
   
    if (k == 80)//p 
    {
        if(this.Alarm)
        {
            this.SetAlarm(false);
        }
        else
        {
            this.SetAlarm(true);
        }
        
    }
   
}
PoliceCar.prototype.SetAlarm = function(val)
{
    this.Alarm = val;
    this.flareLight.SetVisible(val);
    if(val)
    {
        this.sirenIndex = 0;
        this.siren[this.sirenIndex].play();
    }
    else
    {
        this.siren[this.sirenIndex].pause();
    }
}

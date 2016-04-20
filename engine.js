/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Engine(width,height)
{
    window.addEventListener('load', Engine.prototype.load.bind(this), false);
    this.lstCars = new Array();
    this.level = 1;
    this.player1 = null;
    this.boucle = setInterval(Engine.prototype.OnUpdate.bind(this));
    this.width = width;
    this.height = height;
    
}

Engine.prototype.load = function()
{
    this.canvas = document.getElementById('canvasElem');
    if (!this.canvas) 
    {
          return;
    }
    // On récupère le contexte 2D
    this.context2d = this.canvas.getContext('2d');
    if (!this.context2d) {
          return;
    }
    
    var l = this.level.toString();
    if(l.length == 1)
    {
        l = '0' + l;
    
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.map = new Map(this.width,this.height,this.context2d);
    var xmlLevel = PATH.LEVELS + l + ".xml";
    this.LoadCar(xmlLevel);
    //load map
    this.map.Load(xmlLevel);
    
    // Gestion des évènements
    window.document.onkeydown = Engine.prototype.onKeyDown.bind(this);
    window.document.onkeyup  = Engine.prototype.onKeyUp.bind(this);
    window.requestAnimationFrame(Engine.prototype.Render.bind(this));
}
Engine.prototype.LoadCar = function(xmlLevel)
{ 
    var myNodes = GetXmlNodeList(xmlLevel,"car");
    //loading car
    for (i=0;i<myNodes.length;i++)
    {
        var tag = GetXmlNodeValue(myNodes,'tag',i);
        var x = GetXmlNodeValueInt(myNodes,'x',i);
        var y = GetXmlNodeValueInt(myNodes,'y',i);
        var player = GetXmlNodeValue(myNodes,'player',i);
        var obj = GetXmlNodeValue(myNodes,'object',i);
        
        if(obj == ObjectPool.CAR)
        {
            var car = new Car(x,y,tag,this.context2d);
            this.lstCars.push(car);
            if(player == 1)
            {
                this.player1 = car;
            }
        }
        else if(obj == ObjectPool.POLICE)
        {
            var car = new PoliceCar(x,y,tag,this.context2d);
            //alert(typeof(car));
            this.lstCars.push(car);
            if(player == 1)
            {
                this.player1 = car;
            }
        }
    }
}

Engine.prototype.onKeyDown = function(e)
{
    if(this.player1)
    {
        this.player1.OnKeyDown(e.keyCode);
    }
    
};
Engine.prototype.onKeyUp = function(e)
{

    if(this.player1)
    {
        this.player1.OnKeyUp(e.keyCode);
    }
};
Engine.prototype.OnUpdate = function()
{
    for(var i = 0; i < this.lstCars.length;i++)
    {
        this.lstCars[i].OnUpdate();    
    }
    this.map.UpdateCharacterPosition(this.player1.position);
    this.map.OnUpdate();
    
}
Engine.prototype.Render = function()
{
    if(this.context2d !== 'undefined')
    {
        this.context2d.clearRect(0, 0, this.width, this.height);
        this.map.OnDraw();
        for(var i = 0; i < this.lstCars.length;i++)
        {
            this.lstCars[i].OnDraw();  
            //this.lstCars[i].debug(this.context2d);      
        }
    }
    window.requestAnimationFrame(Engine.prototype.Render.bind(this));
}

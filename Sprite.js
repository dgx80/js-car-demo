/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var MapOffset = new Point(0,0);

function Sprite(x,y,img,context)
{ 
    this.position = new Point(x,y);
    this.offset = new Point(0,0);
    this.originRot = new Point(0,0);
    this.absolutePosition = new Point(0,0);
    this.speedX = 0;
    this.speedY = 0;
    this.speedReal = 0;
    this.speedMaxAv = 2;
    this.speedMaxAr = -1;
    this.angle = 0;
    this.imglst = new Array();
    this.bReady = false;
    this.acceleration = 0.01;
    this.decceleration = 0.01;
    this.imageObj = null;
    this.currentFrameAnimIndex = -1;
    this.ForeChilds = new Array();
    this.BackChilds = new Array();
    this.bVisible = true;
    this.nScaleH = 1;
    this.nScaleV = 1;
    this.bFlipH = false;
    this.bFlipV = false;
    this.context = context;
    
    if(img !== '')
    {
        this.AddImage(img);
        this.SetImageSrc(0);
    }
}
Sprite.prototype.AddForeChild = function(child)
{
    if(child != 'undefined')
    {
        this.ForeChilds.push(child);
    }
}
Sprite.prototype.AddBackChild = function(child)
{
    if(child != 'undefined')
    {
        this.BackChilds.push(child);
    }
}
Sprite.prototype.AddImage = function(path)
{
    var i = new Image();
    i.src = path;
    this.imglst.push(i);
};

Sprite.prototype.SetImageSrc = function(index)
{
    if(index < this.imglst.length)
    {
        this.imageObj = this.imglst[index];
        this.currentFrameAnimIndex = index;
    }
};
Sprite.prototype.SetImageLoaded = function(img)
{
    this.imglst.push(img);
    this.SetImageSrc(0);
}
Sprite.prototype.AnimationNextFrame = function()
{
    var index = this.currentFrameAnimIndex;
    index++;
    if(index >= this.imglst.length)
    {
        index = 0;
        
    }
    this.SetImageSrc(index);
};
Sprite.prototype.OnUpdate = function()
{
    if(this.bReady)
    {
        this.position.x += this.speedX;
        this.position.y += this.speedY;
        
    }
    else
    {
        this.bReady = true;
    }
};
Sprite.prototype.OnKeyDown = function(k)
{
    
};
Sprite.prototype.OnKeyUp = function(k)
{
    
};
Sprite.prototype.UpdateAngularSpeed = function()
{
    var rad = Math_DegToRad(this.angle);
    this.speedX = this.speedReal* Math.cos(rad);
    this.speedY = this.speedReal* Math.sin(rad);
};

Sprite.prototype.DrawBegin = function()
{
    if(this.context && this.imageObj)
    {
        this.context.save();
        //this.context.translate(100+this.position.x,100+this.position.y);
        var pt = new Point(this.position.x,this.position.y);
        pt.Add(this.offset);
        pt.Sub(MapOffset);
        
        this.context.translate(pt.x,pt.y);
        this.context.translate(this.originRot.x,this.originRot.y);
        var rad = Math_DegToRad(this.angle);
        this.context.rotate(rad);
        this.context.translate(0-this.originRot.x,0-this.originRot.y);
        if(this.bFlipH || this.bFlipV)
        {
            var tx = 0;
            var ty = 0;
            if(this.bFlipH)
            {
                tx = this.imageObj.naturalWidth;
            }
            if(this.bFlipV)
            {
                ty = this.imageObj.naturalHeight;
            }
            this.context.translate(tx,ty);
            this.context.scale(this.nScaleH,this.nScaleV);
        }
        
    }
}
Sprite.prototype.DrawEnd = function()
{
    if(this.context)
    {
        this.context.restore();
    }
}
Sprite.prototype.OnDraw = function()
{
    if(this.context && this.bVisible)
    {   
        var i = 0;
        for(i = 0; i < this.BackChilds.length;i++)
        {
            this.BackChilds[i].OnDraw();
        }
        if(this.imageObj)
        {
            this.context.drawImage(this.imageObj, 0, 0);
        }
        
        for(i = 0; i < this.ForeChilds.length;i++)
        {
            this.ForeChilds[i].OnDraw();
        }
    }
};
Sprite.prototype.SetVisible = function(val)
{
    this.bVisible = val;
}
Sprite.prototype.Forward = function()
{
    if(this.speedReal < this.speedMaxAv )
    {
         this.speedReal += this.acceleration;
        this.UpdateAngularSpeed();
    }
};
Sprite.prototype.Backward = function()
{
    if(this.speedReal > this.speedMaxAr )
    {
        this.speedReal -= this.decceleration;
        this.UpdateAngularSpeed();
    }
};
Sprite.prototype.Brake = function()
{
    var stopped = false;
    if(this.speedReal > 0)
    {
        if(this.speedReal - this.decceleration > 0)
        {
            this.speedReal -= this.decceleration;
        }
        else
        {
            this.speedReal = 0;
        }
    }
    else if(this.speedReal < 0)
    {
        if(this.speedReal + this.decceleration < 0)
        {
            this.speedReal += this.decceleration;
        }
        else
        {
            this.speedReal = 0;
        }
    }
    if(this.speedReal == 0)
    {
        stopped = true;
    }
    this.UpdateAngularSpeed();
    return stopped;
};
Sprite.prototype.AngleIncrementDeg = function(deg)
{
    this.angle += deg;
};
Sprite.prototype.SetAngle = function(deg)
{
    this.angle = deg;
};
Sprite.prototype.FlipImage = function(bFlipH,bFlipV)
{
    this.bFlipH = bFlipH;
    this.bFlipV = bFlipV;
    
    if(bFlipH)
    {
        this.nScaleH = -1;
    }
    else 
    {
        this.nScaleH = 1;
    }
    if(bFlipV)
    {
        this.nScaleV = -1;
    }
    else 
    {
        this.nScaleV = 1;
    }
}
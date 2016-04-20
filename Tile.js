/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Tile(id,rotation,bFlipH,bFlipV,picIndex,line,col,x,y,context)
{
    Sprite.call(this,x,y,'',context);
    this.ID = id;
    this.SetAngle(rotation);
    this.FlipImage(bFlipH,bFlipV);
    this.picIndex = picIndex;
    this.line = line;
    this.column = col;
    this.Image = null;
}
Tile.prototype = Object.create(Sprite.prototype);



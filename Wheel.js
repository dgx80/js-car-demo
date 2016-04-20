/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Wheel(x,y,img,context)
{
    Sprite.call(this,x,y,img,context);
}

Wheel.prototype = Object.create(Sprite.prototype);
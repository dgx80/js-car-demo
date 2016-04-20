/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Point(x,y)
{
    this.x = x;
    this.y = y;
}
Point.prototype.Add = function(pt)
{
    this.x += pt.x;
    this.y += pt.y;
};
Point.prototype.Sub = function(pt)
{
    this.x -= pt.x;
    this.y -= pt.y;
};
Point.prototype.Append = function(pt)
{
    this.x = pt.x;
    this.y = pt.y;
};

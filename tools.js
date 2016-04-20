/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function mlFillText(ctx, text, posX, posY)
{
    drawString(ctx,text, posX, posY, 'blue', 0, 'arial', 10);
}
function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
	var lines = text.split("\n");
	if (!rotation) rotation = 0;
	if (!font) font = "'serif'";
	if (!fontSize) fontSize = 16;
	if (!textColor) textColor = '#000000';
	ctx.save();
	ctx.font = fontSize + "px " + font;
	ctx.fillStyle = textColor;
	ctx.translate(posX, posY);
	ctx.rotate(rotation * Math.PI / 180);
	for (i = 0; i < lines.length; i++) {
 		ctx.fillText(lines[i],0, i*fontSize);
	}
	ctx.restore();
}
var MATH_CONST = 
{
    K_DEG_TO_RAD : {value: Math.PI/180},
    K_RAD_TO_DEG : {value: 360/2*Math.PI},
};
Object.freeze(MATH_CONST);

function Math_DegToRad(deg)
{
    var rad = deg * MATH_CONST.K_DEG_TO_RAD.value;
    return rad;
}
function Math_RadToDeg(rad)
{
    var deg = rad * MATH_CONST.K_RAD_TO_DEG.value;
    return deg;
}
function GetXmlNodeList(file,tag)
{
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.open("GET",file,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    myNodes=xmlDoc.getElementsByTagName(tag);
    return myNodes;
}
function GetXmlNodeValueInt(Nodes, tag, index)
{
    return parseInt(GetXmlNodeValue(Nodes, tag, index));
}
function GetXmlNodeValue(Nodes, tag, index)
{
    var el = Nodes[index].getElementsByTagName(tag);
    var n = el[0];
    return n.childNodes[0].nodeValue;
}
function parseBool(val)
{
    var b = false;
    if(val == 'true')
    {
        b = true;
    }
    return b;
}
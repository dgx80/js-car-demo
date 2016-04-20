/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var MAP_CONST =
{
    PATH: PATH.ASSETS + 'map/',
    DATA: PATH.ASSETS + 'map/map_data.xml'
};
Object.freeze(MAP_CONST);

var MAP_STATE = 
{
    INIT: {value:0,  name: 'INIT'},
    LOADING: {value:1, name: 'LOADING'},
    LOADED: {value:2, name: 'LOADED'},
    READY: {value:3, name: 'READY'}
};
Object.freeze(MAP_STATE);

function Map(width,height,context)
{
    this.Tiles = new Array();
    this.ViewSize = new Dimension(width,height);    
    Sprite.call(this,0,0,'',context);
    this.Images = new Array();
    this.state = MAP_STATE.INIT;
    this.ImagesLoadedCount = 0;
    this.MapSize = new Dimension(0,0);
    this.TileSize = new Dimension(0,0);
    this.CameraPosition = new Point(0,0);
}
Map.prototype = Object.create(Sprite.prototype);
Map.prototype.Load = function(xmlLevel)
{
    var myNodes = GetXmlNodeList(xmlLevel,"tile");
    var settings = GetXmlNodeList(MAP_CONST.DATA,"settings");
    this.TileSize.height = GetXmlNodeValueInt(settings,'height',0);
    this.TileSize.width = GetXmlNodeValueInt(settings,'width',0);
    var mapsize = GetXmlNodeList(xmlLevel,"mapSize");
    this.MapSize.width = GetXmlNodeValueInt(mapsize,'width',0);
    this.MapSize.height = GetXmlNodeValueInt(mapsize,'height',0);
    
    
    this.countH = this.MapSize.width / this.TileSize.width;
    this.countV = this.MapSize.height / this.TileSize.height;
    
    
    var pictures = GetXmlNodeList(MAP_CONST.DATA,"picture");
    //commencer par loader le data brut des picture pour loader les image
    for (i=0;i<pictures.length;i++)
    {
        var im = new Image();
        var s = MAP_CONST.PATH + GetXmlNodeValue(pictures,'filename',i);
        im.src = s;
        im.onload = Map.prototype.ImageLoaded.bind(this);
        this.Images.push(im);
    }
    var tiles = GetXmlNodeList(MAP_CONST.DATA,"tile");
    //ensuite loader la map du level et la configuration des tiles
    for (i=0;i<myNodes.length;i++)
    {
        var id = GetXmlNodeValueInt(myNodes,'id',i);
        
        if(id < tiles.length)
        {
            var id2 = GetXmlNodeValueInt(tiles,'id',id);
            if(id == id2)
            {
                var rot = GetXmlNodeValueInt(tiles,'rotation',id);
                var picIndex = GetXmlNodeValueInt(tiles,'picture_index',id);
                var flipv = parseBool(GetXmlNodeValue(tiles,'flip_vertical',id));
                var fliph = parseBool(GetXmlNodeValue(tiles,'flip_horizontal',id));
                if(picIndex < this.Images.length)
                {
                    var line = Math.floor( i / this.countH);
                    var col = i % this.countH;
                    var pt = new Point(col*this.TileSize.width,line*this.TileSize.height);
                    var tile = new Tile(id,rot,fliph,flipv,picIndex,line,col,pt.x,pt.y,this.context);
                    tile.originRot.x = this.TileSize.width/2;
                    tile.originRot.y = this.TileSize.height /2;
                    this.Tiles.push(tile);
                }
                else
                {
                    alert('une tile de la map pointe sur une image inexistante');
                }
            }
            else 
            {
                alert('Erreur, il y a un probleme avec les id dans ' + MAP_CONST.DATA);
            }
        }
    }
    this.context.clearRect(0, 0, this.ViewSize.width, this.ViewSize.height);   
    this.state = MAP_STATE.LOADING;
}
Map.prototype.ImageLoaded = function()
{
    this.ImagesLoadedCount++;
}
Map.prototype.PostLoading = function()
{
    for(var i = 0 ; i < this.Tiles.length; i++)
    {
        var index = this.Tiles[i].picIndex;
        this.Tiles[i].SetImageLoaded(this.Images[index]);
    }
    this.state = MAP_STATE.LOADED;
}
Map.prototype.OnUpdate = function()
{
    Sprite.prototype.OnUpdate.call(this);
    switch(this.state.value)
    {
        case MAP_STATE.INIT.value:
            break;
        case MAP_STATE.LOADING.value:
            if(this.ImagesLoadedCount >= this.Images.length)
            {
                this.PostLoading();
            }
            break;
        case MAP_STATE.LOADED.value:
            break;
    }
}
Map.prototype.OnDraw = function()
{
     switch(this.state.value)
    {
        case MAP_STATE.INIT.value:
            break;
        case MAP_STATE.LOADING.value:
            break;
        case MAP_STATE.LOADED.value:
            this.TilingMap();
            break;
    }
    mlFillText(this.context,this.state.name, 500, 10);    
 
    Sprite.prototype.OnDraw.call(this);
}
Map.prototype.TilingMap = function()
{
    for(var i = 0; i < this.Tiles.length; i++)
    {
        this.Tiles[i].DrawBegin();
        this.Tiles[i].OnDraw();
        this.Tiles[i].DrawEnd();
    }
    
//    this.state = MAP_STATE.READY;
}
Map.prototype.UpdateCharacterPosition = function(pos)
{
    var midx = this.ViewSize.width / 2;
    if(pos.x > midx && pos.x < (this.MapSize.width - midx))
    {
        //this.CameraPosition.x = pos.x - midx;
        MapOffset.x = pos.x - midx;

    }
}
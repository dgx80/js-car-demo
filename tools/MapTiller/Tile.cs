using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace MapTiller
{

    public class Tile : Image
    {
        public Tile(string path, int nId)
        : base(path, nId)
        {
        }
        public Tile Clone()
        {
            Tile t = new Tile(FILE_INFO.FullName,ID);
            return t;
        }
    }
}

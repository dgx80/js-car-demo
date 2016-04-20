using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml;

namespace MapTiller
{
    public class Level
    {
        private List<Tile> m_Tiles = new List<Tile>();
        private FileInfo m_oPath = null;
        private ImageData m_imageData = null;

        public Level(string sPath, ImageData imageData)
        {
            m_oPath = new FileInfo(sPath);
            m_imageData = imageData;
        }
        public FileInfo FILE_INFO
        {
            get
            {
                return m_oPath;
            }
        }
        public void Load()
        {
            StreamReader sr = new StreamReader(m_oPath.FullName);
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(sr.ReadToEnd());
            XmlNodeList nodesCars = xml.SelectNodes("level/cars/car");

            foreach(XmlNode n in nodesCars)
            {

            }
            //XmlNodeList nl = xml.SelectNodes("level/map/tile");

        }
    }
}

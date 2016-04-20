using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace MapTiller
{
    public class ImageData
    {
        private List<Tile> m_Tiles = new List<Tile>();
        private string m_sDirectory = "";
        private int m_nWidth = 64;
        private int m_nHeight = 64;
        
        private List<Cars> m_Cars = new List<Cars>();

        public ImageData()
        {

        }
        public void Load(string path)
        { 
            FileInfo inf = new FileInfo(path);
            m_sDirectory = inf.Directory.FullName;
            string sMapPath = inf.Directory.FullName + Definitions.PATH.MAP;
            string sCarsPath = inf.Directory.FullName + Definitions.PATH.CARS;

            if (inf.Directory.Exists)
            {
                if (!Directory.Exists(sMapPath))
                {
                    Directory.CreateDirectory(sMapPath);
                }
                if (!Directory.Exists(sCarsPath))
                {
                    Directory.CreateDirectory(sCarsPath);
                }

                //Tiles
                string[] lst = Directory.GetFiles(sMapPath);
                m_Tiles.Clear();
                int n = 0;
                foreach (string s in lst)
                {
                    FileInfo inf2 = new FileInfo(s);

                    if (inf2.Extension == ".png" || inf2.Extension == ".PNG")
                    {
                        m_Tiles.Add(new Tile(s, n++));
                    }
                }

                //Cars 
                //lire le car_data.xml
                lst = Directory.GetDirectories(sCarsPath);
                m_Cars.Clear();
                n = 0;
                foreach (string s in lst)
                {
                    foreach(string sFile in Directory.GetFiles(s))
                    {
                        FileInfo inf2 = new FileInfo(sFile);
                        string sCarName = inf2.Name;
                        int nIndex = sCarName.IndexOf("frame",0);

                        if(nIndex != -1)
                        {
                            if (inf2.Extension == ".png" || inf2.Extension == ".PNG")
                            {
                                m_Cars.Add(new Cars(sFile, n++));
                            }
                        }
                    }
                }
            }
        }

        #region PROPERTIES

        public List<Tile> TILES
        {
            get
            {
                return m_Tiles;
            }
        }
        public int TILE_WIDTH
        {
            get
            {
                return m_nWidth;
            }
        }

        public int TILE_HEIGHT
        {
            get
            {
                return m_nHeight;
            }
        }
        #endregion
        public void SaveXml()
        {
            StreamWriter sw = new StreamWriter(m_sDirectory + Definitions.PATH.MAP + Definitions.FILE.MAP_DATA);
            
            sw.WriteLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            sw.WriteLine("<!--");
            sw.WriteLine("To change this template, choose Tools | Templates");
            sw.WriteLine("and open the template in the editor.");
            sw.WriteLine("-->");


            sw.WriteLine("<tiles>");

            sw.WriteLine("<settings>");
            sw.WriteLine("<width>64</width>");
            sw.WriteLine("<height>64</height>");
            sw.WriteLine("</settings>");

            foreach(Tile t in m_Tiles)
            {
                sw.WriteLine("<picture>");
                
                sw.WriteLine("<filename>" + t.FILE_INFO.Name + "</filename>");

                sw.WriteLine("</picture>");
            }
            int nPicture = 0;
            int n = 0;
            foreach(Tile t in m_Tiles)
            {
                for(int i = 0; i< 4;i++)
                {
                    int nDeg = 0;
                    bool bFlipH = false;
                    bool bFlipV = false;

                    switch(i)
                    {
                        case 1:
                            bFlipV = true;
                            break;
                        case 2:
                            nDeg = 90;
                            break;
                        case 3:
                            bFlipH = true;
                            nDeg = 90;
                            break;
                    }

                    sw.WriteLine("<tile>");
                    sw.WriteLine("<id>" + n.ToString() + "</id>");
                    sw.WriteLine("<rotation>" + nDeg.ToString() + "</rotation>");
                    sw.WriteLine("<picture_index>" + nPicture.ToString() + "</picture_index>");
                    sw.WriteLine("<flip_vertical>" + bFlipV.ToString().ToLower() + "</flip_vertical>");
                    sw.WriteLine("<flip_horizontal>" + bFlipH.ToString().ToLower() + "</flip_horizontal>");
                    sw.WriteLine("</tile>");
                    n++;
                }
                
                nPicture++;
            }

            sw.WriteLine("</tiles>");
            sw.Close();
        }
    }
}

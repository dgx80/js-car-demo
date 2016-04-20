using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml.Serialization;

namespace MapTiller
{
    public class Project
    {
        private string m_sLevelPath = "";
        private string m_sFullFilename;
        private List<Level> m_Levels = new List<Level>();
        private ImageData m_ImageData = new ImageData();

        public Project()
        {
        }
        public Project Clone()
        {
            Project obj = new Project();
            obj.SetPATH(m_sFullFilename);
            return obj;
        }
        public string GetPATH()
        {
            return m_sFullFilename;
        }
        public void SetPATH(string path)
        {
            m_sFullFilename = path;
        }
        public Project Load(string path)
        {
            m_sFullFilename = path + "\\" + Definitions.FILE.PROJECT;
            Project obj = this.Clone();
            if (File.Exists(m_sFullFilename))
            {
                XmlSerializer xs = new XmlSerializer(typeof(Project));
                using (StreamReader fr = new StreamReader(m_sFullFilename))
                {
                    obj = xs.Deserialize(fr) as Project;
                }
            }
            obj.SetPATH(m_sFullFilename);
            obj.LoadImageData();
            obj.LoadLevel();
            return obj;
        }
        public void LoadImageData()
        {
            m_ImageData.Load(m_sFullFilename);
        }
        public void LoadLevel()
        {
            if (Directory.Exists(LEVEL_PATH))
            {
                string[] lst = Directory.GetFiles(LEVEL_PATH);
                m_Levels.Clear();
                foreach (string s in lst)
                {
                    FileInfo inf = new FileInfo(s);
                    if (inf.Extension == ".xml")
                    {
                        m_Levels.Add(new Level(s, m_ImageData));
                    }
                }
            }
        }
        public void Save()
        {
            XmlSerializer xs = new XmlSerializer(typeof(Project));
            if (m_sFullFilename != null)
            {
                FileInfo inf = new FileInfo(m_sFullFilename);
                if (Directory.Exists(inf.Directory.ToString()))
                {
                    using (StreamWriter fw = new StreamWriter(m_sFullFilename))
                    {
                        xs.Serialize(fw, this);
                    }
                }
            }
        }
        public void SaveImageData()
        {
            m_ImageData.SaveXml();
        }
        public string LEVEL_PATH
        {
            get
            {
                return m_sLevelPath;
            }
            set
            {
                m_sLevelPath = value;
            }
        }



        public List<Tile> getTILES()
        {
            return m_ImageData.TILES;
        }
        public List<Level> getLEVELS()
        {
            return m_Levels;
        }
    }
}

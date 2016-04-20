using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace MapTiller
{
    public class Image
    {
        private System.Drawing.Image m_image = null;
        private FileInfo m_oPath = null;
        private int m_nId = 0;

        public Image(string path, int nId)
        {
            m_oPath = new FileInfo(path);
            m_nId = nId;
            if (File.Exists(m_oPath.FullName))
            {
                m_image = System.Drawing.Image.FromFile(m_oPath.FullName, true);
            }
        }

        #region PROPERTIES

        public System.Drawing.Image IMAGE
        {
            get
            {
                return m_image;
            }
        }
        public FileInfo FILE_INFO
        {
            get
            {
                return m_oPath;
            }
        }

        public int ID
        {
            get
            {
                return m_nId;
            }
        }
        #endregion
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace MapTiller
{
    public class Cars : Image
    {
        string m_sName = "";

        public Cars(string path, int nId)
        : base(path, nId)
        {
            FileInfo inf = new FileInfo(path);
            m_sName = inf.Name;
            m_sName = m_sName.Substring(0, m_sName.IndexOf("frame") - 1);
        }

    }
}

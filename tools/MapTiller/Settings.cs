using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml.Serialization;

namespace MapTiller
{
    public class Settings
    {
        private string m_sCurrentProjectPath = "";

        public string CURRENT_PROJECT_PATH
        {
            get
            {
                return m_sCurrentProjectPath;
            }
            set
            {
                m_sCurrentProjectPath = value;
            }
        }

    }
}

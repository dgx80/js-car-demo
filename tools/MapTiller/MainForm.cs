using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Xml.Serialization;

namespace MapTiller
{
    
    public partial class MainForm : Form
    {
        private Settings m_setting = new Settings();
        private Project m_project = new Project();

        public MainForm()
        {
            InitializeComponent();

            XmlSerializer xs = new XmlSerializer(   typeof(Settings));

            if(File.Exists(Definitions.FILE.SETTINGS))
            {
                using (StreamReader fr = new StreamReader(Definitions.FILE.SETTINGS))
                {
                    m_setting = xs.Deserialize(fr) as Settings;
                }
            }
            LoadProject();
        }

        private void button_load_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog f = new FolderBrowserDialog();

            if (f.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                listBox_tiles.Items.Clear();
         
                m_setting.CURRENT_PROJECT_PATH = f.SelectedPath;
                LoadProject();
            }
        }
        private void LoadProject()
        {
            if (File.Exists(Definitions.FILE.SETTINGS))
            {
                m_project = m_project.Load(m_setting.CURRENT_PROJECT_PATH);
            }
            label_pathroot.Text = "Path: " + m_setting.CURRENT_PROJECT_PATH;
            label_level_path.Text = "Path: " + m_project.LEVEL_PATH;

            foreach (Tile t in m_project.getTILES())
            {
                listBox_tiles.Items.Add(t.FILE_INFO.Name);
            }
            LoadLevel();
        }

        private void listBox_tiles_SelectedValueChanged(object sender, EventArgs e)
        {
            System.Drawing.Image img = m_project.getTILES()[listBox_tiles.SelectedIndex].IMAGE;
            pictureBox_tile.Image = img;
            pictureBox_tile.Width = img.Width;
            pictureBox_tile.Height = img.Height;
            propertyGrid1.SelectedObject = pictureBox_tile;
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            XmlSerializer xs = new XmlSerializer(typeof(Settings));

            using (StreamWriter fw = new StreamWriter(Definitions.FILE.SETTINGS))
            {
                xs.Serialize(fw, m_setting);
            }
            m_project.Save();
        }

        private void button_level_load_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog f = new FolderBrowserDialog();
            f.SelectedPath = m_setting.CURRENT_PROJECT_PATH;
            if (f.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                m_project.LEVEL_PATH = f.SelectedPath;
                LoadLevel(true);
            }
        }
        private void LoadLevel(bool bReloadXml = false)
        {
            listBox_level.Items.Clear();
            label_level_path.Text = "Path: " + m_project.LEVEL_PATH;
            if (bReloadXml)
            {
                m_project.LoadLevel();
            }
            foreach (Level l in m_project.getLEVELS())
            {
                listBox_level.Items.Add(l.FILE_INFO.Name);
            }

        }

        private void button_tiles_save_Click(object sender, EventArgs e)
        {
            m_project.SaveImageData();
        }
    }
}

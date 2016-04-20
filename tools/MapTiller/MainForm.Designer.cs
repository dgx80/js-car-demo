namespace MapTiller
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label_pathroot = new System.Windows.Forms.Label();
            this.groupBox_tiles_properties = new System.Windows.Forms.GroupBox();
            this.propertyGrid1 = new System.Windows.Forms.PropertyGrid();
            this.pictureBox_tile = new System.Windows.Forms.PictureBox();
            this.button_load = new System.Windows.Forms.Button();
            this.listBox_tiles = new System.Windows.Forms.ListBox();
            this.tabControl_1 = new System.Windows.Forms.TabControl();
            this.tabPage_main = new System.Windows.Forms.TabPage();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.listBox_level = new System.Windows.Forms.ListBox();
            this.label_level_path = new System.Windows.Forms.Label();
            this.button_level_load = new System.Windows.Forms.Button();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.button_tiles_save = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.groupBox_tiles_properties.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_tile)).BeginInit();
            this.tabControl_1.SuspendLayout();
            this.tabPage_main.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.button_tiles_save);
            this.groupBox1.Controls.Add(this.label_pathroot);
            this.groupBox1.Controls.Add(this.groupBox_tiles_properties);
            this.groupBox1.Controls.Add(this.button_load);
            this.groupBox1.Controls.Add(this.listBox_tiles);
            this.groupBox1.Location = new System.Drawing.Point(6, 6);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(820, 499);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Tiles";
            // 
            // label_pathroot
            // 
            this.label_pathroot.AutoSize = true;
            this.label_pathroot.Location = new System.Drawing.Point(56, 22);
            this.label_pathroot.Name = "label_pathroot";
            this.label_pathroot.Size = new System.Drawing.Size(13, 13);
            this.label_pathroot.TabIndex = 3;
            this.label_pathroot.Text = "--";
            // 
            // groupBox_tiles_properties
            // 
            this.groupBox_tiles_properties.Controls.Add(this.propertyGrid1);
            this.groupBox_tiles_properties.Controls.Add(this.pictureBox_tile);
            this.groupBox_tiles_properties.Location = new System.Drawing.Point(209, 41);
            this.groupBox_tiles_properties.Name = "groupBox_tiles_properties";
            this.groupBox_tiles_properties.Size = new System.Drawing.Size(593, 355);
            this.groupBox_tiles_properties.TabIndex = 2;
            this.groupBox_tiles_properties.TabStop = false;
            this.groupBox_tiles_properties.Text = "Properties";
            // 
            // propertyGrid1
            // 
            this.propertyGrid1.Location = new System.Drawing.Point(250, 9);
            this.propertyGrid1.Name = "propertyGrid1";
            this.propertyGrid1.Size = new System.Drawing.Size(330, 340);
            this.propertyGrid1.TabIndex = 0;
            // 
            // pictureBox_tile
            // 
            this.pictureBox_tile.BackColor = System.Drawing.Color.Transparent;
            this.pictureBox_tile.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox_tile.Location = new System.Drawing.Point(7, 20);
            this.pictureBox_tile.Name = "pictureBox_tile";
            this.pictureBox_tile.Size = new System.Drawing.Size(64, 64);
            this.pictureBox_tile.TabIndex = 0;
            this.pictureBox_tile.TabStop = false;
            // 
            // button_load
            // 
            this.button_load.Location = new System.Drawing.Point(6, 17);
            this.button_load.Name = "button_load";
            this.button_load.Size = new System.Drawing.Size(44, 23);
            this.button_load.TabIndex = 1;
            this.button_load.Text = "Load";
            this.button_load.UseVisualStyleBackColor = true;
            this.button_load.Click += new System.EventHandler(this.button_load_Click);
            // 
            // listBox_tiles
            // 
            this.listBox_tiles.FormattingEnabled = true;
            this.listBox_tiles.Location = new System.Drawing.Point(6, 41);
            this.listBox_tiles.Name = "listBox_tiles";
            this.listBox_tiles.Size = new System.Drawing.Size(197, 355);
            this.listBox_tiles.TabIndex = 1;
            this.listBox_tiles.SelectedValueChanged += new System.EventHandler(this.listBox_tiles_SelectedValueChanged);
            // 
            // tabControl_1
            // 
            this.tabControl_1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
                        | System.Windows.Forms.AnchorStyles.Left)
                        | System.Windows.Forms.AnchorStyles.Right)));
            this.tabControl_1.Controls.Add(this.tabPage_main);
            this.tabControl_1.Controls.Add(this.tabPage2);
            this.tabControl_1.Location = new System.Drawing.Point(12, 12);
            this.tabControl_1.Name = "tabControl_1";
            this.tabControl_1.SelectedIndex = 0;
            this.tabControl_1.Size = new System.Drawing.Size(1467, 680);
            this.tabControl_1.TabIndex = 2;
            // 
            // tabPage_main
            // 
            this.tabPage_main.Controls.Add(this.groupBox2);
            this.tabPage_main.Controls.Add(this.groupBox1);
            this.tabPage_main.Location = new System.Drawing.Point(4, 22);
            this.tabPage_main.Name = "tabPage_main";
            this.tabPage_main.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage_main.Size = new System.Drawing.Size(1459, 654);
            this.tabPage_main.TabIndex = 0;
            this.tabPage_main.Text = "Main";
            this.tabPage_main.UseVisualStyleBackColor = true;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.listBox_level);
            this.groupBox2.Controls.Add(this.label_level_path);
            this.groupBox2.Controls.Add(this.button_level_load);
            this.groupBox2.Location = new System.Drawing.Point(832, 7);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(497, 498);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Level";
            // 
            // listBox_level
            // 
            this.listBox_level.FormattingEnabled = true;
            this.listBox_level.Location = new System.Drawing.Point(7, 51);
            this.listBox_level.Name = "listBox_level";
            this.listBox_level.Size = new System.Drawing.Size(182, 407);
            this.listBox_level.TabIndex = 2;
            // 
            // label_level_path
            // 
            this.label_level_path.AutoSize = true;
            this.label_level_path.Location = new System.Drawing.Point(82, 30);
            this.label_level_path.Name = "label_level_path";
            this.label_level_path.Size = new System.Drawing.Size(16, 13);
            this.label_level_path.TabIndex = 1;
            this.label_level_path.Text = "---";
            // 
            // button_level_load
            // 
            this.button_level_load.Location = new System.Drawing.Point(0, 21);
            this.button_level_load.Name = "button_level_load";
            this.button_level_load.Size = new System.Drawing.Size(75, 23);
            this.button_level_load.TabIndex = 0;
            this.button_level_load.Text = "load";
            this.button_level_load.UseVisualStyleBackColor = true;
            this.button_level_load.Click += new System.EventHandler(this.button_level_load_Click);
            // 
            // tabPage2
            // 
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(1459, 654);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Level";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // button_tiles_save
            // 
            this.button_tiles_save.Location = new System.Drawing.Point(714, 12);
            this.button_tiles_save.Name = "button_tiles_save";
            this.button_tiles_save.Size = new System.Drawing.Size(75, 23);
            this.button_tiles_save.TabIndex = 4;
            this.button_tiles_save.Text = "Save";
            this.button_tiles_save.UseVisualStyleBackColor = true;
            this.button_tiles_save.Click += new System.EventHandler(this.button_tiles_save_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1483, 704);
            this.Controls.Add(this.tabControl_1);
            this.Name = "MainForm";
            this.Text = "Map Tiller";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox_tiles_properties.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_tile)).EndInit();
            this.tabControl_1.ResumeLayout(false);
            this.tabPage_main.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button button_load;
        private System.Windows.Forms.ListBox listBox_tiles;
        private System.Windows.Forms.GroupBox groupBox_tiles_properties;
        private System.Windows.Forms.PictureBox pictureBox_tile;
        private System.Windows.Forms.PropertyGrid propertyGrid1;
        private System.Windows.Forms.TabControl tabControl_1;
        private System.Windows.Forms.TabPage tabPage_main;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.Label label_pathroot;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label_level_path;
        private System.Windows.Forms.Button button_level_load;
        private System.Windows.Forms.ListBox listBox_level;
        private System.Windows.Forms.Button button_tiles_save;
    }
}


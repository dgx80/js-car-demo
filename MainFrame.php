<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MainFrame
 *
 * @author razan 
 */
class MainFrame 
{
    public function OutputHtml()
    {
        $w = '1024';
        $h = '768';
        $title = 'Demo de jeu html5';
        $errmsg = 'IE Sucks! <br /><a href="http://www.getfirefox.net/">Télécharge Firefox !!</a>';
        
        $tx = '
<html>
<head>
    <title>'.$title.'</title>
    
    <link rel="stylesheet" type="text/css" href="style.css">
    
    <SCRIPT LANGUAGE="JavaScript" SRC="definitions.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="tools.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Point.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Dimension.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="StepTrigger.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Sprite.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Wheel.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Driving.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Car.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="PoliceCar.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Tile.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Map.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="engine.js"></SCRIPT>
   
    <script type="text/javascript">
    var eng = null;
    eng = new Engine('.$w.','.$h.');
    </script>
    </head>
<body>
	<h1>'.$title.'</h1>
	<div id="conteneur">
	<canvas id="canvasElem">
		'.$errmsg.'
	</canvas>	
	</div>
</body>
</html>
            ';
    echo $tx;
    }


    //put your code here
}

?>

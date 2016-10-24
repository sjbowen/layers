<!DOCTYPE html>
<html>
<head>
<title>Layers: Old Dock</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
  <style> @-ms-viewport { width: device-width; } </style>
  <link rel="stylesheet" href="vendor/reset.min.css">
  <link rel="stylesheet" href="style.css">

<!-- scripts for webpd -->
	<script src="js/jquery-2.1.0.min.js"></script>
    <script src="js/webpd-latest.js"></script>
 
</head>
<?php
		$file = 'logs/olddocklog.json';
		//get the contents of the file as json
		$data = json_decode(file_get_contents($file),true);
		
		///get the number of hits from the relevant field
		$number_of_hits = $data['number_of_hits'];

		//increment it
		$number_of_hits++;

		//replace the old number of hits with the new one
		$data['number_of_hits'] = $number_of_hits;
		//add a new browser to the array of browsers
		array_push($data['browsers'], $_SERVER['HTTP_USER_AGENT']);
		//add a new timestamp to the array of timestamps
		array_push($data['timestamps'], time());
		//write it back to the file as json overwriting the previous
		file_put_contents($file, json_encode($data),  LOCK_EX);
?>
<body class="multiple-scenes ">

<div href="#" id="readyContainer" style="z-index:10;">

	<p style="position:relative; width: 300px; height 200px; color:black; background-color: #eee; font-size:1.5em;padding: 10px; margin:10px auto; z-index:10;">Layers: Old Dock<br /><br />
Stand at the crossroads near the signpost, and face towards the steps. Turn your phone's volume up, hold it in front of you, and tap 'begin' when you are ready.</br></br>
	<button type="button" class="button" id="ready">Begin</button>
</div>

<div id="pano"></div>

<a href="#" id="deviceOrientationToggle">
  <img class="icon off" src="img/gyro.png">
  <img class="icon on" src="img/gyro_disable.png">
</a>

<a href="#" id="fullscreenToggle">
  <img class="icon off" src="img/fullscreen.png">
  <img class="icon on" src="img/windowed.png">
</a>

<a href="index.php" id="back">
  <img alt="back" class="icon on" src="img/back.png" />
</a>

<!-- Hack to make buttons invisible but functional is to append _invis.png to filename, e.g. gyro_invis.png -->

<div id="debug" style="position:absolute;bottom:20px;left:0px;">
&nbsp;
</div>

<div id="debug2" style="position:absolute;bottom:50px;right:50px;">
&nbsp;
</div>

<script src="vendor/es5-shim.js"></script>
<script src="vendor/eventShim.js"></script>
<script src="vendor/classList.js"></script>
<script src="vendor/requestAnimationFrame.js" ></script>
<script src="vendor/screenfull.min.js" ></script>
<script src="vendor/bowser.min.js"></script>
<script src="vendor/howler.core.min.js"></script>
<script src="vendor/marzipano0.3.0.js" ></script>

<script src="data_olddock.js"></script>
<script src="vendor/DeviceOrientationControlMethod.js"></script>
<script src="index.js"></script>

</body>
</html>

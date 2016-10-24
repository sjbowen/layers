<!DOCTYPE html>
<html>
<head>
<title>Layers: Old Dock</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
  <style> @-ms-viewport { width: device-width; } </style>
  <link rel="stylesheet" href="layersstyle.css">

</head>
<body>
<?php
		$file = 'logs/indexlog.json';
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

<div id="about">
	<h1>Layers: Old Dock</h1>
	<p>Hidden beneath Liverpool ONE is the Old Dock, the first commercial wet dock in the World. From this place, Liverpool as an international port and multicultural city sprang. Explore the many layers of the Old Dock with your phone or tablet.</p>
	<button type="button" class="button" onclick="parent.location='olddock.html'">Continue</button>
<!-- 
	<h2>What is this?</h2>
	<p>Layers: Old Dock is a digital artwork created by Simon Bowen and Tim Shaw as part of a collaboration between Newcastle University and the Foundation for Art and Creative Technology (FACT). This artwork was sponsored by Liverpool ONE.</p>
	<img src="img/ncllogo.jpg" />
	<img src="img/FACTlogo.jpg" />
	<img src="img/liverpoolONElogo.png" />

	<h2>Credits</h2>
 -->
</body>
</html>

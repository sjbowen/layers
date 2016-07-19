'use strict';
var debugMode = window.APP_DATA.settings.debugMode; 
var webPdUsed = window.APP_DATA.settings.webPdUsed;  // is web pd being used

var readyContainer = document.querySelector('#readyContainer');
var readyElement = document.querySelector('#ready');

if (webPdUsed && readyContainer!=null) {
	readyElement.addEventListener('click', function () {
		console.log('click');
		readyContainer.innerHTML = ''; // hide the ready link
		var patch
			$.get(window.APP_DATA.settings.webPdPatch, function(patchStr) {
			  patch = Pd.loadPatch(patchStr)
			});
		Pd.start();
		go();
		});
	
	readyElement.addEventListener('touchend', function () {
		console.log('touch');
		readyContainer.innerHTML = ''; // hide the ready link
		var patch
			$.get(window.APP_DATA.settings.webPdPatch, function(patchStr) {
			  patch = Pd.loadPatch(patchStr)
			});
		Pd.start();
		go();
		});
} else {
	if (readyContainer!=null) {readyContainer.innerHTML = ''}; // hide the ready link
	go();
}

function go() { // rather than as a self-invoking anonymous function, call this function when readyElement has been clicked or tapped

	var Marzipano = window.Marzipano;
	var bowser = window.bowser;
	var screenfull = window.screenfull;
	var APP_DATA = window.APP_DATA;
	var lastscene; //set up a variable for the lastscene

	// Grab elements from DOM.
	var panoElement = document.querySelector('#pano');
	var sceneNameElement = document.querySelector('#titleBar .sceneName');
	var sceneListElement = document.querySelector('#sceneList');
	var sceneElements = document.querySelectorAll('#sceneList .scene');
	var sceneListToggleElement = document.querySelector('#sceneListToggle');
	var autorotateToggleElement = document.querySelector('#autorotateToggle');
	var fullscreenToggleElement = document.querySelector('#fullscreenToggle');
	var toggleDeviceOrientationElement = document.getElementById('deviceOrientationToggle'); // for GYRO on/off
	var debugElement = document.getElementById('debug'); // container for live location data
	var debugElement2 = document.getElementById('debug2'); // container for scene info

	// variables for gazeSpots and performance mode
	var switchTimer = null; // empty variable for timer
	var revealTimer = null; // empty variable for timer
	var lastSpot = null; // empty variable for reveal gaze spot timer
	var performTimers = []; // empty array for performance timers
	var performYawSpeed = 0; // yaw spin speed
	var performPitchSpeed = 0; // pitch speed
	var sceneIndex = 0; // index for scene number
	
	  // Detect desktop or mobile mode. Force mobile mode here?
	  if (window.matchMedia) {
		var setMode = function() {
		  if (mql.matches) {
			document.body.classList.remove('desktop');
			document.body.classList.add('mobile');
		  } else {
			document.body.classList.remove('mobile');
			document.body.classList.add('desktop');
		  }
		};
		var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
		setMode();
		mql.addListener(setMode);
	  } else {
		document.body.classList.add('desktop');
	  }

	  // Detect whether we are on a touch device.
	  document.body.classList.add('no-touch');
	  window.addEventListener('touchstart', function() {
		document.body.classList.remove('no-touch');
		document.body.classList.add('touch');
	  });

	  // Use tooltip fallback mode on IE < 11.
	  if (bowser.msie && parseFloat(bowser.version) < 11) {
		document.body.classList.add('tooltip-fallback');
	  }

	  // Viewer options.
	  var viewerOpts = {
		controls: {
		  mouseViewMode: APP_DATA.settings.mouseViewMode
		},
		swfPath: 'vendor/marzipano.swf'
	  };
	  
      var viewer = new Marzipano.Viewer(panoElement, viewerOpts)
	  
	  //  GYRO: Register GYRO control method
	  var deviceOrientationEnabled = false;
	  var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
	  var controls = viewer.controls();
	  controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);

	  // Setup autorotate
	  var autorotate = Marzipano.autorotate({ yawSpeed: 0, pitchSpeed: 0, targetPitch: null });
	  if (APP_DATA.settings.autorotateEnabled) {
		autorotateToggleElement.classList.add('enabled');
	  }

	  // Create scenes.
	  var scenes = APP_DATA.scenes.map(function(sceneData) {
		var source = Marzipano.ImageUrlSource.fromString(
		  "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
		  { cubeMapPreviewUrl: "tiles/" + sceneData.id + "/preview.jpg" });
		var geometry = new Marzipano.CubeGeometry(sceneData.levels);

		var limiter = Marzipano.RectilinearView.limit.maxResolutionAndMaxFov(sceneData.faceSize, 100*Math.PI/180, 120*Math.PI/180);
		var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

		var marzipanoScene = viewer.createScene({
		  source: source,
		  geometry: geometry,
		  view: view, 
		  pinFirstLevel: true
		});

		// Create link hotspots.
		sceneData.linkHotspots.forEach(function(hotspot) {
		  var element = createLinkHotspotElement(hotspot);
		  marzipanoScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
		});

		// Create info hotspots.
		sceneData.infoHotspots.forEach(function(hotspot) {
		  var element = createInfoHotspotElement(hotspot);
		  marzipanoScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
		});
	
		// Simon's code to create embedded content hotspots.
		sceneData.embedHotspots.forEach(function(hotspot) {
			var element = createEmbedHotspotElement(hotspot);
			marzipanoScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch }, { perspective: { radius: hotspot.radius, extraRotations: hotspot.extraRotations }});
		});		
		
		// Add Gaze Spots by adding event listener for viewChange on the whole scene
		marzipanoScene.addEventListener('viewChange', function() {
			var yaw = viewer.view().yaw();
			var pitch = viewer.view().pitch();
			var gazing = false;
			sceneData.gazeSpots.forEach(function (gazeSpot) {		
			//for each gazespot, check if view closely matches, set gazing to true if so
				if (onSpot(gazeSpot, pitch, yaw)) {
				if ((switchTimer == null) && (revealTimer == null)) { // if timers havn't already been started, start them
					if (gazeSpot.selector) { // if this is an embedded content reveal type gazespot
						console.log($(gazeSpot.selector));
						lastSpot = gazeSpot; // store
						revealTimer = setTimeout(function () {
							document.getElementById(gazeSpot.selector).style.opacity = 1;
							document.getElementById(gazeSpot.selector).style.transition = "opacity " + gazeSpot.timeout + "ms ease-in-out"; }, 500);
						if (webPdUsed) {Pd.send('send9', [gazeSpot.selector])}; // tell webPd the HTML selector of the embedded content
					}
					if (gazeSpot.target) { // if this is a switch type gazeSpot
						console.log("Gaze spot that switches to scene " + gazeSpot.target + " found at yaw: " + gazeSpot.yaw + ' pitch: ' + gazeSpot.pitch + " timer started"); 
						switchTimer = setTimeout(function () {
							console.log("timer elapsed");
							if (gazeSpot.target) {switchScene(findSceneById(gazeSpot.target))}; // if gazeSpot has a target, set up a scene switch
							gazing = false;
						}, gazeSpot.timeout); 
						if (webPdUsed) {Pd.send('send5', [1])}; // tell webPd we've found a gaze spot
// 						if (webPdUsed && gazeSpot.target) {Pd.send('send6', [parseFloat(gazeSpot.target.charAt(0))])}; // tell webPd the scene to be switched to
// 						if (webPdUsed) {Pd.send('send7', [gazeSpot.timeout])}; // tell webPd the timeout for this gaze spot
// 						if (webPdUsed) {Pd.send('send8', [gazeSpot.id])}; // tell webPd the id number of this gaze spot (where 0 = no id)
						}
					} 
				gazing = true;
				}
			});
 			if (!gazing) { // if not gazing 
 					if ((switchTimer != null) || (revealTimer != null)) { // and if the timers have not already been cleared
						clearTimeout(switchTimer);  // clear the timer
						clearTimeout(revealTimer);  // clear the timer
						switchTimer = null;
						revealTimer = null;
 						console.log("off gazespot, timers cleared"); 
 						if (webPdUsed) {Pd.send('send5', [0])};  // tell webPd we've moved off a gaze spot
						if (lastSpot) {
							document.getElementById(lastSpot.selector).style.opacity = lastSpot.baseOpacity;
							document.getElementById(lastSpot.selector).style.transition = "opacity " + lastSpot.timeout + "ms ease-in-out"; 						
							}
 					}
 				}
		}); 	
		return {
		  data: sceneData,
		  marzipanoObject: marzipanoScene
		};
	  });

	  // Display the initial scene.
	  switchScene(scenes[0]);
  
	  // GYRO: need to create 'view' variable for use by enable/disableGyro
	  var scene = viewer.scene(); // get the current scene
	  var view = scene.view();    // get the scene's view
  
	  // turn on GYRO navigation if on a mobile device
	  if (document.body.classList.contains('mobile')) {
		enableGyro();
	  }
	  
	  // Set handlers for autorotate and GYRO toggles.
// 	  autorotateToggleElement.addEventListener('click', toggleAutorotate);
	  toggleDeviceOrientationElement.addEventListener('click', toggleDeviceOrientation);

	  // Check if fullscreen is supported and enable it if so
	  // Note cannot automatically switch full screen mode on, prohibited, needs user input so replace icons with transparent GIFs instead
	  if (screenfull.enabled && APP_DATA.settings.fullscreenButton) { // screenfull.enabled is false on phones and tablets!! 
		document.body.classList.add('fullscreen-enabled');
		fullscreenToggleElement.addEventListener('click', toggleFullscreen);
	  } else {
		document.body.classList.add('fullscreen-disabled');
	  }

	  // Set handler for scene list toggle.
// 	  sceneListToggleElement.addEventListener('click', toggleSceneList);

	  // Start with the scene list open on desktop.
// 	  if (!document.body.classList.contains('mobile')) {
// 		showSceneList();
// 	  }
  
	  // Set handler for scene switch.
// 	  scenes.forEach(function(scene) {
// 		var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
// 		el.addEventListener('click', function() {  
// 		  switchScene(scene);
// 		  // On mobile, hide scene list after selecting a scene.
// 		  if (document.body.classList.contains('mobile')) {
// 			hideSceneList();
// 		  }
// 		});
// 	  });
  
	  // Simon's handler for view change, use to send GYRO position data to webPd 
// 	viewer.addEventListener('viewChange', function() {
// 		// get yaw, pitch, vertical fov from current view (in radians)
// 		var yaw = viewer.view().yaw();
// 		var pitch = viewer.view().pitch();
// 		var fov = viewer.view().fov();		
// 		if (webPdUsed) {
// 			// convert yaw, pitch to be in the range to -1 to +1
// 			var wpdYaw = yaw/Math.PI;
// 			var wpdPitch = -2*pitch/Math.PI; // invert pitch so that looking up is positive value
// 			var wpdfov = 2*fov/Math.PI;
// 			Pd.send('send1', [wpdYaw]);
// 			Pd.send('send2', [wpdPitch]);
// 			Pd.send('send3', [wpdfov]); 		
// 		}
// 	});	
		
		// Simon's handler for performance mode (auto and manual)
		window.addEventListener('keydown', function(event) {
			switch (event.keyCode) {
				case 80: // P key to start auto-performance mode 					
					// get the script events, set up Timeout functions for each
					var script = APP_DATA.script;
					script.forEach(function (script){
						switch (script.type) {
							case "scenechange":
								var performTimer = setTimeout (function () {switchScene(findSceneById(script.target)); startAutorotate();}, script.time);
								if (debugMode) {console.log("scenechange timer " + performTimer);};
								performTimers.push(performTimer); // add scene switch timer to the array
							break;
						
							case "rotate":
								var performTimer = setTimeout (function () {
									autorotate = Marzipano.autorotate({ yawSpeed: script.yawSpeed, pitchSpeed: script.pitchSpeed, fovSpeed: script.fovSpeed, yawAccel: script.yawAccel, pitchAccel: script.pitchAccel, fovAccell: script.fovAccel, targetPitch: script.targetPitch, targetFov: script.targetFov });
									startAutorotate();}, script.time);
								if (debugMode) {console.log("rotate event timer " + performTimer);};	
								performTimers.push(performTimer); // add rotation timer to the array
							break;
							
							case "repeat":
								//var performTimer = setTimeout (function () {doScript();}, script.time); // recurse function to repeat
								if (debugMode) {console.log("repeat timer");};
								//performTimers.push(performTimer); // add repeat timer to the array
							break;
						}
					});	
					if (debugMode) {console.log("play");};
				break;
				
				case 32: // SPACE to stop all timers and movement	
					if (debugMode) {console.log("stop");};
					// clear all the timers
					var i;
					for (i in performTimers) { // clear each performance timer
						clearTimeout(performTimers[i]);
						if (debugMode) {console.log ("cleared timer" + performTimers[i]);};
					}
					// stop rotation
					stopAutorotate();
					autorotate = Marzipano.autorotate({ yawSpeed: 0, pitchSpeed: 0, targetPitch: null }); // aslo need to set global variable so rotation does not continue in other scenes
					// reset yaw and pitch speeds
					performYawSpeed = 0;
					performPitchSpeed = 0;
				break;
				
				case 90: // Z to full speed rotate clockwise
					performYawSpeed = 5;
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: performPitchSpeed, yawAccel: Infinity, pitchAccel: Infinity});
					startAutorotate();
					if (debugMode) {console.log("full speed clockwise!");};					
				break;
			 				
				case 88: // X to speed up rotation at an increasing rate
					if (performYawSpeed <= 0.5) {performYawSpeed += 0.1}
					else if (performYawSpeed <= 1) {performYawSpeed += 0.25}
					else if (performYawSpeed > 1) {performYawSpeed = performYawSpeed * 2};
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: performPitchSpeed, yawAccel: Infinity, pitchAccel: Infinity});
					startAutorotate();
					if (debugMode) {console.log("increase yaw spin");};
				break;
				
				case 67: // C to slow down at a decreasing rate rotation
					if (performYawSpeed <= 0.5) {performYawSpeed -= 0.1}
					else if (performYawSpeed <= 1) {performYawSpeed -= 0.25}
					else if (performYawSpeed > 1) {performYawSpeed = performYawSpeed / 2};
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: performPitchSpeed, yawAccel: Infinity, pitchAccel: Infinity});
					startAutorotate();
					if (debugMode) {console.log("decrease yaw spin");};
				break;
				
				case 86: // V to full speed rotate anticlockwise
					performYawSpeed = -5;
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: performPitchSpeed, yawAccel: Infinity, pitchAccel: Infinity});
					startAutorotate();
					if (debugMode) {console.log("full speed anticlockwise!");};					
				break;
				
				case 66: // B to cut to looking up
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: 20, yawAccel: Infinity, pitchAccel: Infinity, targetPitch: -Math.PI/2});
					startAutorotate();
				break;

				case 78: // N to cut to looking ahead
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: 20, yawAccel: Infinity, pitchAccel: Infinity, targetPitch: 0});
					startAutorotate();
				break;
				
				case 77: // M to cut to looking down
					autorotate = Marzipano.autorotate({ yawSpeed: performYawSpeed, pitchSpeed: 20, yawAccel: Infinity, pitchAccel: Infinity, targetPitch: Math.PI/2});
					startAutorotate();				
				break;
				
				case 75: // K to move up one scene
					if (debugMode) {console.log("move up one scene");};					
					if (sceneIndex <= (scenes.length-2)) {sceneIndex +=1;} else {sceneIndex = 0;};
					switchScene(scenes[sceneIndex]);
					// call autorotate again to maintain movement				
				break;
				
				case 76: // L to move down one scene
					if (debugMode) {console.log("move down one scene");};					
					if (sceneIndex >= 1) {sceneIndex -=1;} else {sceneIndex = (scenes.length-1);};
					switchScene(scenes[sceneIndex]);
					// call autorotate again to maintain movement				
				break;
								
				case 48: // 0 to cut to scene 0
					switchScene(scenes[0]);
				break;
				
				case 49: // 1 to cut to scene 1
					if (scenes[1]) {switchScene(scenes[1]);};
				break;

				case 50: // 2 to cut to scene 2
					if (scenes[2]) {switchScene(scenes[2]);};
				break;

				case 51: // 3 to cut to scene 3
					if (scenes[3]) {switchScene(scenes[3]);};
				break;

				case 52: // 4 to cut to scene 4
					if (scenes[4]) {switchScene(scenes[4]);};
				break;

				case 53: // 5 to cut to scene 5
					if (scenes[5]) {switchScene(scenes[5]);};
				break;

				case 54: // 6 to cut to scene 6
					if (scenes[6]) {switchScene(scenes[6]);};
				break;

				case 55: // 7 to cut to scene 7
					if (scenes[7]) {switchScene(scenes[7]);};
				break;

				case 56: // 8 to cut to scene 8
					if (scenes[8]) {switchScene(scenes[8]);};
				break;

				case 57: // 9 to cut to scene 9
					if (scenes[9]) {switchScene(scenes[9]);};
				break;
		  }
		});
		

// function definitions
	  
	  function sanitize(s) {
		return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
	  }
  	
	  function switchScene(scene) {
		stopAutorotate();
		scene.marzipanoObject.switchTo(); // changes the scene
		if (webPdUsed) { // send new scene id to webPd
			var wpdScene = parseFloat(scene.data.id.charAt(0));
			Pd.send('send4', [wpdScene]);
		}
		if (debugMode) {debugElement2.innerHTML = scene.data.id.charAt(0); };
		if (lastscene!=null) // if you have already changed scene once already...
		{
			if (debugMode) {console.log("switching from:", lastscene.data.id, "to:", scene.data.id)};
			var view = lastscene.marzipanoObject.view(); // get the view values from the departure scene
			var departureViewParameters = {
				yaw: view.yaw(),
				pitch: view.pitch(),
				fov: view.fov()
			};
			var options = {
				transitionDuration: 0
			};
			scene.marzipanoObject.lookTo(departureViewParameters, options); // change direction viewed to match departure view
		}
		lastscene = scene; // update lastscene to be the current scene
		startAutorotate();
// 		updateSceneName(scene);
		updateSceneList(scene);
	  }

// 	  function updateSceneName(scene) {
// 		sceneNameElement.innerHTML = sanitize(scene.data.name);
// 	  }

	  function updateSceneList(scene) {
		for (var i = 0; i < sceneElements.length; i++) {
		  var el = sceneElements[i];
		  if (el.getAttribute('data-id') === scene.data.id) {
			el.classList.add('current');
		  } else {
			el.classList.remove('current');
		  }
		}
	  }

	  function showSceneList() {
		sceneListElement.classList.add('enabled');
		sceneListToggleElement.classList.add('enabled');
	  }

	  function hideSceneList() {
		sceneListElement.classList.remove('enabled');
		sceneListToggleElement.classList.remove('enabled');
	  }

	  function toggleSceneList() {
		sceneListElement.classList.toggle('enabled');
		sceneListToggleElement.classList.toggle('enabled');
	  }

	  function startAutorotate() {
// 		if (!autorotateToggleElement.classList.contains('enabled')) {
// 		  return;
// 		}
		viewer.startMovement(autorotate);
		viewer.setIdleMovement(Infinity);
	  }

	  function stopAutorotate() {
		viewer.stopMovement();
		viewer.setIdleMovement(Infinity);
	  }

	  function toggleAutorotate() {
		if (autorotateToggleElement.classList.contains('enabled')) {
		  autorotateToggleElement.classList.remove('enabled');
		  stopAutorotate();
		} else {
		  autorotateToggleElement.classList.add('enabled');
		  startAutorotate();
		}
	  }

	  function toggleFullscreen() {
		screenfull.toggle();
		if (screenfull.isFullscreen) {
		  fullscreenToggleElement.classList.add('enabled');
		} else {
		  fullscreenToggleElement.classList.remove('enabled');
		}
	  }

	  function createLinkHotspotElement(hotspot) {

		// Create wrapper element to hold icon and tooltip.
		var wrapper = document.createElement('div');
		wrapper.classList.add('hotspot');
		wrapper.classList.add('link-hotspot');

		// Create image element.
		var icon = document.createElement('img');
		icon.src = 'img/link.png';
		icon.classList.add('link-hotspot-icon');

		// Set rotation transform.
		var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
		for (var i = 0; i < transformProperties.length; i++) {
		  var property = transformProperties[i];
		  icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
		}

		// Add click event handler.
		wrapper.addEventListener('click', function() {
		  switchScene(findSceneById(hotspot.target));
		});

		// Create tooltip element.
		var tooltip = document.createElement('div');
		tooltip.classList.add('hotspot-tooltip');
		tooltip.classList.add('link-hotspot-tooltip');
		tooltip.innerHTML = findSceneDataById(hotspot.target).name;

		wrapper.appendChild(icon);
		wrapper.appendChild(tooltip);

		return wrapper;
	  }

	  function createInfoHotspotElement(hotspot) {

		// Create wrapper element to hold icon and tooltip.
		var wrapper = document.createElement('div');
		wrapper.classList.add('hotspot');
		wrapper.classList.add('info-hotspot');

		// Create hotspot/tooltip header.
		var header = document.createElement('div');
		header.classList.add('info-hotspot-header');

		// Create image element.
		var iconWrapper = document.createElement('div');
		iconWrapper.classList.add('info-hotspot-icon-wrapper');
		var icon = document.createElement('img');
		icon.src = 'img/info.png';
		icon.classList.add('info-hotspot-icon');
		iconWrapper.appendChild(icon);

		// Create title element.
		var titleWrapper = document.createElement('div');
		titleWrapper.classList.add('info-hotspot-title-wrapper');
		var title = document.createElement('div');
		title.classList.add('info-hotspot-title');
		title.innerHTML = hotspot.title;
		titleWrapper.appendChild(title);

		// Create close element.
		var closeWrapper = document.createElement('div');
		closeWrapper.classList.add('info-hotspot-close-wrapper');
		var closeIcon = document.createElement('img');
		closeIcon.src = 'img/close.png';
		closeIcon.classList.add('info-hotspot-close-icon');
		closeWrapper.appendChild(closeIcon);

		// Construct header element.
		header.appendChild(iconWrapper);
		header.appendChild(titleWrapper);
		header.appendChild(closeWrapper);

		// Create text element.
		var text = document.createElement('div');
		text.classList.add('info-hotspot-text');
		text.innerHTML = hotspot.text;

		// Place header and text into wrapper element.
		wrapper.appendChild(header);
		wrapper.appendChild(text);

		// Create a modal for the hotspot content to appear on mobile mode.
		var modal = document.createElement('div');
		modal.innerHTML = wrapper.innerHTML;
		modal.classList.add('info-hotspot-modal');
		document.body.appendChild(modal);

		var toggle = function() {
		  wrapper.classList.toggle('visible');
		  modal.classList.toggle('visible');
		};

		// Show content when hotspot is clicked.
		wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

		// Hide content when close icon is clicked.
		modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

		return wrapper;
	  }
  
	  // Simon's adapted code to create divs for embedded content
	  function createEmbedHotspotElement(hotspot) { 
  
		// Create wrapper element to embed html.
		var wrapper = document.createElement('div');
		wrapper.classList.add('hotspot');
		wrapper.classList.add('embed-hotspot');
		wrapper.innerHTML = hotspot.html; //add the html to the hotspot

		return wrapper;
	  }

	  function findSceneById(id) {
		for (var i = 0; i < scenes.length; i++) {
		  if (scenes[i].data.id === id) {
			return scenes[i];
		  }
		}
		return null;
	  }

	  function findSceneDataById(id) {
		for (var i = 0; i < APP_DATA.scenes.length; i++) {
		  if (APP_DATA.scenes[i].id === id) {
			return APP_DATA.scenes[i];
		  }
		}
		return null;
	  }

	  // GYRO: Gyro functions

	  function enableGyro() { 
		deviceOrientationControlMethod.getPitch(function(err, pitch) {
		  if(!err) {
			view.setPitch(pitch);
		  }
		});
		controls.enableMethod('deviceOrientation');
		deviceOrientationEnabled = true;
		toggleDeviceOrientationElement.className = 'enabled';
	  }

	  function disableGyro() {
		controls.disableMethod('deviceOrientation');
		deviceOrientationEnabled = false;
		toggleDeviceOrientationElement.className = '';
	  }

	  function toggleDeviceOrientation() {
		if(deviceOrientationEnabled) { disableGyro(); }
		else { enableGyro(); }
	  }
	   
	  function onSpot (gazeSpot, pitch, yaw) {
		if (debugMode) { debugElement.innerHTML = 'yaw' + yaw + '<br />pitch' + pitch };
	  	var yawFactor; 
	  	// check if pitch and gazeSpot.pitch in same hemisphere
	  	// if so, bias the contribution of yaw according to view pitch so that it decreases to zero at the poles
	  	if (((pitch > 0) && (gazeSpot.pitch > 0)) || ((pitch < 0) && (gazeSpot.pitch < 0))) { 
		  	yawFactor = Math.abs(Math.cos(pitch)); // cos of +/- PI/2 returns close to zero but not zero
		} 
		else {
			yawFactor = 1;
		}		
	  	var dPitch = gazeSpot.pitch - pitch;
	  	// convert yaw values into range 0 to 2PI
	  	yaw = yaw + Math.PI;
	  	var gazeYaw = gazeSpot.yaw + Math.PI;
	  	// calculate difference in yaw in both directions around full circle and use the smallest difference
	  	var dYaw1 = Math.abs(gazeYaw - yaw);
	  	var dYaw2 = (2 * Math.PI) - dYaw1;
	  	var dYaw;
	  	if (dYaw1 < Math.PI) {
	  		dYaw = yawFactor * dYaw1;
	  	} else {
	  		dYaw = yawFactor * dYaw2;
	  	}
	  	var distance = Math.sqrt((dPitch*dPitch)+(dYaw*dYaw));
	  	// return true if distance is less than gazeSpot deviation
		return (distance < gazeSpot.deviation);
	  }
}	    
//})(); // closing brackets for anonymous self-invoking function, not used in webPd version see comment at top
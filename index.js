'use strict';
// this version written for marzipano version 0.3.0

var debugMode = window.APP_DATA.settings.debugMode; 
var webPdUsed = window.APP_DATA.settings.webPdUsed;  // is web pd being used

var readyContainer = document.querySelector('#readyContainer');
var readyElement = document.querySelector('#ready');
var sound = null; // empty variable for HTML id of gazeSpot sound currently playing

if (readyContainer!=null) {

// check whether device has gyro functionality
	window.addEventListener('deviceorientation', function () {
	    document.body.classList.remove('no-gyro');
    	document.body.classList.add('gyro');
		});

// start pano display either by click or touch, check if touch device at the same time
// and get the necessary touchend to enable mobile devices to play audio
	
	readyElement.addEventListener('click', function () {
		console.log('click');
		readyContainer.innerHTML = ''; // hide the ready link
		if (webPdUsed) {
			var patch
				$.get(window.APP_DATA.settings.webPdPatch, function(patchStr) {
				  patch = Pd.loadPatch(patchStr)
				});
			Pd.start();
		}
		// also need to use touchend to start playback of all gazeSpot audio here 
		// load then play and pause each audio clip in turn
		var scenes = APP_DATA.scenes.map(function(sceneData) {
			sceneData.gazeSpots.forEach(function (gazeSpot) {
				if (gazeSpot.audio) {
					sound = document.getElementById(gazeSpot.audio);
					sound.play(); 
					sound.loop = true;
					sound.pause();
					console.log(gazeSpot.audio + ' play/paused');
				};
			});
		});
		go();
		});
		
	readyElement.addEventListener('touchend', function () {
		console.log('touch');
	    document.body.classList.remove('no-touch');
    	document.body.classList.add('touch');
		readyContainer.innerHTML = ''; // hide the ready link
		if (webPdUsed) {
			var patch
				$.get(window.APP_DATA.settings.webPdPatch, function(patchStr) {
				  patch = Pd.loadPatch(patchStr)
				});
			Pd.start();
		}
		// also need to use touchend to start playback of all gazeSpot audio here 
		// load play, then pause each audio clip
		var scenes = APP_DATA.scenes.map(function(sceneData) {
			sceneData.gazeSpots.forEach(function (gazeSpot) {
				if (gazeSpot.audio) {
					sound = document.getElementById(gazeSpot.audio);
					sound.play(); 
					sound.loop = true;
					sound.pause();
					console.log(gazeSpot.audio + ' play/paused');
				};
			});
		});
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
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');
	var deviceOrientationToggleElement = document.querySelector('#deviceOrientationToggle'); // for GYRO on/off
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

  // Detect desktop or mobile mode using a matchMedia query for viewport sizes of 500px square or less
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

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: APP_DATA.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

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

    var limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100*Math.PI/180, 120*Math.PI/180);
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
						lastSpot = gazeSpot; // store this gazeSpot data for when we move off it
						revealTimer = setTimeout(function () {
							document.getElementById(gazeSpot.selector).style.opacity = 1;
							document.getElementById(gazeSpot.selector).style.transition = "opacity " + gazeSpot.timeout + "ms ease-in-out"; }, 500);
						if (gazeSpot.audio) {
							sound = document.getElementById(gazeSpot.audio);
							sound.play(); 
							sound.loop = true;
							// fade in by animating jQuery object
							$(sound)[0].volume = 0; 
							$(sound).animate({volume: 1}, gazeSpot.timeout);
						};
// 						if (webPdUsed) {
// 							Pd.send('send1', [gazeSpot.selector, 1]); // tell webPd the HTML selector of the embedded content
// 							Pd.send('send2', [gazeSpot.timeout]); // tell webPd the transition of the embedded content
// 						};
					}
					if (gazeSpot.target) { // if this is a switch type gazeSpot
						console.log("Gaze spot that switches to scene " + gazeSpot.target + " found at yaw: " + gazeSpot.yaw + ' pitch: ' + gazeSpot.pitch + " timer started"); 
						lastSpot = gazeSpot; // store this gazeSpot data for when we move off it
						switchTimer = setTimeout(function () {
							console.log("timer elapsed");
							if (gazeSpot.target) {switchScene(findSceneById(gazeSpot.target))}; // if gazeSpot has a target, set up a scene switch
							gazing = false;
						}, gazeSpot.timeout); 
// 						if (webPdUsed) {
// 							Pd.send('send1', [gazeSpot.target, 1]); // tell webPd the target of the scene switch
// 							Pd.send('send2', [gazeSpot.timeout]); // tell webPd the timeout of the scene switch
// 						};
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
						if (lastSpot) {
							if (lastSpot.selector) { // if moved off an embedded content reveal type gazespot
								document.getElementById(lastSpot.selector).style.opacity = lastSpot.baseOpacity;
								document.getElementById(lastSpot.selector).style.transition = "opacity " + lastSpot.timeout + "ms ease-in-out"; // hide content	
								$(sound).animate({volume: 0}, lastSpot.timeout, function() {sound.pause()}); // fade out by animating jquery object
// 								if (webPdUsed) {Pd.send('send1', [lastSpot.selector, 0])}; // tell webPD we've moved off this gazeSpot
							}
							if (lastSpot.target) { // if moved off a scene switch gazespot
// 								if (webPdUsed) {Pd.send('send1', [lastSpot.target, 0])}; // tell webPD we've moved off this gazeSpot
							}
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
  
	  // turn on GYRO navigation if on a compatible device with both gyro and touch functions
	  // this is because Chrome on MacOS registers deviceorientation events
	  if (document.body.classList.contains('gyro') && document.body.classList.contains('touch') ) {
		deviceOrientationToggleElement.classList.add('enabled');
		enableGyro();
	  }
	  
	  // Set handler for DeviceOrientation control (GYRO) toggle.
	  if (APP_DATA.settings.deviceOrientationControl) {
    	document.body.classList.add('deviceOrientationControl-enabled');
    	deviceOrientationToggleElement.addEventListener('click', toggleDeviceOrientation);
	  } else {
    	document.body.classList.add('deviceOrientationControl-disabled');
	  }
 
// Note cannot automatically switch full screen mode on, prohibited, needs user input so replace icons with transparent GIFs instead
// Uses screenfull.js  (https://github.com/sindresorhus/screenfull.js) which is not currently compatible with Safari on iOS and Chrome on Android
  if (screenfull.enabled && APP_DATA.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', toggleFullscreen);
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

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
	if (lastscene!=null) {
	   var departureView = lastscene.marzipanoObject.view();
	   var newView = scene.marzipanoObject.view();
	   newView.setParameters({
		 yaw: departureView.yaw(),
		 pitch: departureView.pitch(),
		 fov: departureView.fov()
	  });
	}
	scene.marzipanoObject.switchTo(); // changes the scene
	if (webPdUsed) { // send new scene id to webPd
// 		var wpdScene = parseFloat(scene.data.id.charAt(0));
// 		Pd.send('send3', [wpdScene]);
		Pd.send('send3', [scene.data.id]);
	}
	lastscene = scene; // update lastscene to be the current scene
	startAutorotate();
  }

	  function startAutorotate() {
		viewer.startMovement(autorotate);
		viewer.setIdleMovement(Infinity);
	  }

	  function stopAutorotate() {
		viewer.stopMovement();
		viewer.setIdleMovement(Infinity);
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

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
   stopTouchAndScrollEventPropagation(wrapper);

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

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                      'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
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
  
// Simon's additional functions from here...
  
 	  // Simon's adapted code to create divs for embedded content
	  function createEmbedHotspotElement(hotspot) { 
  
		// Create wrapper element to embed html.
		var wrapper = document.createElement('div');
		wrapper.classList.add('hotspot');
		wrapper.classList.add('embed-hotspot');
		wrapper.innerHTML = hotspot.html; //add the html to the hotspot

		return wrapper;
	  }
 
	  // GYRO: Gyro functions

	  function enableGyro() { 
		deviceOrientationControlMethod.getPitch(function(err, pitch) {
		  if(!err) {
			view.setPitch(pitch);
		  }
		});
		controls.enableMethod('deviceOrientation');
	  }

	  function disableGyro() {
		controls.disableMethod('deviceOrientation');
	  }

	  function toggleDeviceOrientation() {
		if (deviceOrientationToggleElement.classList.contains('enabled')) {
		  deviceOrientationToggleElement.classList.remove('enabled');
		  disableGyro();
		} else {
		  deviceOrientationToggleElement.classList.add('enabled');
		  enableGyro();
		}
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

}	   // end go function 
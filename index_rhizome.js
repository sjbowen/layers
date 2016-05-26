'use strict';

(function() {

	  var debugMode = true; // set to false to turn off debug HTML

// turn on Rhizome - to turn off Rhizome codes comment out from here to 'throw err' line, throttledSend calls below and closing brackets at the end
  rhizome.on('message', function(address, args) { })

  rhizome.on('connected', function() {
    if (debugMode) {alert('connected!');}
  })
  rhizome.on('connection lost', function() {
    if (debugMode) {alert('connection lost!');}
  })
  rhizome.on('queued', function() {
    if (debugMode) {alert('queued!');}
  })

  var throttledSend = rhizome.utils.throttle(100, function(args) {
	rhizome.send('/gyro', args)
  })

 nested function to send data back to Rhizome
  rhizome.start(function(err) {
    if (err) throw err 


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
	  var toggleDeviceOrientationElement = document.getElementById('toggleDeviceOrientation'); // for GYRO on/off
	  var debugElement = document.getElementById('debug'); // container for live location data
	  var debugElement2 = document.getElementById('debug2'); // container for scene info
	  var timer = null; // empty variable for timer

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

	  // Initialize viewer.
	  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

	  // DOM elements for view controls.
	  var viewUpElement = document.querySelector('#viewUp');
	  var viewDownElement = document.querySelector('#viewDown');
	  var viewLeftElement = document.querySelector('#viewLeft');
	  var viewRightElement = document.querySelector('#viewRight');
	  var viewInElement = document.querySelector('#viewIn');
	  var viewOutElement = document.querySelector('#viewOut');

	  // Dynamic parameters for controls.
	  var velocity = 0.7;
	  var friction = 3;

	  // Associate view controls with elements.
	  var controls = viewer.controls();
	  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
	  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
	  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
	  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
	  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
	  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

	  //  GYRO: Register GYRO control method
	  var deviceOrientationEnabled = false;
	  var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
	  var controls = viewer.controls();
	  controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);

	  // Setup autorotate.
	  var autorotate = Marzipano.autorotate({ yawSpeed: 0.1, targetPitch: 0, targetFov: Math.PI/2 });
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
		  console.log(hotspot.yaw, hotspot.pitch, hotspot.target); // log hotspot data, for now
		  // add hotspot.yaw, hotspot. pitch, hotspot.target to an array, then a function that compares dynamics to these values??
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
	  autorotateToggleElement.addEventListener('click', toggleAutorotate);
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
	  sceneListToggleElement.addEventListener('click', toggleSceneList);

	  // Start with the scene list open on desktop.
	  if (!document.body.classList.contains('mobile')) {
		showSceneList();
	  }
  
	  // Set handler for scene switch.
	  scenes.forEach(function(scene) {
		var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
		el.addEventListener('click', function() {  
		  switchScene(scene);
		  // On mobile, hide scene list after selecting a scene.
		  if (document.body.classList.contains('mobile')) {
			hideSceneList();
		  }
		});
	  });
  
	  // Simon's handler for view change 
	  viewer.addEventListener('viewChange', function() {
	  // get yaw, pitch, vertical fov from current view, convert to degrees, abbreviate to 2 decimal points, and convert back to number
		var yaw = Number(Marzipano.util.radToDeg(viewer.view().yaw()).toFixed(2));
		var pitch = - Number(Marzipano.util.radToDeg(viewer.view().pitch()).toFixed(2));
		// invert pitch, so looking up is +90
		var fov = Number(Marzipano.util.radToDeg(viewer.view().fov()).toFixed(2));
		// scale Yaw, Pitch, Fov to be within 0 to 1
		var rhizomeYaw = (yaw+180)/360;
		var rhizomePitch = (pitch+90)/180;
		var rhizomefov = fov/180;
		if (debugMode) { debugElement.innerHTML = 'yaw' + yaw + '<br />pitch' + pitch + '<br />fov' + fov; };
		throttledSend ([rhizomeYaw, rhizomePitch, rhizomefov]); // send data to rhizome
		var gazeSpots = APP_DATA.gazeSpots;	
		var gazing = false;
		gazeSpots.forEach(function (gazeSpot) {
		//for each gazespot, check if view closely matches, set gazing to true if so
				if ((pitch < (gazeSpot.pitch + gazeSpot.pitchLatitude) && pitch > (gazeSpot.pitch - gazeSpot.pitchLatitude)) && 
				(yaw < (gazeSpot.yaw + gazeSpot.yawLatitude) && yaw > (gazeSpot.yaw - gazeSpot.yawLatitude))) {
				if (timer == null) { // if a timer hasn't already been started, start one
						console.log("over gazeSpot, timer started"); 
						timer = setTimeout(function () {switchScene(findSceneById(gazeSpot.target));}, gazeSpot.timeout);
					}
				console.log("gazeSpot" + gazeSpot.target + " found"); 
				gazing = true;
				}
			});
		if (!gazing) { //if not gazing clear the timer
				if (debugMode) {console.log("timer cleared");};
				clearTimeout(timer);
				timer = null;
			}
		});	
	  
	  function sanitize(s) {
		return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
	  }
  
	  function switchScene(scene) {
		stopAutorotate();
		scene.marzipanoObject.switchTo(); // changes the scene
      	rhizome.send ('/scene', [parseFloat(scene.data.id.charAt(0), 100)]); // tell rhizome that we've changed scene, comment out if Rhizome off
		if (debugMode) {debugElement2.innerHTML = scene.data.id.charAt(0); };

		if (lastscene!=null) // if you have already changed scene once already...
		{
			console.log("switching from:", lastscene.data.id, "to:", scene.data.id);
			var view = lastscene.marzipanoObject.view(); // get the view values from the departure scene
			console.log(view);
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
		updateSceneName(scene);
		updateSceneList(scene);
	  }

	  function updateSceneName(scene) {
		sceneNameElement.innerHTML = sanitize(scene.data.name);
	  }

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
		if (!autorotateToggleElement.classList.contains('enabled')) {
		  return;
		}
		viewer.startMovement(autorotate);
		viewer.setIdleMovement(3000, autorotate);
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
	  
		// Simon's object constructor for gazeSpot, not used...
		function gazeSpot (yaw, pitch, yawLatitude, pitchLatitude, target) {
			this.yaw = yaw;
			this.pitch = pitch;
			this.yawLatitude = yawLatitude;
			this.pitchLatitude = pitchLatitude;
			this.tager = target;
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
  })  // closing brackets for rhizome.start nested function

})();
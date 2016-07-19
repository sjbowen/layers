Code for creating interactive spherical panoramas based on Marzipano (v0.5.0)
This version by Simon Bowen July 2016, www.simon-bowen.com

Uses the code created by Marzipano tools as a starting point: http://www.marzipano.net/tool/
But I have modified the contents of index.js, style.css and index.html and extended the format of data.js

index.js modifications:
- removed all functions for displaying and controlling scene list
- removed all functions for view control buttons
- removed all functions for autorotate button
- added functionality from DeviceOrientationControlMethod
- added embed hotspots
- added gazespots

style.css modifications:
- styling for device orientation control elements

index.html modifications:
- removed #sceneList, #sceneListToggle, #titleBar, #autorotateToggle <div>s
- reference to DeviceOrientationControlMethod.js, modernizr-custom.js (for device orientation and motion detect)

data.js modifications:
the data.js file produced by marzipano web-based tool
modified by Simon Bowen to include additional data for embedded html (embedHotspots)
hotspots that respond to looking at a particular location (gazeSpots)
and a script data object for an automatic playlist of view and scene changes
common variables within embedHotspots, gazeSpots are:
		yaw, pitch - location on rectilinear projection (in radians), -pitch is up, +pitch is down 
embedHotspot specific variables:
	radius - radius in pixels of sphere that html is placed upon (so, lower is closer)
	extraRotations - rotate embedded content in X,Y direction so no longer on surface of sphere
		uses strings of the form 'rotateX(#rad) rotateY(#deg)'
		tip: to place content vertically, rotate X equivalent to pitch of embeddedHotspot
		tip: to place content horizontally, rotate X equivalent to PI/2 - pitch of embeddedHotspot
gazeSpot specific variables:
	deviation - tolerance in radians around gazeSpot location to activate it
	target (optional, 'scene switch' type gazeSpot) - id of scenes object this gazeSpot will switch to
	selector (optional, 'embedded content reveal' type gazeSpot) - selector of embedded html to be revealed
	timeout - duration in milliseconds of scene switch or reveal
	baseopacity - opacity element will return to once move off gazeSpot. So, can make elements remain in view if set to 1.0
script object variables:
		type: "rotate" or "scenechange"
	time: time in milliseconds after which to execute rotation or scene change
		time is cummulative, so to execute every second use time = 1000, 2000, 3000 etc.
for rotate parameters, see http://www.marzipano.net/reference/global.html#autorotate 
  	yawSpeed, pitchSpeed, fovSpeed
  	yawAccel, pitchAccel, fovAccel
	targetPitch, targetFov
to prevent movement stopping between rotate events, set accelerations to Infinity
// the data.js file produced by marzipano web-based tool
// modified by Simon Bowen to include additional data for embedded html (embedHotspots)
// hotspots that respond to looking at a particular location (gazeSpots)
// and a script data object for an automatic playlist of view and scene changes
// common variables within embedHotspots, gazeSpots are:
// 		yaw, pitch - location on rectilinear projection (in radians), -pitch is up, +pitch is down 
// embedHotspot specific variables:
//		radius - radius in pixels of sphere that html is placed upon (so, lower is closer)
//		extraRotations - rotate embedded content in X,Y direction so no longer on surface of sphere
//			uses strings of the form 'rotateX(#rad) rotateY(#deg)'
//			tip: to place content vertically, rotate X equivalent to pitch of embeddedHotspot
// gazeSpot specific variables:
//		deviation - tolerance in radians around gazeSpot location to activate it
//		target (optional, 'scene switch' type gazeSpot) - id of scenes object this gazeSpot will switch to
//		selector (optional, 'embedded content reveal' type gazeSpot) - selector of embedded html to be revealed
//		timeout - duration in milliseconds of scene switch or reveal
// script object variables:
// 		type: "rotate" or "scenechange"
//		time: time in milliseconds after which to execute rotation or scene change
//			time is cummulative, so to execute every second use time = 1000, 2000, 3000 etc.
// for rotate parameters, see http://www.marzipano.net/reference/global.html#autorotate 
//   	yawSpeed, pitchSpeed, fovSpeed
//   	yawAccel, pitchAccel, fovAccel
//		targetPitch, targetFov
// to prevent movement stopping between rotate events, set accelerations to Infinity


var APP_DATA = {
  "scenes": [
    {
      "id": "0-the-old-dock",
      "name": "The Old Dock",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.113
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"deviation": 0.2,
			"target": "3-everything",
			"timeout": 3000
		}
	  ]
    },
    {
      "id": "1-the-slave-trade",
      "name": "The Slave Trade",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.0472
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 2.11185,
			"pitch": 0.174533,
			"deviation": 0.2,
			"target": "3-everything",
			"timeout": 3000
		},
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"deviation": 0.2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.349066,
			"target": "0-the-old-dock",
			"timeout": 3000
		},
		{
			"yaw": -0.994838,
			"pitch": 0.122173,
			"deviation": 0.2,
			"target": "2-child-migration",
			"timeout": 3000
		}
      ]
    },
    {
      "id": "2-child-migration",
      "name": "Child Migration",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.0472
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 2.11185,
			"pitch": 0.174533,
			"deviation": 0.2,
			"target": "3-everything",
			"timeout": 3000
		},
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"deviation": 0.2,
			"target": "0-the-old-dock",
			"timeout": 3000
		},
		{
			"yaw": -2.67035,
			"pitch": 0.244346,
			"deviation": 0.2,
			"target": "1-the-slave-trade",
			"timeout": 3000
		}
      
      ]
    },
    {
      "id": "3-everything",
      "name": "Everything",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.0472
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -1.13,
			"pitch": -0.76,
			"radius": 500,
			"html": '<h1 id="helloworld" style="opacity:0.2">hello world</h1>'
      	},
      	{
			"yaw": 2.35,
			"pitch": -0.65,
			"radius": 1500,
// 			"extraRotations": 'rotateX(0.65rad) rotateY(75deg)', // to place image vertically, rotate X equivalent to pitch
			"html": '<img src="photos/bling.jpg" id="bling" style="width:900px;height:600px;opacity:0;" />'
      	},
      	{
			"yaw": 2.9,
			"pitch": 0,
			"radius": 1200,
// 			"extraRotations": 'rotateX(0.65rad) rotateY(75deg)', // to place image vertically, rotate X equivalent to pitch
			"html": '<img src="photos/bananadog.png" id="bananadog" style="width:360px;height:240px;opacity:0;" />'
      	}
      ],
      "gazeSpots": [
		{ // reveal gazeSpot, yaw pitch need to match values of equivalent embedHotspot
			"yaw": -1.13,
			"pitch": -0.76,
			"deviation": 0.2,
			"selector": "helloworld",
			"baseOpacity": 0.2,
			"timeout": 4000
		},
		{ // reveal gazeSpot, yaw pitch need to match values of equivalent embedHotspot
			"yaw": 2.35,
			"pitch": -0.65,
			"deviation": 0.2,
			"selector": "bling",
			"baseOpacity": 0,
			"timeout": 2000
		},
		{ // reveal gazeSpot, yaw pitch need to match values of equivalent embedHotspot
			"yaw": 2.9,
			"pitch": 0,
			"deviation": 0.2,
			"selector": "bananadog",
			"baseOpacity": 0,
			"target": "2-child-migration", // this exampled demonstrates that reveal gazeSpots can also be switch gazespots
			"timeout": 2000
		},
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"deviation": 0.2,
			"target": "0-the-old-dock",
			"timeout": 3000
		},
		{
			"yaw": -0.994838,
			"pitch": 0.122173,
			"deviation": 0.2,
			"target": "2-child-migration",
			"timeout": 3000
		},
		{
			"yaw": -2.67035,
			"pitch": 0.244346,
			"deviation": 0.2,
			"target": "1-the-slave-trade",
			"timeout": 3000
		}

      ]
    }    
  ],
  "script": [],     
  "name": "Layers of the Old Dock",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false, // must be set to true for performance mode to work
    "fullscreenButton": true,
    "viewControlButtons": false,
    "debugMode": true,
    "webPdUsed": true,
    "webPdPatch": "patches/myPatch2.pd"
  }
};
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
//			tip: to place content horizontally, rotate X equivalent to PI/2 - pitch of embeddedHotspot
// gazeSpot specific variables:
//		deviation - tolerance in radians around gazeSpot location to activate it
//		target (optional, 'scene switch' type gazeSpot) - id of scenes object this gazeSpot will switch to
//		selector (optional, 'embedded content reveal' type gazeSpot) - selector of embedded html to be revealed
//		timeout - duration in milliseconds of scene switch or reveal
//		baseopacity - opacity element will return to once move off gazeSpot. So, can make elements remain in view if set to 1.0
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
      "id": "0-above-the-old-dock",
      "name": "Above the Old Dock",
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
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 3356,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -0.95,
			"pitch": 0.1,
			"radius": 1500,
 			"extraRotations": 'rotateX(0.1rad)',
			"html": '<img src="embed/migrantchildren.png" id="children" style="width:400px;height:224px;opacity:0.2;" />'
      	},
       	{
			"yaw": 0.52,
			"pitch": 0.16,
			"radius": 1500,
 			"extraRotations": 'rotateX(0.16rad)',
			"html": '<img src="embed/manbrother.png" id="brother" style="width:300px;height:300px;opacity:0.2;" />'
      	},
       	{
			"yaw": 3.1,
			"pitch": -0.05,
			"radius": 1000,
 			"extraRotations": 'rotateX(-0.05rad) rotateY(-0.5rad)',
			"html": '<img src="embed/childrenshome.png" id="childrenshome" style="width:400px;height:284px;opacity:0.1;" />'
      	},
      	{
			"yaw": 2.31,
			"pitch": 0.93,
			"radius": 700,
 			"extraRotations": 'rotateX(0.641rad) rotateY(0rad)',
			"html": '<p id="thief" style="width:400px;height:200px;opacity:0.1">"I appear before this immense assembly as a thief and a robber. I stole this head, these limbs, this body from my master and ran off with them."</p>'
      	},
      	{
			"yaw": -1.657,
			"pitch": 0.608,
			"radius": 700,
 			"extraRotations": 'rotateX(0.891rad) rotateY(0rad)',
			"html": '<p id="cried" style="width:300px;height:200px;opacity:0.1">"That first night I was not the only one who cried for the ship, for Mum, for England and everyone back there." </p>'
      	},
      	{
			"yaw": 2.44,
			"pitch": -0.67,
			"radius": 1200,
 			"extraRotations": 'rotateX(-0.47rad) rotateY(0rad)',
			"html": '<img src="embed/wallart.png" id="wallart" style="width:270px;height:600px;opacity:0.2;" />'
      	},
      	{
			"yaw": 0.774,
			"pitch": -1,
			"radius": 1500,
 			"extraRotations": 'rotateX(1rad) rotateY(0rad)',
			"html": '<img src="embed/sale.png" id="sale" style="width:400px;height:464px;opacity:0.2;" />'
      	},
      	{
			"yaw": -0.94,
			"pitch": -0.84,
			"radius": 700,
 			"extraRotations": 'rotateX(0.84rad) rotateY(0rad)',
			"html": '<p id="survivors" style="width:300px;opacity:0.1">"On the whole the Fairbridge girls have made a success of their lives. We are now scattered throughout the world but the one thing that we have in common is that we are all survivors." </p>'
      	}
     ],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"deviation": 0.001,
			"target": "1-inside-the-old-dock",
			"timeout": 3000
		},
      	{
			"yaw": -0.95,
			"pitch": 0.1,
			"deviation": 0.2,
			"selector": "children",
			"baseOpacity": 0.5,
			"timeout": 2000
      	},
      	{
			"yaw": 0.52,
			"pitch": 0.16,
			"deviation": 0.2,
			"selector": "brother",
			"baseOpacity": 0.5,
			"timeout": 2000
      	},
      	{
			"yaw": 3.1,
			"pitch": -0.15,
			"deviation": 0.2,
			"selector": "childrenshome",
			"baseOpacity": 0.1,
			"timeout": 2000
      	},
      	{
			"yaw": 2.31,
			"pitch": 0.93,
			"deviation": 0.2,
			"selector": "thief",
			"baseOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": -1.657,
			"pitch": 0.608,
			"deviation": 0.2,
			"selector": "cried",
			"baseOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": 2.44,
			"pitch": -0.67,
			"deviation": 0.2,
			"selector": "wallart",
			"baseOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": 0.774,
			"pitch": -1,
			"deviation": 0.2,
			"selector": "sale",
			"baseOpacity": 0.2,
			"timeout": 2000
      	},
      	{
			"yaw": -0.94,
			"pitch": -0.84,
			"deviation": 0.2,
			"selector": "survivors",
			"baseOpacity": 0.2,
			"timeout": 2000
      	}
	  ]
    },
    {
      "id": "1-inside-the-old-dock",
      "name": "Inside the Old Dock",
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
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 3338,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"deviation": 0.2,
			"target": "0-above-the-old-dock",
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
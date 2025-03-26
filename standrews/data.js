var APP_DATA = {
  "scenes": [
    {
      "id": "0-the-sanctuary-ceiling-mirrored",
      "name": "The Sanctuary Ceiling",
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
        },
        {
          "tileSize": 512,
          "size": 8192
        }
      ],
      "faceSize": 5255,
      "initialViewParameters": {
        "pitch": 1.57,
        "yaw": 3.14,
        "fov": 0.7
      },
      "embedHotspots": [
      	{
			"yaw": 3.14,
			"pitch": 1.57,
			"radius":600,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<p id="instructions" style="width:250px;opacity:1.0">High up, in the dark ceiling of the Chancel, carved wooden Angels have listened for hundreds of years. Turn and tilt this instrument to discover what they have heard...</p>'
      	},
      	{
			"yaw": 1.734,
			"pitch": 1.169,
			"radius":3200,
 			"extraRotations": 'rotateX(0.763rad)',
			"html": '<img src="embed/14thCAngel.png" id="angel" style="width:616px;height:800px;opacity:0.1;" />'
      	},
      	{
			"yaw": 2.745,
			"pitch": 0.336,
			"radius":2400,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<img src="embed/fmnteas.jpg" id="fmnteas" style="width:575px;height:800px;opacity:0.1;" />'
      	},
      	{
			"yaw": -0.583,
			"pitch": 0.502,
			"radius": 2400,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<img src="embed/quarrel.jpg" id="quarrel" style="width:800px;height:1200px;opacity:0.1;" />'
      	},
      	{
			"yaw": 0.502,
			"pitch": 1.07,
			"radius": 2400,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<iframe id="felixnamque" src="embed/felixnamque.html" style="width:800px;height:800px;opacity:0.1;"></iframe>'
      	},
      	{
			"yaw": -2.935,
			"pitch": 0.735,
			"radius": 2400,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<img src="embed/changes.jpg" id="bells" style="width:600px;height:800px;opacity:0.1;" />'
      	},
      	{
			"yaw": -1.923,
			"pitch": 1.021,
			"radius": 2400,
 			"extraRotations": 'rotateX(0rad)',
			"html": '<img src="embed/crosses.jpg" id="crosses" style="width:606px;height:800px;opacity:0.1;" />'
      	}
     ],
      "gazeSpots": [
      	{
			"yaw": 3.14,
			"pitch": 1.57,
			"deviation": 0.1,
			"selector": "instructions",
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": 1.734,
			"pitch": 1.169,
			"deviation": 0.1,
			"selector": "angel",
		  	"audio": ['sounds/plainsong.mp3', 'sounds/plainsong.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": -0.583,
			"pitch": 0.502,
			"deviation": 0.1,
			"selector": "quarrel",
		  	"audio": ['sounds/quarrel.mp3', 'sounds/quarrel.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": 0.502,
			"pitch": 1.07,
			"deviation": 0.1,
			"selector": "felixnamque",
		  	"audio": ['sounds/FelixNamque.mp3', 'sounds/FelixNamque.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": 2.745,
			"pitch": 0.336,
			"deviation": 0.1,
			"selector": "fmnteas",
		  	"audio": ['sounds/forgetMeNotTeas.mp3', 'sounds/forgetMeNotTeas.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": -2.935,
			"pitch": 0.735,
			"deviation": 0.1,
			"selector": "bells",
		  	"audio": ['sounds/bells.mp3', 'sounds/bells.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	},
      	{
			"yaw": -1.923,
			"pitch": 1.021,
			"deviation": 0.1,
			"selector": "crosses",
		  	"audio": ['sounds/stainer.mp3', 'sounds/stainer.ogg'],
		  	"offspotaudio" : true,
			"baseOpacity": 0.1,
			"timeout": 1000
      	}
	  ],
      "linkHotspots": [],
      "infoHotspots": []
    }
  ],
  "name": "Choir of Angels",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": false,
//     "stillQuiet": { "interval" : 100, "tolerance" : 0.2 },
    "deviceInitialYaw": false
  }
};
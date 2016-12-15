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
        "yaw": 1.56,
        "fov": 0.7
      },
      "embedHotspots": [
      	{
			"yaw": 1.734,
			"pitch": 1.169,
			"radius":1200,
 			"extraRotations": 'rotateX(0.763rad)',
			"html": '<img src="embed/angel.png" id="angel" style="width:800px;height:422px;opacity:0.2;" />'
      	},
      	{
			"yaw": -2.191,
			"pitch": -0.807,
			"radius":1200,
 			"extraRotations": 'rotateX(0.763rad)',
			"html": '<img src="embed/happyday.png" id="happyday" style="width:594px;height:750px;opacity:1.0;" />'
      	},
      	{
			"yaw": 2.137,
			"pitch": -0.61,
			"radius": 1200,
 			"extraRotations": 'rotateX(0.96rad)',
			"html": '<img src="embed/chant1.png" id="chant1" style="width:800px;height:568px;opacity:0.3;" />'
      	},
      	{
			"yaw": -0.01,
			"pitch": -0.444,
			"radius": 1200,
 			"extraRotations": 'rotateX(1.13rad)',
			"html": '<img src="embed/chant2.png" id="chant2" style="width:800px;height:566px;opacity:0.3;" />'
      	},
      	{
			"yaw": -1.44,
			"pitch": -0.756,
			"radius": 1200,
 			"extraRotations": 'rotateX(0.814rad)',
			"html": '<img src="embed/chant3.png" id="chant3" style="width:800px;height:563px;opacity:0.3;" />'
      	},
      	{
			"yaw": -2.874,
			"pitch": -0.483,
			"radius": 1200,
 			"extraRotations": 'rotateX(1.087rad)',
			"html": '<img src="embed/chant4.png" id="chant4" style="width:800px;height:565px;opacity:0.3;" />'
      	},
      	{
			"yaw": 0.922,
			"pitch": -0.897,
			"radius": 1200,
 			"extraRotations": 'rotateX(0.673rad)',
			"html": '<img src="embed/abide.png" id="abode" style="width:591px;height:676px;opacity:0.5;" />'
      	},
      	{
			"yaw": -0.794,
			"pitch": -0.495,
			"radius": 800,
 			"extraRotations": 'rotateX(0.897rad)',
			"html": '<img src="embed/bluestar.png" id="bluestar" style="width:379px;height:353px;opacity:0.7;" />'
      	},
      	{
			"yaw": 0.677,
			"pitch": -0.419,
			"radius":1200,
 			"extraRotations": 'rotateX(1.151rad)',
			"html": '<img src="embed/majesty.png" id="majesty" style="width:431px;height:538px;opacity:0.6;" />'
      	}
     ],
      "gazeSpots": [
      	{
			"yaw": 1.734,
			"pitch": 1.169,
			"deviation": 0.2,
			"selector": "angel",
			"baseOpacity": 0.2,
			"timeout": 1000
      	},
      	{
			"yaw": 2.137,
			"pitch": -0.61,
			"deviation": 0.2,
			"selector": "chant1",
			"baseOpacity": 0.3,
			"timeout": 1000
      	},
      	{
			"yaw": -0.01,
			"pitch": -0.444,
			"deviation": 0.2,
			"selector": "chant2",
			"baseOpacity": 0.3,
			"timeout": 1000
      	},
      	{
			"yaw": -1.44,
			"pitch": -0.756,
			"deviation": 0.2,
			"selector": "chant3",
			"baseOpacity": 0.3,
			"timeout": 1000
      	},
      	{
			"yaw": -2.874,
			"pitch": -0.483,
			"deviation": 0.2,
			"selector": "chant4",
			"baseOpacity": 0.3,
			"timeout": 1000
      	}
	  ],
      "linkHotspots": [],
      "infoHotspots": []
    }
  ],
  "name": "The Sanctuary Ceiling, St. Andrew's Church",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": false
  }
};

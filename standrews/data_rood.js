var APP_DATA = {
  "scenes": [
    {
      "id": "0-towards-the-choir",
      "name": "Towards the Choir",
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
      "faceSize": 3335,
      "initialViewParameters": {
        "yaw": 0.5082051470025597,
        "pitch": -0.18337272212666456,
        "fov": 1.38
      },
      "embedHotspots": [
      	{
			"yaw": 0.265,
			"pitch": -0.26,
			"radius":1100,
 			"extraRotations": 'rotateX(0.26rad)',
			"html": '<img src="embed/workingsketch1.gif" id="working1" style="width:900px;height:974px;opacity:0;" />'
      	},
      	{
			"yaw": 0.23,
			"pitch": -0.30,
			"radius":700,
 			"extraRotations": 'rotateX(0.30rad)',
			"html": '<img src="embed/speculation2.png" id="speculation2" style="width:495px;height:900px;opacity:0;" />'
      	}
     ],
      "gazeSpots": [
      	{
			"yaw": 0.265,
			"pitch": -0.26,
			"deviation": 0.1,
			"selector": "working1",
			"baseOpacity": 0,
			"timeout": 1000
      	},
      	{
			"yaw": 0.23,
			"pitch": -0.30,
			"deviation": 0.1,
			"selector": "speculation2",
			"baseOpacity": 0,
			"timeout": 1000
      	}
	  ],
      "linkHotspots": [],
      "infoHotspots": []
    }
  ],
  "name": "Rood Panorama",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": false    
  }
};

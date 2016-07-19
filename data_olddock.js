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
        "fov": 0.85
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -0.95,
			"pitch": 0.1,
			"radius": 750,
 			"extraRotations": 'rotateX(0.1rad)',
			"html": '<img src="embed/migrantchildren.png" id="children" style="width:400px;height:224px;opacity:0.3;" />'
      	},
       	{
			"yaw": 0.52,
			"pitch": 0.16,
			"radius": 750,
 			"extraRotations": 'rotateX(0.16rad)',
			"html": '<img src="embed/manbrother.png" id="brother" style="width:300px;height:300px;opacity:0.2;" />'
      	},
       	{
			"yaw": 3.1,
			"pitch": -0.05,
			"radius": 500,
 			"extraRotations": 'rotateX(-0.05rad) rotateY(-0.5rad)',
			"html": '<img src="embed/childrenshome.png" id="childrenshome" style="width:400px;height:284px;opacity:0.2;" />'
      	},
      	{
			"yaw": 2.31,
			"pitch": 0.93,
			"radius": 250,
 			"extraRotations": 'rotateX(0.641rad) rotateY(0rad)',
			"html": '<p id="thief" style="width:250px;opacity:0.2">"I appear before this immense assembly as a thief and a robber. I stole this head, these limbs, this body from my master and ran off with them."</p>'
      	},
      	{
			"yaw": -1.657,
			"pitch": 0.608,
			"radius": 250,
 			"extraRotations": 'rotateX(0.891rad) rotateY(0rad)',
			"html": '<p id="cried" style="width:250px;opacity:0.2">"That first night I was not the only one who cried for the ship, for Mum, for England and everyone back there." </p>'
      	},
      	{
			"yaw": 2.44,
			"pitch": -0.67,
			"radius": 600,
 			"extraRotations": 'rotateX(-0.47rad) rotateY(0rad)',
			"html": '<img src="embed/wallart.png" id="wallart" style="width:270px;height:600px;opacity:0.1;" />'
      	},
      	{
			"yaw": 0.15,
			"pitch": -0.75,
			"radius": 800,
 			"extraRotations": 'rotateX(0.75rad) rotateY(-0.65rad)',
			"html": '<img src="embed/sale.png" id="sale" style="width:400px;height:464px;opacity:0.2;" />'
      	},
      	{
			"yaw": -0.94,
			"pitch": -0.6,
			"radius": 250,
 			"extraRotations": 'rotateX(0.84rad) rotateY(0rad)',
			"html": '<p id="survivors" style="width:250px;opacity:0.2">"On the whole the Fairbridge girls have made a success of their lives. We are now scattered throughout the world but the one thing that we have in common is that we are all survivors." </p>'
      	}
     ],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"deviation": 0.2,
			"target": "1-inside-the-old-dock",
			"timeout": 3000
		},
      	{
			"yaw": -0.95,
			"pitch": 0.1,
			"deviation": 0.2,
			"selector": "children",
			"baseOpacity": 0.6,
			"timeout": 2000
      	},
      	{
			"yaw": 0.52,
			"pitch": 0.16,
			"deviation": 0.2,
			"selector": "brother",
			"baseOpacity": 0.6,
			"timeout": 2000
      	},
      	{
			"yaw": 3.1,
			"pitch": -0.15,
			"deviation": 0.2,
			"selector": "childrenshome",
			"baseOpacity": 0.2,
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
			"baseOpacity": 0.5,
			"timeout": 2000
      	},
      	{
			"yaw": 0.15,
			"pitch": -0.75,
			"deviation": 0.2,
			"selector": "sale",
			"baseOpacity": 0.2,
			"timeout": 2000
      	},
      	{
			"yaw": -0.94,
			"pitch": -0.6,
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
			"deviation": 0.4,
			"target": "0-above-the-old-dock",
			"timeout": 3000
		}
      ]
    }
  ],
  "script": [],     
  "name": "Surroundings: Liverpool ONE",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false, // must be set to true for performance mode to work
    "fullscreenButton": true,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": true,
    "webPdPatch": "patches/empty.pd"
  }
};
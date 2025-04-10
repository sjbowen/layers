var APP_DATA = {
  "scenes": [
    {
      "id": "0-liverpool-one",
      "name": "Liverpool One",
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
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0.1,
        "yaw": -0.8,
        "fov": 1.1424053815586288
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -0.8,
			"pitch": 0.1,
			"radius": 150,
 			"extraRotations": 'rotateX(0.1rad)',
			"html": '<p id="instructions" style="width:150px;opacity:1.0;font-style:italic">move your phone around, up and down to explore...</p>'
      	},
       	{
			"yaw": -2.17,
			"pitch": -0.35,
			"radius": 600,
 			"extraRotations": 'rotateX(0.35rad)',
			"html": '<img src="embed/orientline.png" id="orient" style="width:400px;height:479px;opacity:0.2;" />'
      	},
       	{
			"yaw": 0.52,
			"pitch": 0.16,
			"radius": 750,
 			"extraRotations": 'rotateX(0.16rad)',
			"html": '<img src="embed/manbrother.png" id="brother" style="width:300px;height:300px;opacity:0.2;" />'
      	},
      	{
			"yaw": -2.39,
			"pitch": 0.93,
			"radius": 250,
 			"extraRotations": 'rotateX(0.641rad) rotateY(0rad)',
			"html": '<p id="thief" style="width:250px;opacity:0.2">"I appear before this immense assembly as a thief and a robber. I stole this head, these limbs, this body from my master and ran off with them."</p>'
      	},
      	{
			"yaw": 1.61,
			"pitch": 0.5,
			"radius": 250,
 			"extraRotations": 'rotateX(1.071rad) rotateY(0rad)',
			"html": '<p id="mother" style="width:220px;opacity:0.2">"I told my mother about a scheme to send children to Australia. She said, &#39;Although it will be dangerous we won’t stand in your way. In any case you may have a better future there&#39;."</p>'
      	},
      	{
			"yaw": 2.44,
			"pitch": -0.67,
			"radius": 600,
 			"extraRotations": 'rotateX(-0.47rad) rotateY(0rad)',
			"html": '<img src="embed/wallart.png" id="wallart" style="width:270px;height:600px;opacity:0.1;" />'
      	}
     ],
      "gazeSpots": [
      	{
			"yaw": -0.8,
			"pitch": 0.1,
			"deviation": 0.2,
			"selector": "instructions",
			"baseOpacity": 0.15,
			"timeout": 2000
      	},
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"deviation": 0.2,
			"target": "1-above-the-old-dock",
			"timeout": 3000
		},
      	{
			"yaw": -2.17,
			"pitch": -0.35,
			"deviation": 0.2,
			"selector": "orient",
			"audio": ['sounds/LinersM.mp3', 'sounds/LinersM.wav'],
			"baseOpacity": 0.4,
			"timeout": 2000
      	},
      	{
			"yaw": 0.52,
			"pitch": 0.16,
			"deviation": 0.2,
			"selector": "brother",
			"audio": ['sounds/SlaveShip.mp3', 'sounds/SlaveShip.wav'],
			"baseOpacity": 0.6,
			"timeout": 2000
      	},
      	{
			"yaw": 1.61,
			"pitch": 0.5,
			"deviation": 0.2,
			"selector": "mother",
			"audio": ['sounds/MotherF.mp3', 'sounds/MotherF.wav'],
			"baseOpacity": 0.6,
			"timeout": 2000
      	},
      	{
			"yaw": -2.39,
			"pitch": 0.93,
			"deviation": 0.2,
			"selector": "thief",
			"baseOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": 2.44,
			"pitch": -0.67,
			"deviation": 0.2,
			"selector": "wallart",
			"audio": ['sounds/WallArt.mp3', 'sounds/WallArt.wav'],
			"baseOpacity": 0.5,
			"timeout": 2000
      	}
	  ],
	  "manySpotSwitch": 
	  	{
	  		"target": "1-above-the-old-dock",
	  		"trigger": 5,
	  		"timeout": 10000 // 10 seconds delay before many spot switch
	  	},
	  "timeOutSwitch":
	  	{
	  		"target": "1-above-the-old-dock",
	  		"timeout": 180000 // 3 minutes until time out switch?
	  	}	  
    },
    {
      "id": "1-above-the-old-dock",
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
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0.1,
        "yaw": -0.8,
        "fov": 1.1424053815586288
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -0.85,
			"pitch": 0.1,
			"radius": 750,
 			"extraRotations": 'rotateX(-0.1rad)',
			"html": '<img src="embed/migrantchildren.png" id="children" style="width:400px;height:224px;opacity:0.3;" />'
      	},
       	{
			"yaw": 3.1,
			"pitch": -0.05,
			"radius": 500,
 			"extraRotations": 'rotateX(-0.05rad) rotateY(-0.5rad)',
			"html": '<img src="embed/childrenshome.png" id="childrenshome" style="width:400px;height:284px;opacity:0.2;" />'
      	},
      	{
			"yaw": 2.47,
			"pitch": -0.59,
			"radius": 250,
 			"extraRotations": 'rotateX(0.59rad) rotateY(0rad)',
			"html": '<p id="railings" style="width:220px;opacity:0.2">"I leaned over the railings and watched the ropes which held us to the dock. When they slipped into the water my heart sank with them." </p>'
      	},
      	{
			"yaw": 0.15,
			"pitch": -0.75,
			"radius": 800,
 			"extraRotations": 'rotateX(0.75rad) rotateY(-0.65rad)',
			"html": '<img src="embed/sale.png" id="sale" style="width:400px;height:464px;opacity:0.2;" />'
      	}
     ],
      "gazeSpots": [
      	{
			"yaw": -0.85,
			"pitch": 0.1,
			"deviation": 0.2,
			"selector": "children",
			"audio": ['sounds/Children.mp3', 'sounds/Children.wav'],
			"baseOpacity": 0.6,
			"timeout": 2000
      	},
      	{
			"yaw": 3.1,
			"pitch": -0.15,
			"deviation": 0.2,
			"selector": "childrenshome",
			"audio": ['sounds/ChildrensHome.mp3', 'sounds/ChildrensHome.wav'],
			"baseOpacity": 0.2,
			"timeout": 2000
      	},
      	{
			"yaw": 2.47,
			"pitch": -0.59,
			"deviation": 0.2,
			"selector": "railings",
			"audio": ['sounds/TheRailingsM.mp3', 'sounds/TheRailingsM.wav'],
			"baseOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": 0.15,
			"pitch": -0.75,
			"deviation": 0.2,
			"selector": "sale",
			"audio": ['sounds/SlaveSong.mp3', 'sounds/SlaveSong.wav'],
			"baseOpacity": 0.2,
			"timeout": 2000
      	}
	  ],
	  "manySpotSwitch": 
	  	{
	  		"target": "2-inside-the-old-dock",
	  		"trigger": 4,
	  		"timeout": 10000, // 10 seconds until many spot switch
	  	},
	  "timeOutSwitch":
	  	{
	  		"target": "2-inside-the-old-dock",
	  		"timeout": 180000 // 3 minutes until time out switch?
	  	}	  
    },
    {
      "id": "2-inside-the-old-dock",
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
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0.1,
        "yaw": -0.8,
        "fov": 1.1424053815586288
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{
			"yaw": -2.68,
			"pitch": -0.10,
			"radius": 550,
 			"extraRotations": 'rotateX(-0.07rad) rotateY(0.2rad)',
			"html": '<div class="fadein" style="height:200px;width:200px;" id="slides"><img src="embed/migrantchildren_slide.jpg"><img src="embed/sale_slide.jpg"><img src="embed/orientline_slide.jpg"><img src="embed/manbrother_slide.jpg"></div>'
      	}
      ],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"deviation": 0.4,
			"target": "0-liverpool-one",
			"timeout": 3000
		},
      	{
			"yaw": -2.6,
			"pitch": -0.11,
			"deviation": 0.2,
			"selector": "slides",
			"audio": ['sounds/OldDockInfo2.mp3', 'sounds/OldDockInfo2.wav'],
			"baseOpacity": 0.6,
			"timeout": 2000
      	}		
      ],
   	  "bgAudio": {
   	  	"source": ['sounds/OldDockShort.mp3', 'sounds/OldDockShort.wav'],
   	  	"volume": 0.5
   	  },
   	  "switchAudio": {
   	  	"source": ['sounds/OldDockInfo1.mp3', 'sounds/OldDockInfo1.wav'],
   	  	"delay": 6000
   	  },
   	  "slidesTimeout": 2000
    }
  ],
  "script": [],     
  "name": "Layers: Old Dock",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false, // must be set to true for performance mode to work
    "fullscreenButton": true,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": true
  }
};
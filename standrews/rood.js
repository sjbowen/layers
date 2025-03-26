var APP_DATA = {
  "scenes": [
    {
      "id": "0-chancel-arch-from-the-nave",
      "name": "Chancel Arch from the Nave",
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
      "faceSize": 5259,
      "initialViewParameters": {
        "yaw": -0.069,
        "pitch": -0.15,
        "fov": 1.3543920593777203
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{	// to make it look like slideshow only plays when gazing, have static image in same place behind, and fade slideshow to 0 when not gazing
			"yaw": -0.245,
			"pitch": -0.36,
			"radius":900,
 			"extraRotations": 'rotateX(0.36rad) rotateY(-0.245rad)',
			"html": '<img src="embed/rood1.jpg" id="rood" style="width:845px;height:1200px;opacity:0.4;">'
      	},
      	{
			"yaw": -0.245,
			"pitch": -0.36,
			"radius":900,
 			"extraRotations": 'rotateX(0.36rad) rotateY(-0.245rad)',
			"html": '<div class="fadein" style="height:1200px; width:845px;opacity:0" id="roodslides" ><img src="embed/rood1.jpg"><img src="embed/rood2.jpg"><img src="embed/rood3.jpg"><img src="embed/rood4.jpg"><img src="embed/rood5.jpg"><img src="embed/rood6.jpg"><img src="embed/rood7.jpg"><img src="embed/rood8.jpg"></div>'      
      	},
      	{
			"yaw": 2.57,
			"pitch": -0.6,
			"radius":600,
 			"extraRotations": 'rotateX(0.4rad) rotateY(0rad)',
			"html": '<img src="embed/allanSketch1.jpg" id="sketch1" style="width:604px;height:800px;opacity:0.4;">'
      	},
      	{
			"yaw": -2.57,
			"pitch": -0.6,
			"radius":600,
 			"extraRotations": 'rotateX(0rad) rotateY(0rad)',
			"html": '<img src="embed/allanSketch2.jpg" id="sketch2" style="width:541px;height:800px;opacity:0.4;">'
      	},
      	{
			"yaw": 2.57,
			"pitch": 0.5,
			"radius":600,
 			"extraRotations": 'rotateX(0rad) rotateY(0rad)',
			"html": '<img src="embed/allan14thC.jpg" id="14thC" style="width:430px;height:800px;opacity:0.4;">'
      	},
      	{
			"yaw": -2.57,
			"pitch": 0.5,
			"radius":600,
 			"extraRotations": 'rotateX(0rad) rotateY(0rad)',
			"html": '<img src="embed/allan14thC.jpg" id="16thC" style="width:459px;height:800px;opacity:0.4;">'
      	}      
      ],
      "gazeSpots": [
      	{
			"yaw": -0.245,
			"pitch": -0.36,
			"deviation": 0.2,
			"selector": "roodslides",
			"baseOpacity": 0,
			"maxOpacity": 0.7,
			"timeout": 2000
      	},
      	{
			"yaw": 2.57,
			"pitch": -0.6,
			"deviation": 0.2,
			"selector": "sketch1",
			"baseOpacity": 0.4,
			"maxOpacity": 0.9,
			"timeout": 1000
      	},
      	{
			"yaw": -2.57,
			"pitch": -0.6,
			"deviation": 0.2,
			"selector": "sketch2",
			"baseOpacity": 0.4,
			"maxOpacity": 0.9,
			"timeout": 1000
      	},
      	{
			"yaw": 2.57,
			"pitch": 0.5,
			"deviation": 0.2,
			"selector": "14thC",
			"baseOpacity": 0.4,
			"maxOpacity": 0.9,
			"timeout": 1000
      	},
      	{
			"yaw": -2.57,
			"pitch": 0.5,
			"deviation": 0.2,
			"selector": "16thC",
			"baseOpacity": 0.4,
			"maxOpacity": 0.9,
			"timeout": 1000
      	}            
      ],
   	  "bgAudio": {
   	  	"source": ['sounds/roodDrawingsDiscussion.mp3', 'sounds/roodDrawingsDiscussion.ogg'],
   	  	"volume": 0.8
   	  },
    "slidesTimeout" : 8000 
    }
  ],
  "name": "Speculative Rood",
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

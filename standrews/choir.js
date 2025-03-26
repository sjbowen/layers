var APP_DATA = {
  "scenes": [
    {
      "id": "0-choir",
      "name": "Choir",
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
      "faceSize": 3322,
      "initialViewParameters": {
        "yaw": -1.5868195400392153,
        "pitch": -0.09987723816773375,
        "fov": 1.5471904952262132
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
      	{	
			"yaw": -1.57,
			"pitch": 0.99,
			"radius":600,
 			"extraRotations": 'rotateX(0.55rad) rotateY(0rad)',
			"html": '<img src="embed/choirstalls.jpg" id="choirstalls" style="width:600px;height:398px;opacity:0.4;">'
      	},
      	{	
			"yaw": -2.33,
			"pitch": -0.481,
			"radius":500,
 			"extraRotations": 'rotateX(0rad) rotateY(0rad)',
			"html": '<img src="embed/clerics.jpg" id="clerics" style="width:600px;height:359px;opacity:0.2;">'
      	},
      	{	
			"yaw": 2.032,
			"pitch": -0.97,
			"radius":600,
 			"extraRotations": 'rotateX(0rad) rotateY(0rad)',
			"html": '<img src="embed/angel.jpg" id="angel" style="width:479px;height:600px;opacity:0.2;">'
      	},
      	{	// to make it look like slideshow only plays when gazing, have static image in same place behind, and fade slideshow to 0 when not gazing
			"yaw": -0.653,
			"pitch": -0.405,
			"radius":590,
 			"extraRotations": 'rotateX(0.405rad) rotateY(-0.653rad)',
			"html": '<img src="embed/choir1.png" id="rood" style="width:1200px;height:1130px;opacity:0.4;">'
      	},
      	{
			"yaw": -0.653,
			"pitch": -0.405,
			"radius":590,
 			"extraRotations": 'rotateX(0.405rad) rotateY(-0.653rad)',
			"html": '<div class="fadein" style="height:1130px;width:1200px;opacity:0;" id="choirslides"><img src="embed/choir1.png"><img src="embed/choir2.png"><img src="embed/choir3.png"><img src="embed/choir4.png"><img src="embed/choir5.png"><img src="embed/choir6.png"></div>'
      	}
      ],
      "gazeSpots": [
      	{
			"yaw": -1.57,
			"pitch": 0.99,
			"deviation": 0.2,
			"selector": "choirstalls",
			"baseOpacity": 0.4,
			"maxOpacity": 1.0,
			"timeout": 2000
      	},
      	{
			"yaw": -2.33,
			"pitch": -0.481,
			"deviation": 0.2,
			"selector": "clerics",
			"baseOpacity": 0.2,
			"maxOpacity": 1.0,
			"timeout": 2000
      	},
      	{
			"yaw": 2.032,
			"pitch": -0.97,
			"deviation": 0.2,
			"selector": "angel",
			"baseOpacity": 0.2,
			"maxOpacity": 1.0,
			"timeout": 2000
      	},
      	{
			"yaw": -0.653,
			"pitch": -0.405,
			"deviation": 0.7,
			"selector": "choirslides",
			"baseOpacity": 0,
			"maxOpacity": 0.7,
			"timeout": 2000
      	}
      ],
   	  "bgAudio": {
   	  	"source": ['sounds/easterExcerpt.mp3', 'sounds/easterExcerpt.ogg'],
   	  	"volume": 0.8
   	  },
    "slidesTimeout" : 8000         
    }
  ],
  "name": "Speculative Choir",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": false,
  }
};

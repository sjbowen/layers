var APP_DATA = {
  "scenes": [
    {
      "id": "0-entrance-hall",
      "name": "Entrance Hall",
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
      "faceSize": 1728,
      "initialViewParameters": {
        "yaw": 0.277639748096842,
        "pitch": 0.041283190170190665,
        "fov": 1.4532490337853081
      },
      "linkHotspots": [
        {
          "yaw": 0.253980634044483,
          "pitch": 0.06645278056150694,
          "rotation": 0,
          "target": "1-study"
        }
      ],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": []
    },
    {
      "id": "1-study",
      "name": "Study",
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
      "faceSize": 1728,
      "initialViewParameters": {
        "yaw": -3.1189768323551235,
        "pitch": -0.030138478258947998,
        "fov": 1.3777236394733143
      },
      "linkHotspots": [
        {
          "yaw": 2.6429738872159723,
          "pitch": -0.06029693918145185,
          "rotation": 0,
          "target": "2-drawing-room"
        },
        {
          "yaw": 0.05968537991503453,
          "pitch": -0.005907103535824021,
          "rotation": 0,
          "target": "0-entrance-hall"
        }
      ],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": []
    },
    {
      "id": "2-drawing-room",
      "name": "Drawing Room",
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
      "faceSize": 1728,
      "initialViewParameters": {
        "yaw": 3.1400827199867605,
        "pitch": -0.1643021536538427,
        "fov": 1.4532490337853081
      },
      "linkHotspots": [
        {
          "yaw": 2.084061580616984,
          "pitch": -0.042245925188694855,
          "rotation": 0,
          "target": "1-study"
        }
      ],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": []
    }
  ],
  "name": "Abbotsford",
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

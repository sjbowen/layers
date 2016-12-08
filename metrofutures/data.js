var APP_DATA = {
  "scenes": [
    {
      "id": "0-doorway",
      "name": "Doorway",
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
      "faceSize": 3336,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0,
          "pitch": 0,
          "rotation": 0,
          "target": "1-seated"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.18329199393572,
          "pitch": 0.28147642445077814,
          "title": "Example - title",
          "text": "Example - description"
        }
      ],
       "infoSpotsUrl": "infospots0.json"
    },
    {
      "id": "1-seated",
      "name": "Seated",
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
        }
      ],
      "faceSize": 688.5,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.13568971740135005,
          "pitch": 0.002878153959853691,
          "rotation": 0,
          "target": "0-doorway"
        },
        {
          "yaw": -3.0164877293810406,
          "pitch": 0.002902460075461022,
          "rotation": 0,
          "target": "2-vestibule"
        }
      ],
      "infoHotspots": [],
      "infoSpotsUrl": "infospots1.json"
    },
    {
      "id": "2-vestibule",
      "name": "Vestibule",
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
      "faceSize": 3325,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.12308585688354334,
          "pitch": 0.10448869868299937,
          "rotation": 0,
          "target": "1-seated"
        }
      ],
      "infoHotspots": [],
      "infoSpotsUrl": "infospots2.json"
    }
  ],
  "name": "Metro Futures",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false,
    "deviceOrientationControl": true,
    "debugMode": false,
    "webPdUsed": false,
    "manySpotSwitch": true
  }
};

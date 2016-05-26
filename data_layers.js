// the data.js file produced by marzipano web-based tool, to include data for embedded hotspots
// format for embedHotspots is:
// yaw, pitch location on rectilinear projection
// radius, extraRotations see Marzipano documentation on hotspots..
// gazeSpot latitude is +/- radians area around gazeSpot location to activate it
// yawLatitude needs to be larger nearer the poles
// All yaw, pitch values need to be in radians (use Google convertor) and -pitch is up, +pitch is down    

var APP_DATA = {
  "scenes": [
    {
      "id": "0-the-old-dock",
      "name": "The Old Dock",
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.113
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.349066,
			"target": "1-everything",
			"timeout": 3000
		}
	  ]
    },
    {
      "id": "1-everything",
      "name": "Everything",
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.0472
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.349066,
			"target": "0-the-old-dock",
			"timeout": 3000
		},
		{
			"yaw": -0.994838,
			"pitch": 0.122173,
			"yawLatitude": 0.261799,
			"pitchLatitude": 0.261799,
			"target": "3-child-migration",
			"timeout": 3000
		},
		{
			"yaw": -2.67035,
			"pitch": 0.244346,
			"yawLatitude": 0.261799,
			"pitchLatitude": 0.261799,
			"target": "2-the-slave-trade",
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
    "viewControlButtons": false
  }
};
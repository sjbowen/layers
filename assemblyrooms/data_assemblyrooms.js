// the data.js file produced by marzipano web-based tool, to include data for embedded hotspots
// format for embedHotspots is:
// yaw, pitch location on rectilinear projection
// radius, extraRotations see Marzipano documentation on hotspots..
// gazeSpot latitude is +/- radians area around gazeSpot location to activate it
// yawLatitude needs to be larger nearer the poles
// all yaw, pitch values need to be in radians (use Google convertor) and -pitch is up, +pitch is down    

var APP_DATA = {
  "scenes": [
    {
      "id": "0-the-grand-assembly-rooms",
      "name": "The Grand Assembly Rooms",
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
      "faceSize": 3343,
      "initialViewParameters": {
        "yaw": -0.018040444499748176,
        "pitch": 0.010863045136897398,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [],
      "gazeSpots": [
		{
			"yaw": 1.484,
			"pitch": -0.166,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"target": "1-the-grander-assembly-rooms",
			"id": 0,
			"timeout": 3000
		}
      ]
    },
    {
      "id": "1-the-grander-assembly-rooms",
      "name": "The Grander Assembly Rooms",
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
      "faceSize": 3343,
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
			"yaw": -1.484,
			"pitch": -0.166,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"target": "2-the-grandest-assembly-rooms",
			"id": 0, // id = 0 is no specific spot-related sound
			"timeout": 3000
		},
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.349066,
			"target": "0-the-grand-assembly-rooms",
			"id": 0, // id = 0 is no specific spot-related sound
			"timeout": 3000
		},
		{
			"yaw": -1.539,
			"pitch": 0.534,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 1, // this tape will self-destruct
			"timeout": 8000
		},
		{
			"yaw": 0.748,
			"pitch": -0.051,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 2, // neurotic clock
			"timeout": 8000
		},
		{
			"yaw": 0,
			"pitch": -0.586,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 3, // eye resonator
			"timeout": 8000
		}
      ]
    },
    {
      "id": "2-the-grandest-assembly-rooms",
      "name": "The Grandest Assembly Rooms",
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
      "faceSize": 3343,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": [],
      "embedHotspots": [
			{ // testing embed spots
				"yaw": Math.PI,
				"pitch": -Math.PI/2,
				"radius": 900,
				"html": '<iframe src="embed/slideshow.html" style="width:640px;height:360px;opacity:0.4;"></iframe>'
			}            
      ],
      "gazeSpots": [
		{
			"yaw": 0,
			"pitch": Math.PI/2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.349066,
			"target": "0-the-grand-assembly-rooms",
			"id": 0, // id = 0 is no specific spot-related sound
			"timeout": 3000
		},
		{
			"yaw": -1.539,
			"pitch": 0.534,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 1, // this tape will self-destruct
			"timeout": 8000
		},
		{
			"yaw": 0.748,
			"pitch": -0.051,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 2, // neurotic clock
			"timeout": 8000
		},
		{
			"yaw": 0,
			"pitch": -0.586,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 3, // eye resonator
			"timeout": 8000
		},
		{
			"yaw": 0,
			"pitch": -Math.PI/2,
			"yawLatitude": Math.PI,
			"pitchLatitude": 0.2,
			"id": 4, // vj performance
			"timeout": 8000
		},
		{
			"yaw": 2.557,
			"pitch": 0.3602,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 5, // jane dudman
			"timeout": 8000
		},
		{
			"yaw": -0.881,
			"pitch": -0.508,
			"yawLatitude": 0.2,
			"pitchLatitude": 0.2,
			"id": 6, // ocelot
			"timeout": 8000
		}

      ]
    }
  ],
  "script": [],     
  "name": "Layers of the Grand Assembly Rooms",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,	
    "viewControlButtons": false,
    "debugMode": true,
    "webPdUsed": true,
    "webPdPatch": "patches/assemblyRooms.pd"
  }
};
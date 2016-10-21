// Data file for geolocation script
// Latitude and longitude are GPS coordinates in decimal degrees (DD)
// Deviation is range +/- in degrees on coordinates
// 1 degree at poles equates to 111,319 metres, so 1 metre = 0.00000898 degree
// Url is page to redirect to if within location range
// Right click > What's Here on Google maps gives DD coordinates

var GEO_DATA = {
	"locations": [
		{ // Footpath sign above the Old Dock
			"latitude":53.9191144,
			"longitude":-2.987572,
			"deviation":0.0001, // v.roughly 10 metres tolerance
			"url": "olddock.html" 
		},
		{ // Outside Culture Lab
			"latitude":54.978802,
			"longitude":-1.614127,
			"deviation":0.0001, // v.roughly 10 metres tolerance
			"url": "http://www.ncl.ac.uk/culturelab/" 
		},
		{ // Simon's desk at home
			"latitude":53.919071,
			"longitude":-1.137836,
			"deviation":0.0001, // v.roughly 10 metres tolerance
			"url": "http://www.simon-bowen.com" 
		}
	]
}
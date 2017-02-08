'use strict';
var listContainer = document.querySelector('#list');
var APP_DATA = window.APP_DATA;
var visible = false;

if (window.APP_DATA.settings.tracking) {
	var logpixel = document.createElement('img');
	logpixel.height = "1px";
	logpixel.width = "1px";
	console.log("tracking pixel created");
}

var scenes = APP_DATA.scenes.map(function(sceneData) {
    // Create list items  - either from data in APP_DATA or from external JSON file, if present
	if (sceneData.infoSpotsUrl) {
		$.getJSON( sceneData.infoSpotsUrl, function(data) {
			console.log("infoSpots loaded");
			data.infoHotspots.forEach(function(hotspot) {
			  var element = createInfoHotspotElement(hotspot);
			  listContainer.appendChild(element);
// 			  marzipanoScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
			});
		});
    } else {
		sceneData.infoHotspots.forEach(function(hotspot) {
		  var element = createInfoHotspotElement(hotspot);
		  marzipanoScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
		});
    }
	
    return {
      data: sceneData
    };
  });

// function definitions

function logComment(id) {
	var comment = prompt("Please enter your short comment");
	logpixel.src = (id + "_list_" + comment);
}

function createInfoHotspotElement(hotspot) {

	// Create wrapper element to hold icon and tooltip.
	var wrapper = document.createElement('div');
	wrapper.classList.add('hotspot');
	wrapper.classList.add('info-hotspot');

	// Create hotspot/tooltip header.
	var header = document.createElement('div');
	header.classList.add('info-hotspot-header');

	// Create image element.
	var iconWrapper = document.createElement('div');
	iconWrapper.classList.add('info-hotspot-icon-wrapper');
	var icon = document.createElement('img');
	icon.src = '/img/info.png';
	icon.classList.add('info-hotspot-icon');
	iconWrapper.appendChild(icon);

	// Create title element.
	var titleWrapper = document.createElement('div');
	titleWrapper.classList.add('info-hotspot-title-wrapper');
	var title = document.createElement('div');
	title.classList.add('info-hotspot-title');
	title.innerHTML = hotspot.title;
	titleWrapper.appendChild(title);

	// Create list title element
	var listTitle = document.createElement('p');
	listTitle.innerHTML = (hotspot.title + "<br/>");

	// Create close element.
	var closeWrapper = document.createElement('div');
	closeWrapper.classList.add('info-hotspot-close-wrapper');
	var closeIcon = document.createElement('img');
	closeIcon.src = '/img/close.png';
	closeIcon.classList.add('info-hotspot-close-icon');
	closeWrapper.appendChild(closeIcon);

	// Construct header element.
	header.appendChild(iconWrapper);
	header.appendChild(titleWrapper);
	header.appendChild(closeWrapper);

	// Create text element.
	var text = document.createElement('div');
	text.classList.add('info-hotspot-text');
	if (hotspot.storyID) {
		text.innerHTML = (
		"<p>" + hotspot.text + "</p>" 
		+ "<p><a href='#' onclick='alert(\"Thank you, your vote has been registered.\");logpixel.src = \"" + hotspot.storyID + "_up\"'>&#9989; Agree</a> <a href='#' onclick='alert(\"Thank you, your vote has been registered.\");logpixel.src = \"" + hotspot.storyID + "_down\"'>&#10062; Disagree</a></p>" 
		+ "<p><button onclick='logComment(" + hotspot.storyID + ")'>Comment.</button></p>" 	
		);
	} else {
		text.innerHTML = ("<p>" + hotspot.text + "</p>");    
	}

	// Place header and text into wrapper element.
	wrapper.appendChild(header);
	wrapper.appendChild(text);
	wrapper.appendChild(listTitle);

	// Create a modal for the hotspot content to appear on mobile mode.
	var modal = document.createElement('div');
	modal.innerHTML = wrapper.innerHTML;
	modal.classList.add('info-hotspot-modal');
	document.body.appendChild(modal);

	var toggle = function() {
	  wrapper.classList.toggle('visible');
	  modal.classList.toggle('visible');
	  console.log("toggle");
	  if (visible) { // toggle scrollable or not so that modal appears in the correct place
		document.body.style.height = "auto";
		visible = false;
	  } else {
	  	document.body.style.height = "100%"
	  	visible = true;
	  }
	};

	// Show content when hotspot is clicked.
	wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

	// Hide content when close icon is clicked.
	modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
}

//   Prevent touch and scroll events from reaching the parent element.
function stopTouchAndScrollEventPropagation(element, eventList) {
	var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
					  'wheel', 'mousewheel' ];
	for (var i = 0; i < eventList.length; i++) {
	  element.addEventListener(eventList[i], function(event) {
		event.stopPropagation();
	  });
	}
}


// If there is one thing this project has taught me it is that
// Scope Matters

// Initiate Google Maps
var map = new google.maps.Map(document.getElementsByClassName('map-canvas'), {
    zoom: 13,
    center: new google.maps.LatLng(42.692,-89.009),
	disableDefaultUI: true
});

// Google map fail statement
if (typeof google != ('object')) {
	$('.map-canvas').append("<h1>Unable to load the map. Please try again.</h1>");
}

// Enables info window with a content placeholder
var infoWindow = new google.maps.InfoWindow({ content: "contentString" });


// mapPoint object to hold information about a map point.
function mapPoint(name, type, lat, long, show, venueId) {
	'use strict';
	var self = this;
	self.name = name;
	self.type = type;
	self.show = ko.observable(show);
	self.venueId = venueId;
	self.lat = ko.observable(lat);
	self.long = ko.observable(long);
	self.latLng = new google.maps.LatLng(lat, long);

	self.marker = new google.maps.Marker({
		position: self.latLng,
		title: name,
		map: map,
		draggable: false
	});

	/* The magic happens right here. Sets the info window to hold JSON info
	 * and implements bouncing animation when the marker is clicked
	 */
	self.openInfoWindow = function(){
		// Create the new info window and populate with information
		infoWindow.setContent("<div class='content'></div>");
		infoWindow.open(map,self.marker);
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){self.marker.setAnimation(null);}, 1400);
		// Writes data into info window. Nothing happens without this line
		getInfoWindowContent(self.marker);
		// set the center of the map to the location of the marker clicked
		map.setCenter(self.latLng);
	};
	// Marker listens for click
	google.maps.event.addListener(self.marker, 'click', self.openInfoWindow);
	
	self.updateShow = function(show){
		self.show(show);
		if(show){
			self.marker.setMap( map );
		}else{
			self.marker.setMap( null );
		}
	};


	// Begin JSON request
	function getInfoWindowContent(){
		var $windowContent = $('#content');
		// Client Ids and secrets would not make it to production code
		var foursquareUrl = 'https://api.foursquare.com/v2/venues/'+ venueId+
		'?client_id=URGEGRHR4PYMZETAERB02IQQ2J0ALZ1ZAQL5XMOQOZSGFJEA'+
		'&client_secret=LQTBAAROXZR2GWOU5SON5N5QC3ZJVBMM4IZ4YCOG1LTKQ3VZ'+
		'&v=20130815';
		// Gathers the JSON information desired into vars
		$.getJSON(foursquareUrl, function(response) {
			var venue = response.response.venue;
		    var venueName = venue.name;
		   	var address = venue.location.formattedAddress;
		   	var phone = venue.contact.formattedPhone;
		   	var website = venue.url;

		   	if(venueName) {$windowContent.append('<p>' + venueName + '</p>');
		   } else {
		   	$windowContent('<p> Unable to find location name</p>');
			}
		   	if(address) {$windowContent.append('<p>' + address + '</p>');
		   } else {
		   		$windowContent.append('<p> address unlisted </p>');
		   	}
		   	if(phone) {$windowContent.append('<p>' + phone + '</p>');
		   } else {
		   		$windowContent.append('<p> Phone number unlisted </p>');
		   	}
		   	if(website) {$windowContent.append('<p><a href=' + website + '></a></p>');
		   } else {
		   		$windowContent.append('<p> Website unlisted </p>');
		   	}
		}).error(function(e) {
			// what did you do to upset Foursquare?? I didn't say anything.
			$windowContent.text('Oops! I think foursquare is not talking at this time.');
		});
	}
}	


function myViewModel() {
	'use strict';
	var self = this;
	// array of locations
	self.mapPoints = ko.observableArray([
        new mapPoint('Citrus Cafe', 'Restaurant', 42.680,-89.019, true, '500d87bae4b0bab9bd25c7a0'),
        new mapPoint('Cozy Inn Chinese Restaurant', 'Restaurant', 42.681,-89.026, true,'4c0ae428340720a1fc4e8793'),
        new mapPoint('Hacienda Real Mexican Restaurant', 'Restaurant', 42.716,-88.995, true, '4bc8b21e0050b713d5f1ba3b'),
        new mapPoint('ORiley and Conways Irish Pub', 'Bar', 42.681,-89.026, true , '4c3f18086faac9b663140f76'),
        new mapPoint('HHFFRRRGGH Inn', 'Bar', 42.669,-88.962, true, '4db7047ca86e8d2707b77ddf'),
        new mapPoint('JPAC', 'Entertainment', 42.685,-89.013, true, '4bdb74fc3904a59391924a9e'),
        new mapPoint('Janesville Ice Arena', 'Entertainment', 42.676,-89.013, true, '4b92d1acf964a520b01e34e3'),
        new mapPoint('Wildwood Movies 16', 'Entertainment', 42.718,-88.979, true, '4b93fffcf964a520326034e3'),
        new mapPoint('Palmer Park', 'Park', 42.673,-88.998, true, '4cb9d1964495721e04964c7a'),
        new mapPoint('Rotary Botanical Garden', 'Park', 42.672,-89.001, true, '4bddd91bffdec92876ace6a1'),
        new mapPoint('Riverside Park', 'Park', 42.712,-89.041, true, '4cdb22c95aeda1cd8a1cbb11'),
        ]);
	
	self.filterText = ko.observable('');
		
	// Selecting markers through the listview still in operation
	self.listClick = function(mapPoint) {
		mapPoint.openInfoWindow();
	};
	
	self.filterMapPoints = ko.computed(function() {
		var filterTextClean = self.filterText().toLowerCase();

		for (var i=0; i < self.mapPoints().length; i++) {
			if(self.mapPoints()[i].name.toLowerCase().indexOf(filterTextClean) !== -1){
				// Show this Location
				self.mapPoints()[i].updateShow(true);
			}else{
				// Hide this location
				self.mapPoints()[i].updateShow(false);
			}
		}
	}, myViewModel);
}

ko.applyBindings(new myViewModel());
//All that only took one month :-O

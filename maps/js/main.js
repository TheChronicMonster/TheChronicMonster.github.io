//TODO: Prettify with CSS

//TODO: Implement a third party API that adds content to infoWindow

//TODO: Implement graceful failures

// If there is one thing this project has taught me it is that
// Scope Matters

var map = new google.maps.Map(document.getElementById('map-canvas'), 
{
    zoom: 13,
    center: new google.maps.LatLng(42.692,-89.009),
	disableDefaultUI: true
});

// Google map fail statement
if (typeof google != ('object')) {
	$('#map-canvas').append("<h1>Unable to load the map. Please try again.</h1>");
}

var infoWindow = new google.maps.InfoWindow({ content:"stuff" });


// mapPoint object to hold information about a map point.
function mapPoint(name, type, lat, long, show) {
	var self = this;
	self.name = name;
	self.type = type;
	self.show = ko.observable(show);
	self.lat = ko.observable(lat);
	self.long = ko.observable(long);
	self.latLng = new google.maps.LatLng(lat, long);

	self.marker = new google.maps.Marker({
		position: self.latLng,
		title: name,
		map: map,
		draggable: false
	});

	self.openInfoWindow = function(){
		// Create the new info window and populate with information
		infoWindow.setContent(getInfoWindowContent());
		infoWindow.open(map,self.marker);
		
		// set the center of the map to the location of the marker clicked
		map.setCenter(self.latLng);
	};
	
	google.maps.event.addListener(self.marker, 'click', self.openInfoWindow);
	
	self.updateShow = function(show){
		self.show(show);
		if(show){
			self.marker.setMap( map );
		}else{
			self.marker.setMap( null );
		}
	};
	
	function getInfoWindowContent(){
		var returnName = "Name : " + name;

		return returnName + "<br> " + "stuff";
		// add an ajax call from wikipedia add to content
	}
}	


function myViewModel() {
	var self = this;
	
	self.mapPoints = ko.observableArray([
        new mapPoint('Citrus Cafe', 'Restaurant', 42.680,-89.019, true),
        new mapPoint('Cozy Inn Chinese Restaurant', 'Restaurant', 42.681,-89.026, true),
        new mapPoint('Hacienda Real Mexican Restaurant', 'Restaurant', 42.716,-88.995, true),
        new mapPoint('ORiley and Conways Irish Pub', 'Bar', 42.681,-89.026, true),
        new mapPoint('HHFFRRRGGH Inn', 'Bar', 42.669,-88.962, true),
        new mapPoint('JPAC', 'Entertainment', 42.685,-89.013, true),
        new mapPoint('Janesville Ice Arena', 'Entertainment', 42.676,-89.013, true),
        new mapPoint('Wildwood Movies 16', 'Entertainment', 42.718,-88.979, true),
        new mapPoint('Palmer Park', 'Park', 42.673,-88.998, true),
        new mapPoint('Rotary Botanical Garden', 'Park', 42.672,-89.001, true),
        new mapPoint('Riverside Park', 'Park', 42.712,-89.041, true),
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

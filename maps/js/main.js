// mapPoint object to hold information about a map point.
function mapPoint(name, type, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        draggable: false
    });
	
	function setMap(map){ 
		marker.setMap( map );
	};
}

var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 13,
    center: new google.maps.LatLng(42.692,-89.009)
});


function myViewModel() {
	this.mapPoints = ko.observableArray([
        new mapPoint('Citrus Cafe', 'Restaurant', 42.680,-89.019),
        new mapPoint('Cozy Inn Chinese Restaurant', 'Restaurant', 42.681,-89.026),
        new mapPoint('Hacienda Real Mexican Restaurant', 'Restaurant', 42.716,-88.995),
        new mapPoint('ORiley and Conways Irish Pub', 'Bar', 42.681,-89.026),
        new mapPoint('HHFFRRRGGH Inn', 'Bar', 42.669,-88.962),
        new mapPoint('JPAC', 'Entertainment', 42.685,-89.013),
        new mapPoint('Janesville Ice Arena', 'Entertainment', 42.676,-89.013),
        new mapPoint('Wildwood Movies 16', 'Entertainment', 42.718,-88.979),
        new mapPoint('Palmer Park', 'Park', 42.673,-88.998),
        new mapPoint('Rotary Botanical Garden', 'Park', 42.672,-89.001),
        new mapPoint('Riverside Park', 'Park', 42.712,-89.041),
        ]);

	this.template = listView.template('<div>#= name #</div>');

ko.bindingHandlers.listView.options = {
	navigatable: true,
	selectable: true,
};
		
	// Sets the map on all markers in the array
	this.setMapOnMapPoints = function(map) {
		for (var i=0; i < this.mapPoints().length; i++) {
			this.mapPoints()[i].setMap(map);
		}
	}

	// Remove markers from map
	this.clearMapPoints = function() {
		this.setMapOnMapPoints(null);
	}

	// Shows markers in array
	this.showMapPoints= function() {
		this.setMapOnMapPoints(map);
		// console.log(showMarkers);
	}

	// Deletes all markers in array
	this.deleteMapPoints= function() {
		this.clearMapPoints();
		this.mapPoints().removeAll();
	}
}

ko.applyBindings(new myViewModel);

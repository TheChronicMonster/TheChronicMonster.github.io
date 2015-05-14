$(document).ready(function() {
	ko.applyBindings(new viewModel());
});

// Sunlight API calls for phrase, state and date range

var query_params = { apikey: '72faea64d51f4306bb541c524f4c4283',
					per_page: 10,
					phrase:"parks",
					state: "",
					start_date: "2015-01-01",
					end_date: "2015-05-01",
					sort:"count desc"

};
console.log("Phrase searched for is " + (query_params.phrase));
console.log("State searched in is " + (query_params.state));
console.log("Start date in year, month, day is " + (query_params.start_date));
console.log("End date in year, month, day is " + (query_params.end_date));

var searchTerm = ko.observable(query_params.phrase);
var searchState = ko.observable(query_params.state);
var searchStartDate = ko.observable(query_params.start_date);
var searchEndDate = ko.observable(query_params.end_date);

var endpoint = "http://capitolwords.org/api/phrases/state.json";

var options = {
	data: query_params,
	type: 'GET',
	dataType: 'jsonp'      
};

var request = jQuery.ajax(endpoint, options).done(showResponse);
var request = jQuery.ajax(endpoint, options).done(assign);

function assign(response) {
		phrase_state = response.results[0].state;
}

var endpoint = "phrases/state.json";

// End API request from Sunlight

// Draw Google Map
var canvas = document.getElementById('map-canvas');
var map = new google.maps.Map(canvas, 
{
    zoom: 4,
    center: new google.maps.LatLng(39.8269332,-98.5792953),
	disableDefaultUI: true,
	observablePhrasesArray: null
});

// Declares infowindow Var
var infowindow = new google.maps.InfoWindow({ });

// Below is the map marker and info window information
// Sets the map on all markers in the array
	this.setMapOnMapPoints = function(map) {
		for (var i=0; i < this.mapPoints().length; i++) {
			this.mapPoints()[i].setMap(map);
		}
	}
	
	// mapPoint object to hold information about a map point.
	function mapPoint(name, type, lat, long) {
		this.name = name;
		this.lat = ko.observable(lat);
		this.long = ko.observable(long);
		
		var latLng = new google.maps.LatLng(lat, long);

		var marker = new google.maps.Marker({
			position: latLng,
			title: name,
			map: map,
			draggable: false
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			// Create the new info window and populate with information
			infowindow.setContent(getInfoWindowContent());
			infowindow.open(map,marker);
			
			// set the center of the map to the location of the marker clicked
			map.setCenter(latLng);
			
			// Update the list view to have highlight
			this.selectedMapPoint(marker);
		});
		
		function setMap(map){ 
			marker.setMap( map );
		};
		
		function getInfoWindowContent(){
			return "Name : " + name;
		};
	}

$(document).ready(function(){
	var initMap = function() {
        var myLatLng = {lat: 40.761292, lng: -73.989391};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: myLatLng
        });

        var data = JSON.parse($("#data").html());
        var center = null;
        data.forEach(function(entry, idx){
        	var loc = {lat: entry.coords.lat, lng: entry.coords.lng};
        	center = loc;
			var marker = new google.maps.Marker({
	          position: loc,
	          map: map
	        });        	
        });

        if(center !== null) {
        	map.setCenter(center);
        }
    }

    initMap();
});
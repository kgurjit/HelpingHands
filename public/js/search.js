$(document).ready(function(){
	var initMap = function() {
        var myLatLng = {lat: 40.761292, lng: -73.989391};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: myLatLng
        });
        var infoWindow = new google.maps.InfoWindow();

        var data = JSON.parse($("#data").html());
        var center = null;
        data.forEach(function(entry, idx){
        	var loc = {lat: entry.latitude, lng: entry.longitude};
        	center = loc;
			var marker = new google.maps.Marker({
	          position: loc,
	          map: map,
              title: entry.title
	        });        	

            (function (marker, entry) {

                
var mapContent = "<div style = 'width:200px;min-height:40px'>" + 
                   "<div><b>" + entry.title + "</b></div>" + "<hr>" + 
                   "<div><b>" + entry.address + "</b></div>" + 
                   "<div><b>" + entry.city + ", " + entry.state + " " + entry.zipCode + "</b></div>" +
                   "<a class='map-link' href='listing?id=" + entry.id + "'>Listing Details</a>" + 
                   "</div>"

                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(mapContent);
                    infoWindow.open(map, marker);
                });
            })(marker, entry); 
        });

        if(center !== null) {
        	map.setCenter(center);
        }    
    }

    initMap();
});
// Replace YOUR_API_KEY with your Google Maps API key
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 13,
  });
}

document.getElementById("search-button").addEventListener("click", function() {
  var location = document.getElementById("location-input").value;
  var keyword = document.getElementById("keyword-input").value;

  // Use the Google Places API to search for restaurants based on the location and keyword
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(
    {
      query: keyword,
      location: location,
      radius: "500",
      type: ["restaurant"],
    },
    function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Remove any existing markers from the map
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        // Add markers for each restaurant to the map
        var markers = [];
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
          });
          markers.push(marker);
        }
      }
    }
  );
});

/*
    Assignment #4
    {Celeste Trahan}
*/

$(document).ready(function() {
   var a = document.getElementById("locationhere");
   var Latitude = localStorage.getItem("latitude");
   var Longitude = localStorage.getItem("longitude");

   if (Longitude && Latitude) { 

    a.innerHTML += 
    "Latitude: " + Latitude + "Longitude: " + Longitude;
   }

   else {
    a.innerHTML += "Welcome User";
   }

   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
   }

   else {
    a.innerHTML = "Geolocation cannot be retrieved"; 
   }

function position(position) {
    var latitudeNow = position.coords.latitude;
    var longitudeNow = position.coords.longitude;
}

a.innerHTML +=
"Latitude: " + latitudeNow + "Longitude: " + longitudeNow;

localStorage.setItem("latitude", position.coords.latitude);
localStorage.setItem("longitude", position.coords.longitude);

if (Longitude && Latitude) {
    var distance = calcDistance(
        Longitude, Latitude, longitudeNow, latitudeNow
    );

    a.innerHTML +=
    "Distance between locations is: " + distance; 
}

$("#location").on("click", function() {
    try {
        if (Modernizr.geolocation) {
            currentLocationDiv.innerHTML = "Retrieving Location";
            navigator.geolocation.getCurrentPosition(success, fail);
        } 
        else {
            console.log("Geolocation cannot be retrieved");
        }

     } catch {
            currentLocationDiv.innerHTML = err;
        }
    });

$("#distance").on("click", function() {
    let lat1 = Latitude;
    let lon1 = Longitude;
    let lat2 = latitudeNow;
    let lon2 = longitudeNow;
});

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});



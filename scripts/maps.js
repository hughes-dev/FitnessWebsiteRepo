// Initialize and add the map
function initMap() {
    // The location of the user (this example uses a default location)
    const defaultLocation = { lat: -34.397, lng: 150.644 };

    // The map, centered at the user's location
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: defaultLocation,
    });

    // Try HTML5 geolocation to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(currentLocation);

                // uses the Places library to look for nearby gyms
                const request = {
                    location: currentLocation,
                    radius: '50000', // Search within a 50km radius
                    type: ['gym'], // Looking specifically for gyms
                };

                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (let i = 0; i < results.length; i++) {
                            createMarker(results[i], map);
                        }
                    }
                });
            },
            () => {
                // User did not allow location sharing or there was an error in getting the location
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

// Error handler for geolocation issues
function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : 'Error: Your browser doesn\'t support geolocation.'
    );
    infoWindow.open(map);
}

// Create a marker for each place found
function createMarker(place, map) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, 'click', () => {
        const infowindow = new google.maps.InfoWindow();
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
    });

    addToSidebar(place);
}

// add a place entry to the sidebar
function addToSidebar(place) {
    const sidebar = document.getElementById('sidebar');
    const placeDiv = document.createElement('div');
    placeDiv.classList.add('place-entry'); // Optional: for styling

    placeDiv.innerHTML = `
        <h3>${place.name}</h3>
        <p>${place.vicinity}</p>
        <!-- You can add more details that you get from the 'place' object -->
    `;

    // Optional: Add a click listener to focus the map on the clicked place
    placeDiv.addEventListener('click', () => {
        map.setCenter(place.geometry.location);
        map.setZoom(15); // Optional: Change zoom level when a place is clicked
    });

    sidebar.appendChild(placeDiv);
}

// Load the `initMap` function once the page's script loads
google.maps.event.addDomListener(window, 'load', initMap);

// Function to load the Google Maps script asynchronously
function loadScript() {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.async = true;
    script.defer = true;

    // // Attach your callback function to the `window` object
    // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBXzFKdrKoOzsqbJXDDN4UKUISqQcW8KW8&callback=initMap`;

    // // Append the 'script' element to 'head'
    // document.head.appendChild(script);
}

// Trigger script loading once the window has fully loaded
window.onload = loadScript;

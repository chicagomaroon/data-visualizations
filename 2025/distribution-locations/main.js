// Global variables for map and infoWindow
let map;
let infoWindow;

// Initialize the map
function initMap() {
    // Create the map centered at an arbitrary location (update as needed)
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 41.79, lng: -87.59 },
        mapTypeId: 'terrain'
    });

    // Create a single info window to be reused
    infoWindow = new google.maps.InfoWindow();

    // Parse the CSV file
    Papa.parse('locations.csv', {
        download: true,
        header: true, // Use first row as header
        complete: function (results) {
            // Loop over each row in the CSV
            results.data.forEach((row) => {
                // Convert latitude and longitude to float values
                let lat = parseFloat(row['Latitude']);
                let lng = parseFloat(row['Longitude']);

                // Create an <img> element for the SVG
                const img = document.createElement('img');
                img.src = 'maroon_logo_m_black.svg';
                img.style.width = '32px';
                img.style.height = '32px';

                // Create an AdvancedMarkerElement using the image
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: lat, lng: lng },
                    map: map,
                    title: row['Name'],
                    content: img
                });

                // Create the content for the info window with building name and address
                let content = `
        <div>
             <h3>${row['Name']}</h3>
            <p><strong>Address:</strong> ${row['Location']}</p>
             ${
                 row['Comment']
                     ? `<p><strong>Pick-Up Notes:</strong> ${row['Comment']}</p>`
                     : ''
             }
        </div>
        `;

                // Add a click listener to show the info window when the marker is clicked
                marker.addListener('click', function () {
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                });
            });
        }
    });
}

// Global variables for map and infoWindow
// let map;
// let infoWindow;

// Initialize the map
// function initMap() {
//     // Create the map centered at an arbitrary location (update as needed)
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 14,
//         center: { lat: 41.79, lng: -87.59 },
//         mapId: "43d4870cba142ed7", // Replace this with your actual Map ID
//         mapTypeId: 'terrain'
//     });

//     // Create a single info window to be reused
//     infoWindow = new google.maps.InfoWindow();

//     // Parse the CSV file
//     Papa.parse('locations.csv', {
//         download: true,
// header: true, // Use first row as header
// complete: function (results) {
//     // Loop over each row in the CSV
//     results.data.forEach((row) => {
//         // Convert latitude and longitude to float values
//         let lat = parseFloat(row['Latitude']);
//         let lng = parseFloat(row['Longitude']);

//         // Create an <img> element for the SVG
//         const img = document.createElement('img');
//         img.src = 'maroon_logo_m_black.svg';
//         img.style.width = '32px';
//         img.style.height = '32px';

//         // Create an AdvancedMarkerElement using the image
//         const marker = new google.maps.marker.AdvancedMarkerElement({
//             position: { lat: lat, lng: lng },
//             map: map,
//                     title: row['Name'],
//                     content: img
//                 });

//                 // Create the content for the info window with building name and address
//                 let content = `
//         <div>
//              <h3>${row['Name']}</h3>
//             <p><strong>Address:</strong> ${row['Location']}</p>
//              ${
//                  row['Comment']
//                      ? `<p><strong>Pick-Up Notes:</strong> ${row['Comment']}</p>`
//                      : ''
//              }
// //         </div>
// //         `;

//                 // Add a click listener to show the info window when the marker is clicked
//                 marker.addListener('gmp-click', function () {
//                     infoWindow.setContent(content);
//                     infoWindow.open(map, marker);
//                 });
//             });
//         }
//     });
// }

// main.js (module)
async function initMap() {
    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const map = new Map(document.getElementById('map'), {
        center: { lat: 41.79, lng: -87.59 },
        zoom: 14,
        mapId: '43d4870cba142ed7', // Replace this with your actual Map ID
        mapTypeId: 'terrain'
    });

    const infoWindow = new google.maps.InfoWindow();

    Papa.parse('locations.csv', {
        download: true,
        header: true,
        complete: function (results) {
            results.data.forEach((row) => {
                const lat = parseFloat(row['Latitude']);
                const lng = parseFloat(row['Longitude']);
                if (isNaN(lat) || isNaN(lng)) return;

                const container = document.createElement('div');
                container.style.width = '32px';
                container.style.height = '32px';
                container.style.pointerEvents = 'auto';

                const img = document.createElement('img');
                img.src = 'maroon_logo_m_black.svg';
                img.style.width = '32px';
                img.style.height = '32px';
                img.style.pointerEvents = 'auto';
                container.appendChild(img);
                const marker = new AdvancedMarkerElement({
                    map,
                    position: { lat, lng },
                    title: row['Name'],
                    content: container
                });

                //         const content = `
                //           <div>
                //             <h3>${row["Name"]}</h3>
                //             <p><strong>Address:</strong> ${row["Location"]}</p>
                //             ${
                //               row["Comment"]
                //                 ? `<p><strong>Pick-Up Notes:</strong> ${row["Comment"]}</p>`
                //                 : ""
                //             }
                //           </div>
                //         `;

                //         marker.addEventListener("gmp-click", () => {
                //           infoWindow.setContent(content);
                //           infoWindow.open(map, marker);
                //         });
                //       });
                //     }
                //   });
                // }

                // initMap();

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
                marker.addListener('gmp-click', function () {
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                });
            });
        }
    });
}

initMap();


// main.js (module)
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    const map = new Map(document.getElementById("map"), {
      center: { lat: 41.79, lng: -87.59 },
      zoom: 14,
      mapId: "43d4870cba142ed7", // Replace this with your actual Map ID
      mapTypeId: "terrain"
    });
  
    const infoWindow = new google.maps.InfoWindow();
  
    Papa.parse("locations.csv", {
      download: true,
      header: true,
      complete: function (results) {
        results.data.forEach((row) => {
          const lat = parseFloat(row["Latitude"]);
          const lng = parseFloat(row["Longitude"]);
          if (isNaN(lat) || isNaN(lng)) return;
          
          const container = document.createElement("div");
          container.style.width = "32px";
          container.style.height = "32px";
          container.style.pointerEvents = "auto";
          
          const img = document.createElement("img");
          img.src = "maroon_logo_m_black.svg";
          img.style.width = "32px";
          img.style.height = "32px";
          img.style.pointerEvents = "auto";
          container.appendChild(img);
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat, lng },
            title: row["Name"],
            content: container
});

  // Create the content for the info window with building name and address
                let content = `
        <div>
        <h3>${row['Name']}</h3>
        <p><strong>Address:</strong> ${row['Location']}</p>
        ${row['Comment'] ? `<p><strong>Pick-Up Notes:</strong> ${row['Comment']}</p>` : ''}
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
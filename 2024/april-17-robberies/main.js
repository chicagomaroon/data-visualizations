function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

let incidents = [
    {
        comments:
            'A person walking on the sidewalk off-campus was approached by two unknown suspects armed with handguns / The suspects demanded and took property from the victim before fleeing to a waiting black vehicle / CPD case JH229075',
        incident: 'Armed Robbery',
        occurred: '4/17/24 2:52 PM',
        ucpdID: '2024-014256',
        address: '1367 E 56TH ST, CHICAGO, IL, 60637',
        numberOfVictims: 1,
        coords: [41.793261863169704, -87.59233380065463]
    },
    {
        comments:
            'Two people walking on opposite sides of the street were approached by 4 unknown suspects armed with handguns / The suspects demanded and took property from the victims before entering a waiting 4-door black Infiniti and driving off',
        incident: 'Armed Robbery',
        occurred: '4/17/24 2:50 PM',
        ucpdID: '24-00373',
        address: '5639 S UNIVERSITY AVE, CHICAGO, IL, 60637',
        numberOfVictims: 2,
        coords: [41.792530411099094, -87.59802463327836]
    }
];
let infoWindow = undefined;
let map = undefined;
let markers = [];
const mapStyles = [
    {
        featureType: 'poi.attraction',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.government',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.medical',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.park',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.school',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.sports_complex',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    }
];

async function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(41.79504513183251, -87.59490984947294),
        mapTypeId: 'terrain',
        styles: mapStyles
    });

    // Get incidents once the map is loaded
    incidents.forEach((incident) => {
        let content = `
            <div id="content">
              <h3 class="incident-title">${incident.incident}</h3>
              <p class="incident-information"><b>Address:</b> ${titleCase(
                  incident.address
              )}</p>
              <p class="incident-information"><b>Time Occurred:</b> ${
                  incident.occurred
              }</p>
              <p class="incident-information"><b>Number of Victims:</b> ${
                  incident.numberOfVictims
              }</p>
              <p class="incident-information"><b>UCPD ID:</b> ${
                  incident.ucpdID
              }</p>
              <p class="incident-information"><b>Description:</b> ${
                  incident.comments
              }</p>
            </div>
        `;

        let marker = new google.maps.Marker({
            title: `${incident.incident} @ ${incident.occurred}`,
            position: new google.maps.LatLng(
                incident.coords[0],
                incident.coords[1]
            ),
            map: map
        });

        // Add an info when a marker is clicked
        marker.addListener('click', () => {
            // If an info window is already open, close it
            if (infoWindow) {
                infoWindow.close();
            }

            infoWindow = new google.maps.InfoWindow({
                content: content,
                ariaLabel: 'Uluru'
            });

            infoWindow.open({
                anchor: marker,
                map
            });
        });

        markers.push(marker);
    });
}

window.initMap = createMap;

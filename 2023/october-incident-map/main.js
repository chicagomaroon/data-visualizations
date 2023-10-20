let map;

const incidents = [
    {
        id: '23-01013',
        comment:
            'Two people walking on the sidewalk were confronted by two unknown suspects, one armed with a knife. The suspects demanded and took property from the victims before entering a Kia Sportage and fleeing',
        type: 'Armed Robbery',
        reported: '2023-10-17 22:36',
        address: '1314 E 58th St, Chicago, IL, 60637',
        coords: [41.789704455282084, -87.59420651132622]
    },
    {
        id: '2023-036751',
        comment:
            'A City parking enforcement employee was threatened by an unknown subject for writing a ticket / Suspect fled but was later located after a brief chase and arrested by CPD / Handgun recovered / CPD case JG467304',
        type: 'Aggravated Assault',
        reported: '2023-10-17 14:41',
        address: '1518 E 53rd St, Chicago, IL, 60615',
        coords: [41.79960733126351, -87.58855032928405]
    },
    {
        id: '2023-036721',
        comment:
            "An unknown suspect slashed victim's ear with a knife and fled the station / CPD case JG466932",
        type: 'Aggravated Battery',
        reported: '2023-10-17 10:09',
        address: '850 E 63rd St, Chicago, IL, 60637',
        coords: [41.780490842556254, -87.60423327053617]
    },
    {
        id: '2023-036520',
        comment:
            'Two unknown subjects, armed with handguns, took property from two victims walking on the sidewalk off campus / Suspects fled to a waiting gray Kia / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-15 20:03',
        address: '5436 S University Ave, Chicago, IL, 60615',
        coords: [41.79742381478519, -87.59820889553676]
    },
    {
        id: '23-01002',
        comment:
            'Two unknown suspects exited a vehicle and fired paint ball pellets at a person walking on the sidewalk / Victim declined medical assistance',
        type: 'Battery',
        reported: '2023-10-15 16:42',
        address: '6101 S University Ave, Chicago, IL, 60637',
        coords: [41.784091916378955, -87.59782954553586]
    },
    {
        id: '2023-036498',
        comment:
            'An unknown suspect snatched a cell phone from the hand of a victim walking on the sidewalk off-campus / The suspect fled to a waiting vehicle that drove off / Referred to CPD',
        type: 'Information / Theft From Person',
        reported: '2023-10-15 16:08',
        address: '5344 S Hyde Park Blvd, Chicago, IL, 60615',
        coords: [41.79894953690367, -87.5841151368409]
    },
    {
        id: '23-00999',
        comment:
            'A person standing on the sidewalk was struck on the leg by a paint ball fired from a passing vehicle / Victim declined medical assistance',
        type: 'Battery',
        reported: '2023-10-14 22:54',
        address: '1105 E 55th St, Chicago, IL, 60615',
        coords: [41.79497578112431, -87.59950810794481]
    },
    {
        id: '2023-036433',
        comment:
            'Two unknown suspects, armed with handguns took property from two victims walking on the sidewalk off-campus / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-14 22:03',
        address: '1121 E 54th Pl, Chicago, IL, 60615',
        coords: [41.79646586292379, -87.59783486713]
    },
    {
        id: '2023-036429',
        comment:
            'Five unknown suspects, armed with handguns, took property from a victim walking on the sidewalk off-campus / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-14 21:44',
        address: '5631 S Kenwood Ave, Chicago, IL, 60637',
        coords: [41.792954506024905, -87.59317504122873]
    },
    {
        id: '2023-036422',
        comment:
            'Five unknown suspects, armed with handguns, took property from three victims walking on the sidewalk off-campus / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-14 20:35',
        address: '5401 S University Ave, Chicago, IL, 60615',
        coords: [41.79791617133316, -87.59806769585981]
    },
    {
        id: '2023-035769',
        comment:
            "Two victim's attempting to secure Divvy bikes off-campus at 53rd & Ellis were surrounded by 7-10 subjects, one of whom displayed a handgun and demanded property / The suspects took the Divvy bikes and fled / CPD case JG457269",
        type: 'Armed Robbery',
        reported: '2023-10-09 18:24',
        address: '1003 E 53rd St, Chicago, IL, 60615',
        coords: [41.79934586261289, -87.60115647184097]
    },
    {
        id: '2023-035432',
        comment:
            'Four unknown suspects, one armed with a handgun, took property from two victims walking on the sidewalk off-campus before fleeing to a waiting vehicle / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-06 22:55',
        address: '5118 S Greenwood Ave, Chicago, IL, 60615',
        coords: [41.80202744914731, -87.59987462688385]
    },
    {
        id: '2023-035429',
        comment:
            'Four unknown suspects, one armed with a handgun, took property from two victims walking on the sidewalk off-campus before fleeing to a waiting vehicle / CPD case',
        type: 'Armed Robbery',
        reported: '2023-10-06 22:34',
        address: '5400 S University Ave, Chicago, IL, 60615',
        coords: [41.79791358328035, -87.59822136750432]
    }
];

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

function createMap(callback) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(41.794295, -87.590701),
        mapTypeId: 'terrain',
        styles: mapStyles
    });

    for (let i = 0; i < incidents.length; i++) {
        let incident = incidents[i];

        let content = `
            <div id="content">
                <h3 style="margin-top:2px; margin-bottom: 8px;">${incident.type}</h3>
                <p style="margin:0; margin-bottom: 2px;">${incident.address}</p>
                <p style="margin:0; margin-bottom: 2px;">${incident.reported} </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: content,
            ariaLabel: 'Uluru'
        });

        let marker = new google.maps.Marker({
            title: `${incident.type} @ ${incident.reported}`,
            position: new google.maps.LatLng(
                incident.coords[0],
                incident.coords[1]
            ),
            map: map
        });

        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                map
            });
        });
    }
}

window.initMap = createMap;

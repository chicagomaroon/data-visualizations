let map;

function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const incidents = [
    {
        comments:
            'Two unknown suspects exited a vehicle and fired paint ball pellets at a person walking on the sidewalk / Victim declined medical assistance',
        incident: 'Battery',
        occurred: '10/15/23 4:40 PM',
        ucpd_id: '23-01002',
        address: '6101 S UNIVERSITY AVE, CHICAGO, IL, 60637',
        coords: [41.784091916378955, -87.59782954553586]
    },
    {
        comments:
            'A person standing on the sidewalk was struck on the leg by a paint ball fired from a passing vehicle / Victim declined medical assistance',
        incident: 'Battery',
        occurred: '10/14/23 10:45 PM',
        ucpd_id: '23-00999',
        address: '1105 E 55TH ST, CHICAGO, IL, 60615',
        coords: [41.79497578112431, -87.59950810794481]
    },
    {
        comments:
            "Two victim's attempting to secure Divvy bikes off-campus at 53rd & Ellis were surrounded by 7-10 subjects, one of whom displayed a handgun and demanded property / The suspects took the Divvy bikes and fled / CPD case JG457269",
        incident: 'Armed Robbery',
        occurred: '10/9/23 6:00 PM',
        ucpd_id: '2023-035769',
        address: '1003 E 53RD ST, CHICAGO, IL, 60615',
        coords: [41.79934586261289, -87.60115647184097]
    },
    {
        comments:
            'Four unknown suspects, one armed with a handgun, took property from two victims walking on the sidewalk off-campus before fleeing to a waiting vehicle / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/6/23 10:30 PM',
        ucpd_id: '2023-035429',
        address: '5400 S UNIVERSITY AVE, CHICAGO, IL, 60615',
        coords: [41.79791358328035, -87.59822136750432]
    },
    {
        comments:
            'Four unknown suspects, one armed with a handgun, took property from two victims walking on the sidewalk off-campus before fleeing to a waiting vehicle / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/6/23 10:40 PM',
        ucpd_id: '2023-035432',
        address: '5118 S GREENWOOD AVE, CHICAGO, IL, 60615',
        coords: [41.80202744914731, -87.59987462688385]
    },
    {
        comments:
            'Two unknown subjects, armed with handguns, took property from two victims walking on the sidewalk off campus / Suspects fled to a waiting gray Kia / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/15/23 8:00 PM',
        ucpd_id: '2023-036520',
        address: '5436 S UNIVERSITY AVE, CHICAGO, IL, 60615',
        coords: [41.79742381478519, -87.59820889553676]
    },
    {
        comments:
            'Five unknown suspects, armed with handguns, took property from three victims walking on the sidewalk off-campus / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/14/232 7:45 PM',
        ucpd_id: '2023-036422',
        address: '5401 S UNIVERSITY AVE, CHICAGO, IL, 60615',
        coords: [41.79791617133316, -87.59806769585981]
    },
    {
        comments:
            'Five unknown suspects, armed with handguns, took property from a victim walking on the sidewalk off-campus / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/14/23 9:25 PM',
        ucpd_id: '2023-036429',
        address: '5631 S KENWOOD AVE, CHICAGO, IL, 60637',
        coords: [41.792954506024905, -87.59317504122873]
    },
    {
        comments:
            'Two unknown suspects, armed with handguns took property from two victims walking on the sidewalk off-campus / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/14/23 9:55 PM',
        ucpd_id: '2023-036433',
        address: '1121 E 54TH PL, CHICAGO, IL, 60615',
        coords: [41.79646586292379, -87.59783486713]
    },
    {
        comments:
            'Two people walking on the sidewalk were confronted by two unknown suspects, one armed with a knife. The suspects demanded and took property from the victims before entering a Kia Sportage and fleeing',
        incident: 'Armed Robbery',
        occurred: '10/17/23 10:15 PM',
        ucpd_id: '23-01013',
        address: '1314 E 58TH ST, CHICAGO, IL, 60637',
        coords: [41.789704455282084, -87.59420651132622]
    },
    {
        comments:
            'A City parking enforcement employee was threatened by an unknown subject for writing a ticket / Suspect fled but was later located after a brief chase and arrested by CPD / Handgun recovered / CPD case JG467304',
        incident: 'Aggravated Assault',
        occurred: '10/17/23 2:35 PM',
        ucpd_id: '2023-036751',
        address: '1518 E 53RD ST, CHICAGO, IL, 60615',
        coords: [41.79960733126351, -87.58855032928405]
    },
    {
        comments:
            "An unknown suspect slashed victim's ear with a knife and fled the station / CPD case JG466932",
        incident: 'Aggravated Battery',
        occurred: '10/17/23 10:05 AM',
        ucpd_id: '2023-036721',
        address: '850 E 63RD ST, CHICAGO, IL, 60637',
        coords: [41.780490842556254, -87.60423327053617]
    },
    {
        comments:
            'Victim standing at off-campus bus stop / Two unknown suspects pushed victim, took cell phone and ran to a waiting vehicle / CPD case',
        incident: 'Robbery',
        occurred: '10/19/23 6:05 PM',
        ucpd_id: '2023-037112',
        address: '1606 E HYDE PARK BLVD, CHICAGO, IL, 60615',
        coords: [41.802553501970664, -87.58630487544768]
    },
    {
        comments:
            "Four people walking on the sidewalk off-campus were approached by five unknown suspects who exited a dark sedan / One suspect was armed with a handgun / Suspects took victims' property before fleeing back to the car / CPD case JG470643",
        incident: 'Armed Robbery',
        occurred: '10/19/23 8:20 PM',
        ucpd_id: '2023-037117',
        address: '5430 S KENWOOD AVE, CHICAGO, IL, 60637',
        coords: [41.79713500717361, -87.59354286101262]
    },
    {
        comments:
            'Two people walking on the sidewalk off-campus confronted by four suspects armed with handguns who took property from the victims before fleeing to a waiting dark sedan / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/19/23 11:15 PM',
        ucpd_id: '2023-037134',
        address: '5404 S KIMBARK AVE, CHICAGO, IL, 60615',
        coords: [41.79784603876262, -87.59506588222541]
    },
    {
        comments:
            'Two people walking on the sidewalk off-campus confronted by five suspects armed with handguns who took property from the victims before fleeing to a waiting dark sedan / CPD case',
        incident: 'Armed Robbery',
        occurred: '10/19/23 11:20 PM',
        ucpd_id: '2023-037137',
        address: '5200 S DREXEL AVE, CHICAGO, IL, 60615',
        coords: [41.80041601480445, -87.60401346961848]
    },
    {
        comments:
            'Delayed report - A person reported that unknown subjects fired paintballs from a passing vehicle striking him on the arm / No injuries reported / Referred to CPD',
        incident: 'Information / Battery',
        occurred: '10/12/23 10:00 PM',
        ucpd_id: '2023-036919',
        address: '1174 E 55TH ST, CHICAGO, IL, 60615',
        coords: [41.79511856384759, -87.5970483970591]
    },
    {
        comments:
            'Two people walking on the sidewalk off-campus were confronted by two unknown suspects armed with handguns / Suspects took property and fled in a waiting van / CPD report',
        incident: 'Armed Robbery',
        occurred: '10/22/23 12:30 AM',
        ucpd_id: '2023-037395',
        address: '5100 S DREXEL AVE, CHICAGO, IL, 60615',
        coords: [41.80158342072995, -87.6040464619274]
    },
    {
        comments:
            'While walking with a group of people off-campus, two people were struck by paintballs fired from a passing vehicle / Medical attention declined / CPD case',
        incident: 'Battery',
        occurred: '10/22/23 12:50 AM',
        ucpd_id: '2023-037398',
        address: '5514 S BLACKSTONE AVE, CHICAGO, IL, 60637',
        coords: [41.79454468839313, -87.59039905133166]
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

function createMap() {
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
                <h3 style="margin-top:2px; margin-bottom: 8px;">${
                    incident.incident
                }</h3>
                <p style="margin:0; margin-bottom: 2px;">${titleCase(
                    incident.address
                )}</p>
                <p style="margin:0; margin-bottom: 2px;">${
                    incident.occurred
                } </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: content,
            ariaLabel: 'Uluru'
        });

        let marker = new google.maps.Marker({
            title: `${incident.type} @ ${incident.occurred}`,
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

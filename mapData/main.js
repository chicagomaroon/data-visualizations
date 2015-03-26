/* ============================================================
  MAIN.JS
============================================================ */

/* Initialize all of the variables for the page.  These are outside of the document.ready function because: 1) They don't depend on the page having loaded to be initizalized properly, and 2) They are used by functions outside of the document.ready function, so their scope needs to be the entire document. */
var rawData = [];
var dateUpdated;
var jsonData;
var map;
var infos = [];
var crimesCounter;
var data = [];
var crimeCounter;
var latlons;

/* Beginning of document.ready function. */
$(document).ready(function () {

    /* Get raw JSON data from the City of Chicago's data portal.  This is by far the slowest step of the loading process. Variable jsonData to rawData conversion is necessary because JSON comes back as one array.  Variable rawData is that single array unpacked. Lastly, turn off the modal (loading indicator) that has been on because the page has now finished loading. Of course, it hasn't techincally finished loading, but the overwhelming majority of loading time is taken up by this one task, (JSON data retrieval from the City's website) and the remaining loading tasks take a fraction of a second. */
    jsonData = $.getJSON('http://localhost:8888/dev-files/raw-data.json', function () {
        rawData = jsonData['responseJSON'];
        callback();
    })
    var dateJSONData = $.getJSON('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$select=date&$limit=1&$order=date%20DESC&$$app_token=WAGToj317sbZqJNaVrNhejlqa', function () {
        dateUpdated = dateJSONData['responseJSON'][0]['date'];
        $('.current-through').text('Current though ' + formatDateNoTime(dateUpdated));
    })

    $('#graph-1').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Violent Crimes Near the University of Chicago'
        },
        xAxis: {
            categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Crimes Reported'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        credits: {
            enabled: true,
            text: 'Source: City of Chicago',
            href: 'https://data.cityofchicago.org/',
        },
        series: [{
            name: 'Homicide',
            data: [3, 3, 0, 5, 5, 8, 2, 4, 6, 1, 5, 2, 2, 3],
            color: 'red'
        }, {
            name: 'Sexual assault',
            data: [30, 26, 25, 35, 26, 31, 22, 19, 16, 14, 17, 20, 20, 16],
            color: 'orange'
        }, {
            name: 'Assault',
            data: [84, 81, 67, 77, 72, 70, 76, 56, 59, 40, 46, 53, 28, 22],
            color: 'green'
        }, {
            name: 'Battery',
            data: [137, 122, 106, 110, 120, 104, 104, 92, 84, 65, 69, 65, 51, 60],
            color: 'lime'
        }, {
            name: 'Robbery',
            data: [307, 267, 298, 323, 340, 281, 309, 213, 223, 166, 197, 185, 147, 162],
            color: 'yellow'
        }]
    });

    $('#graph-2').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Property Crimes Near the University of Chicago'
        },
        xAxis: {
            categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Crimes Reported'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        credits: {
            enabled: true,
            text: 'Source: City of Chicago',
            href: 'https://data.cityofchicago.org/',
        },
        series: [{
            name: 'Arson',
            data: [8, 6, 8, 5, 9, 6, 2, 2, 0, 4, 5, 2, 2, 0],
            color: 'brown'
        }, {
            name: 'Burglary',
            data: [283, 309, 455, 410, 481, 511, 317, 272, 302, 313, 286, 240, 229, 196],
            color: 'blue'
        }, {
            name: 'Motor vehicle theft',
            data: [401, 357, 324, 394, 395, 291, 283, 233, 211, 243, 217, 168, 135, 123],
            color: 'gray'
        }, {
            name: 'Theft',
            data: [1809, 1727, 1736, 1710, 1596, 1160, 1340, 1155, 1166, 1231, 1200, 1147, 1073, 877],
            color: 'purple'
        }]
    });

    $('#graph-3').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Drug Crimes Near the University of Chicago'
        },
        xAxis: {
            categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Crimes Reported'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        credits: {
            enabled: true,
            text: 'Source: City of Chicago',
            href: 'https://data.cityofchicago.org/',
        },
        series: [{
            name: 'Other',
            data: [4, 4, 3, 2, 5, 5, 6, 11, 3, 5, 4, 8, 4, 7],
            color: '#E500FF'
        }, {
            name: 'Cocaine',
            data: [3, 5, 6, 4, 5, 3, 2, 3, 2, 4, 4, 0, 1, 1],
            color: '#FFA07A'
        }, {
            name: 'Heroin',
            data: [13, 17, 9, 11, 10, 19, 10, 24, 14, 24, 15, 11, 9, 7],
            color: '#3EB278'
        }, {
            name: 'Crack cocaine',
            data: [66, 56, 45, 39, 29, 34, 42, 34, 20, 18, 15, 8, 8, 1],
            color: '#FF69B4'
        }, {
            name: 'Cannabis',
            data: [158, 152, 139, 197, 167, 130, 187, 167, 196, 230, 195, 115, 72, 78],
            color: 'aqua'
        }]
    });
})
/* End of document.ready function. */

function callback() {
    initialize();
    refreshCrimeCounts(2001);
    $('.modal').toggle();
    /* Initizalize each specialized crime count based on the FBI code, except for drug crimes (which all have the FBI code of 18) -- initialize them using the HTML value attribute as the identifier instead. */
    $('.crime-count:not(.category-count').each(function (i, val) {
        if ($(val).attr('data-code') !== '18')
            $(val).text(' (' + crimeCounter[$(val).attr('data-code')] + ')');
        else
            $(val).text(' (' + crimeCounter[$(val).attr('value')] + ')');
    })

    /* Initialize crime totals for each of the three categories.  Drug crimes are all grouped under the same FBI code (18), so the text of the description is used to differential between the different subtypes of drug crimes. */
    $('.category-count.property').text(' (' + (crimeCounter['05'] + crimeCounter['06'] + crimeCounter['07'] + crimeCounter['09']) + ')');
    $('.category-count.violent').text(' (' + (crimeCounter['01A'] + crimeCounter['02'] + crimeCounter['03'] + crimeCounter['04A'] + crimeCounter['04B']) + ')');
    $('.category-count.narcotics').text(' (' + (crimeCounter['cannabis'] + crimeCounter['crack-cocaine'] + crimeCounter['heroin'] + crimeCounter['cocaine'] + crimeCounter['other-drug-crimes']) + ')');



    google.maps.event.addDomListener(window, 'load', initialize);

    /* Update map and crime counts on year change. */
    $('#year-slider').on('change', function () {
        var selectedYear = $(this).val();
        refresh(selectedYear);
        refreshCrimeCounts(selectedYear);
    })

    /* Update year label in response to year change OR mousemove, meaning that the year will cahnge with the mouse even if that year is never selected. (This is what differentiates this function from the one above and is why these two functions cannot be consolidated. */
    $('#year-slider').on('change mousemove', function () {
        var selectedYear = $(this).val();
        $('label[for="year-slider"]').text(selectedYear);
        var yearsToLeftPixels = {
            2001: "0",
            2002: "9px",
            2003: "24px",
            2004: "39px",
            2005: "54px",
            2006: "69px",
            2007: "84px",
            2008: "99px",
            2009: "114px",
            2010: "131px",
            2011: "145px",
            2012: "161px",
            2013: "177px",
            2014: "192px",
            2015: "206px"
        }
        $('label[for="year-slider"]').css('left', yearsToLeftPixels[selectedYear])
    })

    /* Update map (but not crime counts) on crime checkboxes selection change. */
    $('input[name="crime-category"]').change(function () {
        var selectedYear = $('#year-slider').val();
        refresh(selectedYear);
    })

}

/* Initizalizes Google Maps canvas. */
function initialize() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.791393, -87.599686),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

/* Determines which color should be used for the crime dot, based on FBI code, then description indexOf drug name.  (All descriptions of drug crimes have 1 or 0 drug names. */
function getStrokeColor(i) {
    if (rawData[i]['fbi_code'] !== '18') { //If the crime is not a drug crime, just access the assoc. array of colors.
        var crimeCodeToColor = {
            '01A': 'red',
            '02': 'orange',
            '03': 'yellow',
            '04A': 'green',
            '04B': 'lime',
            '05': 'blue',
            '06': 'purple',
            '07': 'gray',
            '09': 'brown'
        }
        return crimeCodeToColor[rawData[i]['fbi_code']];
    } else { //It is a drug crime, so color code the dot based on the drug.
        var desc = rawData[i]['description']
        if (desc.indexOf('CANNABIS') > -1) {
            return 'aqua';
        } else if (desc.indexOf('CRACK') > -1) {
            return '#FF69B4';
        } else if (desc.indexOf('HEROIN') > -1) {
            return '#3EB278';
        } else if (desc.indexOf('COCAINE') > -1) {
            return '#FFA07A';
        } else {
            return '#E500FF';
        }
    }
}

/* Zeroes out the crimeCounter object on year or crime selection change. */
function zeroCrimeCounter() {
    crimeCounter = {
        '01A': 0,
        '02': 0,
        '03': 0,
        '04A': 0,
        '04B': 0,
        '05': 0,
        '06': 0,
        '07': 0,
        '09': 0,
        'cannabis': 0,
        'crack-cocaine': 0,
        'heroin': 0,
        'cocaine': 0,
        'other-drug-crimes': 0
    }
}

/* Refresh the crime counts */
function refreshCrimeCounts(year) {
    zeroCrimeCounter();
    for (var i = 0; i < rawData.length; i++) {
        if ((new Date(rawData[i]['date'])).getFullYear() == year) {
            if (rawData[i]['fbi_code'] !== '18')
                crimeCounter[rawData[i]['fbi_code']]++;
            else {
                if (rawData[i]['description'].indexOf('CANNABIS') > -1)
                    crimeCounter['cannabis']++;
                else if (rawData[i]['description'].indexOf('CRACK') > -1)
                    crimeCounter['crack-cocaine']++;
                else if (rawData[i]['description'].indexOf('HEROIN') > -1)
                    crimeCounter['heroin']++;
                else if (rawData[i]['description'].indexOf('COCAINE') > -1)
                    crimeCounter['cocaine']++;
                else
                    crimeCounter['other-drug-crimes']++;
            }

        }
    }
    /* Initizalize each specialized crime count based on the FBI code, except for drug crimes (which all have the FBI code of 18) -- initialize them using the HTML value attribute as the identifier instead. */
    $('.crime-count:not(.category-count').each(function (i, val) {
        if ($(val).attr('data-code') !== '18')
            $(val).text(' (' + crimeCounter[$(val).attr('data-code')] + ')');
        else
            $(val).text(' (' + crimeCounter[$(val).attr('value')] + ')');
    })
    /* Initialize crime totals for each of the three categories.  Drug crimes are all grouped under the same FBI code (18), so the text of the description is used to differential between the different subtypes of drug crimes. */
    $('.category-count.property').text(' (' + (crimeCounter['05'] + crimeCounter['06'] + crimeCounter['07'] + crimeCounter['09']) + ')');
    $('.category-count.violent').text(' (' + (crimeCounter['01A'] + crimeCounter['02'] + crimeCounter['03'] + crimeCounter['04A'] + crimeCounter['04B']) + ')');
    $('.category-count.narcotics').text(' (' + (crimeCounter['cannabis'] + crimeCounter['crack-cocaine'] + crimeCounter['heroin'] + crimeCounter['cocaine'] + crimeCounter['other-drug-crimes']) + ')');

}

/* Main (huge) function.  Processes raw data and refreshes map. */
function refresh(year) {
    var counter1 = 0;
    clearMarkers();
    latlons = {};
    var currentCrimeCodes = determineCurrentCrimeCodes();
    latlons = [];
    data = [];
    crimesCounter = 0;
    for (var i = 0; i < rawData.length; i++) {
        if ((new Date(rawData[i]['date'])).getFullYear() == year) {
            currentCode = rawData[i]['fbi_code'];
            if (currentCode == '18') {
                if (rawData[i]['description'].indexOf('CANNABIS') > -1)
                    currentCode = 'cannabis';
                else if (rawData[i]['description'].indexOf('CRACK') > -1)
                    currentCode = 'crack-cocaine';
                else if (rawData[i]['description'].indexOf('HEROIN') > -1)
                    currentCode = 'heroin';
                else if (rawData[i]['description'].indexOf('COCAINE') > -1)
                    currentCode = 'cocaine';
                else
                    currentCode = 'other-drug-crimes';
            }
            if ($.inArray(currentCode, currentCrimeCodes) !== -1) {
                latlons.push(rawData[i]['latitude'] + ', ' + rawData[i]['longitude']);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(rawData[i]['latitude'], rawData[i]['longitude']),
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 3,
                        strokeColor: getStrokeColor(i)

                    },
                    map: map
                });
                data.push(marker);
                var infowindow = new google.maps.InfoWindow()
                var content = '<span class="primary-type"><strong>' + capitalize(prettifyPrimaryType(rawData[i]['primary_type'].toLowerCase())) + '</strong><br>' + capitalize(prettifyDescription(rawData[i]['description'].toLowerCase())) + '<br>' + formatDate(rawData[i]['date']) + '<span>';

                google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                    return function () {

                        /* close the previous info-window */
                        closeInfos();

                        infowindow.setContent(content);
                        infowindow.open(map, marker);

                        /* keep the handle, in order to close it on next click event */
                        infos[0] = infowindow;

                    };
                })(marker, content, infowindow));
                crimesCounter++;
            }
        }
    }
}

/* Format numerical date to month name, date, and full year, with time. (Not included with JS.) */
function formatDate(string) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date(string);
    return monthNames[date.getMonth()] /*No JS function for name of month.*/ + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + subFormatTime(date.getHours(), date.getMinutes());
}

/* Format numerical date to month name, date, and full year, without time. */
function formatDateNoTime(string) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date(string);
    return monthNames[date.getMonth()] /*No JS function for name of month.*/ + ' ' + date.getDate() + ', ' + date.getFullYear();
}

/* Formats time from 24-hour to 12-hour.  (Not included with JS.) */
function subFormatTime(hours, mins) {
    var convertHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var convertMins = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
    if (mins < 10) //Minutes need two zeros, so must convert mins to string.
        mins = convertMins[mins];
    var ret = convertHours[hours] + ':' + mins;
    var ampm;
    if (hours < 12)
        ampm = 'am';
    else
        ampm = 'pm';
    ret += ampm;
    return ret;
}

/* Converts the ugly description from the City's website to how a human would describe the crime. */
function prettifyDescription(original) {

    var dictionary = {
        'poss: cannabis 30gms or less': 'possession of cannabis, 30 grams or less',
        'poss: pcp': 'possession of PCP',
        'poss: synthetic drugs': 'possession of synthetic drugs',
        'manu/deliver:synthetic drugs': 'manufacture/delivery of synthetic drugs',
        'poss: crack': 'possession of crack cocaine',
        'poss: heroin(white)': 'possession of heroin (white)',
        'manu/deliver: heroin (white)': 'possession of heroin (white)',
        'attempt possession narcotics': 'attempted possession of narcotics',
        'deliver cannabis to person <18': 'delivery of cannabis to person <18',
        'poss: heroin(brn/tan)': 'possession of heroin (brown/tan)',
        'poss: hallucinogens': 'possession of hallucinogens',
        'manu/del:cannabis over 10 gms': 'manufacture/delivery, cannabis, over 10 grams',
        'manu/deliver:crack': 'manufacture/delivery, crack cocaine',
        'manu/deliver: heroin(brn/tan)': 'manufacture/delivery, heroin (brown/tan)',
        'poss: heroin(black tar)': 'possession of heroin (black tar)',
        'poss: barbituates': 'possession of barbituates',
        'poss: amphetamines': 'possession of amphetamines',
        'manu/deliver:cocaine': 'manufacture/delivery, cocaine',
        'attempt possession cannabis': 'attempted possession of cannabis',
        'manu/del:cannabis 10gm or less': 'manufacture/delivery of cannabis, 10 grams or less',
        'pos: hypodermic needle': 'possession of hypodermic needle',
        'poss: cocaine': 'possession of cocaine',
        'poss: cannabis more than 30gms': 'possession of cannabis, more than 30 grams',
        'aggravated:knife/cutting instr': 'aggravated, knife/cutting instrument',
        'sex asslt of child by fam mbr': 'sexual assault of child by family member',
        'agg sex asslt of child fam mbr': 'aggravated sexual assault of child by family member',
        'aggravated: other dang weapon': 'aggravated, other dangerous weapon',
        'aggravated: knife/cut instr': 'aggravated, knife/cutting instrument',
        'att: truck, bus, motor home': 'attempted, truck, bus, motor home',
        'att: automobile': 'attempted automobile',
        'financial id theft:$300 &under': 'financial identity theft, $300 and under',
        'agg: financial id theft': 'aggravated financial identity theft',
        'attempt theft': 'attempted',
        'agg pro.emp: other dang weapon': 'aggravated protected employee, other dangerous weapon',
        'aggravated: other firearm': 'aggravated, other firearm',
        'aggravated po: handgun': 'aggravated police officer, handgun',
        'aggravated: handgun': 'aggravated, handgun',
        'aggravated domestic battery: knife/cutting inst': 'aggravated domestic battery, knife/cutting instrument',
        'aggravated domestic battery: other dang weapon': 'aggravated domestic battery, other dangerous weapon',
        'aggravated po: other dang weap': 'aggravated police officer, other dangerous weappn',
        'agg: hands/fist/feet serious injury': 'aggravated, hands/fist/feet serious injury',
        'agg pro.emp:knife/cutting inst': 'aggravated protected employee, knife/cutting instrument',
        'agg pro emp hands serious inj': 'aggravated protected employee hands serious injury',
        'aggravated po: knife/cut instr': 'aggravated police officer, knife/cutting instrument',
        'agg pro.emp: other firearm': 'aggravated protected employee, other firearm',
        'aggravated po:knife/cut instr': 'aggravated police officer, knife/cutting instrument',
        'agg pro.emp: other firearm': 'aggravated protected employee, other firearm',
        'agg pro.emp: handgun': 'aggravated protected employee, handgun',
        'aggravated po:knife/cut instr': 'aggravated police officer, knife/cutting instrument',
        'attempt: armed-knife/cut instr': 'attempted, armed-knife/cutting instrument',
        'armed: handgun': 'armed, handgun',
        'armed: other dangerous weapon': 'armed, other dangerous weapon',
        'armed:knife/cutting instrument': 'armed, knife/cutting instrument',
        'attempt: armed-handgun': 'attempted, armed-handgun',
        'attempt: strongarm-no weapon': 'attempted, strongarm-no weapon',
        'attempt: armed-other dang weap': 'attempted, armed-other dangerous weapon',
        'attempt: aggravated': 'attempt, aggravated',
        'aggravated: other': 'aggravated, other',
        'attempt agg: knife/cut instr': 'attempted aggravated, knife/cutting instrument',
        'attempt agg: other': 'attempted aggravated, other',
        'attempt agg: handgun': 'attempted aggravated, handgun',
        'theft/recovery: automobile': 'theft/recovery, automobile',
        'theft/recovery: cycle, scooter, bike w-vin': 'theft/recovery, cycle, scooter, bike',
        'cycle, scooter, bike w-vin': 'cycle, scooter, bike',
        'theft/recovery: truck,bus,mhome': 'theft/recovery, truck,bus,motor home',
        'financial id theft: over $300': 'financial identity theft, over $300',
        'armed: other firearm': 'armed, other firearm',
        'aggravated domestic battery: handgun': 'aggravated domestic battery, handgun',
        'aggravated domestic battery: hands/fist/feet serious injury': 'aggravated domestic battery, hands/fist/feet serious injury',
        'attempt forcible entry': 'attempted forcible entry',
        'attempt arson': 'attempted arson',
        'attempt: cycle, scooter, bike w-vin': 'attempted, cycle, scooter, bike w-vin',
        'from coin-op machine/device': 'from coin-operated machine/device',
        'attempt financial identity theft': 'attempted financial identity theft',
        'cycle, scooter, bike no vin': 'cycle, scooter, bike',
        'attempt non-aggravated': 'attempted, non-aggravated',
        'agg po hands etc serious inj': 'aggravated police officer hands etc serious inj',
        'attempt: armed-other firearm': 'attempted, armed-other firearm',
        'aggravated domestic battery: other firearm': 'aggravated domestic battery, other firearm'
    }
    if (dictionary[original] == undefined) {
        return original;
    } else
        return dictionary[original];
}

/* Converts the ugly primary type from the City's website to a more human-friendly format. */
function prettifyPrimaryType(original) {
    var dictionary = {
        'crim sexual assault': 'criminal sexual assault'
    }
    if (dictionary[original] == undefined) {
        return original;
    } else
        return dictionary[original];
}
/* Capitalizes the (alreadly-converted to lowercase) text. */
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

/* Cloase info boxes.  This is a bit of a hack -- Google Maps API doesn't have a mulitple-tooltips-per-map functinality built in. */
function closeInfos() {

    if (infos.length > 0) {

        /* detach the info-window from the marker ... undocumented in the API docs */
        infos[0].set("marker", null);

        /* and close it */
        infos[0].close();

        /* blank the array */
        infos.length = 0;
    }
}

/* Set all tooltip points on map. */
function setAllMap(map) {
    for (var i = 0; i < data.length; i++) {
        data[i].setMap(map);
    }
}
/* New functions to deal with finding duplicate points. */
function getDuplicateLatLons() {
    var counts = {}
    latlons.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
}

function determineCurrentCrimeCodes() {
    var arrOfCodes = [];
    $('input[name="crime-category"]:checked').each(
        function (index, value) {
            if ($(value).attr('data-code') !== '18')
                arrOfCodes.push($(value).attr('data-code'));
            else
                arrOfCodes.push($(value).attr('value'))

        }
    )
    return arrOfCodes;
}

function clearMarkers() {
    setAllMap(null);
}
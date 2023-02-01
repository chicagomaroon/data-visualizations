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
var duplicateLatLons;

/* Beginning of document.ready function. */
$(document).ready(function () {
    /* Only load map stuff if window width is big enough. */
    if ($(window).width() >= 100) {
        /* Get raw JSON data from the City of Chicago's data portal.  This is by far the slowest step of the loading process. Variable jsonData to rawData conversion is necessary because JSON comes back as one array.  Variable rawData is that single array unpacked. Lastly, turn off the modal (loading indicator) that has been on because the page has now finished loading. Of course, it hasn't techincally finished loading, but the overwhelming majority of loading time is taken up by this one task, (JSON data retrieval from the City's website) and the remaining loading tasks take a fraction of a second. */
        jsonData = $.getJSON(
            'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$select=date,%20primary_type,description,fbi_code,latitude,longitude&$where=(fbi_code=%2701A%27%20or%20fbi_code=%2702%27%20or%20fbi_code=%2703%27%20or%20fbi_code=%2704A%27%20or%20fbi_code=%2704B%27%20or%20fbi_code=%2705%27%20or%20fbi_code=%2706%27%20or%20fbi_code=%2707%27%20or%20fbi_code=%2709%27%20or%20fbi_code=%2718%27)%20AND%20(latitude%20%3E%2041.780286%20AND%20latitude%20%3C%2041.809772)%20AND%20(longitude%20%3E%20-87.606040%20and%20longitude%20%3C%20-87.568306)%20AND%20year=2016&$limit=50000&$$app_token=WAGToj317sbZqJNaVrNhejlqa',
            function () {
                rawData = jsonData['responseJSON'];
                callback();
            }
        );
        var dateJSONData = $.getJSON(
            'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$select=date&$limit=1&$order=date%20DESC&$$app_token=WAGToj317sbZqJNaVrNhejlqa',
            function () {
                dateUpdated = dateJSONData['responseJSON'][0]['date'];
                $('.current-through').text(
                    'Crime reports for 2016 are current though ' +
                        formatDateNoTime(dateUpdated) +
                        '.'
                );
            }
        );

        $('#map-faq-btn').click(function (event) {
            if ($(this).hasClass('text-hidden')) {
                $('.map-faq-text').show();
                $('#map-faq-btn').text('Less info');
            } else {
                $('.map-faq-text').hide();
                $('#map-faq-btn').text('More info');
            }
            $(this).toggleClass('text-hidden');
            $(this).toggleClass('text-shown');
        });
        $('#map-faq-btn.text-shown').click(function (event) {});
        $(window).resize(function () {
            if ($(window).width() < 10 && $('.map-related').is(':visible'))
                $('.map-related').hide();
        });
    } else {
        $('.map-related').hide();
    }
    /* Loads the initialization code for the threee graphs, which are in the graphs.js file. */
    $.getScript('graphs.js', function () {
        $('tspan:contains("Violent Crimes")').css('font-weight', '600');
    });
    $('.week-year-btn').click(function () {
        $('.week-year-btn').removeClass('active');
        $(this).addClass('active');
        refreshCrimeCounts(2016);
        refresh(2016);
    });
});
/* End of document.ready function. */

function callback() {
    initialize();
    refreshCrimeCounts(2016);
    if ($(window).width() <= 767) {
        $('input[name="crime-category"]').prop('checked', true); //.not('input[name="crime-category"][value="theft"], input[name="crime-category"][value="robbery"]')
        $('.all-2016').removeClass('active');
        $('.this-week').addClass('active');
        $('#panel-container').css('display', 'none');
    } else {
        $('input[name="crime-category"][value="homicide"]').prop(
            'checked',
            true
        );
    }
    $('input[name="crime-category"]').trigger('change');
    $('.modal').toggle();
    /* Initizalize each specialized crime count based on the FBI code, except for drug crimes (which all have the FBI code of 18) -- initialize them using the HTML value attribute as the identifier instead. */
    $('.crime-count')
        .not('.category-count')
        .each(function (i, val) {
            if ($(val).attr('data-code') !== '18')
                $(val).text(
                    ' (' + crimeCounter[$(val).attr('data-code')] + ')'
                );
            else $(val).text(' (' + crimeCounter[$(val).attr('value')] + ')');
        });

    /* Initialize crime totals for each of the three categories.  Drug crimes are all grouped under the same FBI code (18), so the text of the description is used to differential between the different subtypes of drug crimes. */
    $('.category-count.property').text(
        ' (' +
            (crimeCounter['05'] +
                crimeCounter['06'] +
                crimeCounter['07'] +
                crimeCounter['09']) +
            ')'
    );
    $('.category-count.violent').text(
        ' (' +
            (crimeCounter['01A'] +
                crimeCounter['02'] +
                crimeCounter['03'] +
                crimeCounter['04A'] +
                crimeCounter['04B']) +
            ')'
    );
    $('.category-count.narcotics').text(
        ' (' +
            (crimeCounter['cannabis'] +
                crimeCounter['crack-cocaine'] +
                crimeCounter['heroin'] +
                crimeCounter['cocaine'] +
                crimeCounter['other-drug-crimes']) +
            ')'
    );

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addListenerOnce(map, 'idle', function () {
        $('input[name="crime-category"][value="homicide"]').prop(
            'checked',
            true
        );
        $('input[name="crime-category"]').trigger('change');
    });

    /* Update map (but not crime counts) on crime checkboxes selection change. */
    $('input[name="crime-category"]').change(function () {
        var selectedYear = 2016;
        refresh(selectedYear);
    });
}

/* Initizalizes Google Maps canvas. */
function initialize() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.791393, -87.599686),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(
        document.getElementById('map-canvas'),
        mapOptions
    );
}

/* Determines which color should be used for the crime dot, based on FBI code, then description indexOf drug name.  (All descriptions of drug crimes have 1 or 0 drug names. */
function getStrokeColor(i) {
    if (rawData[i]['fbi_code'] !== '18') {
        //If the crime is not a drug crime, just access the assoc. array of colors.
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
        };
        return crimeCodeToColor[rawData[i]['fbi_code']];
    } else {
        //It is a drug crime, so color code the dot based on the drug.
        var desc = rawData[i]['description'];
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
        cannabis: 0,
        'crack-cocaine': 0,
        heroin: 0,
        cocaine: 0,
        'other-drug-crimes': 0
    };
}

/* Refresh the crime counts */
function refreshCrimeCounts(year) {
    var weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 14);
    zeroCrimeCounter();
    for (var i = 0; i < rawData.length; i++) {
        var isDate = new Date(rawData[i]['date']);
        if (isDate.getFullYear() == year) {
            if (
                (isDate > weekAgoDate &&
                    $('button.this-week').hasClass('active')) ||
                $('button.all-2016').hasClass('active')
            ) {
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
                    else crimeCounter['other-drug-crimes']++;
                }
            }
        }
    }
    /* Initizalize each specialized crime count based on the FBI code, except for drug crimes (which all have the FBI code of 18) -- initialize them using the HTML value attribute as the identifier instead. */
    $('.crime-count')
        .not('.category-count')
        .each(function (i, val) {
            if ($(val).attr('data-code') !== '18')
                $(val).text(
                    ' (' + crimeCounter[$(val).attr('data-code')] + ')'
                );
            else $(val).text(' (' + crimeCounter[$(val).attr('value')] + ')');
        });
    /* Initialize crime totals for each of the three categories.  Drug crimes are all grouped under the same FBI code (18), so the text of the description is used to differential between the different subtypes of drug crimes. */
    $('.category-count.property').text(
        ' (' +
            (crimeCounter['05'] +
                crimeCounter['06'] +
                crimeCounter['07'] +
                crimeCounter['09']) +
            ')'
    );
    $('.category-count.violent').text(
        ' (' +
            (crimeCounter['01A'] +
                crimeCounter['02'] +
                crimeCounter['03'] +
                crimeCounter['04A'] +
                crimeCounter['04B']) +
            ')'
    );
    $('.category-count.narcotics').text(
        ' (' +
            (crimeCounter['cannabis'] +
                crimeCounter['crack-cocaine'] +
                crimeCounter['heroin'] +
                crimeCounter['cocaine'] +
                crimeCounter['other-drug-crimes']) +
            ')'
    );
}

/* Main (huge) function.  Processes raw data and refreshes map. */
function refresh(year) {
    getDuplicateLatLons(year);
    var weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 14);
    //console.log(weekAgoDate)
    var counter1 = 0;
    clearMarkers();
    var currentCrimeCodes = determineCurrentCrimeCodes();
    data = [];
    crimesCounter = 0;
    for (var i = 0; i < rawData.length; i++) {
        var isDate = new Date(rawData[i]['date']);
        if (isDate.getFullYear() == year) {
            //Only continue with crimes committed in the currently-selected year.
            if (
                (isDate > weekAgoDate &&
                    $('button.this-week').hasClass('active')) ||
                $('button.all-2016').hasClass('active')
            )
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
                else currentCode = 'other-drug-crimes';
            }
            if ($.inArray(currentCode, currentCrimeCodes) !== -1) {
                //Only add a point to the map if the crime is currently selected.
                var latLonString =
                    rawData[i]['latitude'] + ', ' + rawData[i]['longitude'];
                var numDuplicates = duplicateLatLons[latLonString];
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        rawData[i]['latitude'],
                        rawData[i]['longitude']
                    ),
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 3,
                        strokeColor: getStrokeColor(i)
                    },
                    map: map
                });
                data.push(marker);
                var infowindow = new google.maps.InfoWindow();
                var content =
                    '<span class="primary-type"><strong>' +
                    capitalize(
                        prettifyPrimaryType(
                            rawData[i]['primary_type'].toLowerCase()
                        )
                    ) +
                    '</strong><br>' +
                    capitalize(
                        prettifyDescription(
                            rawData[i]['description'].toLowerCase()
                        )
                    ) +
                    '<br>' +
                    formatDate(rawData[i]['date']) +
                    '</span>';

                google.maps.event.addListener(
                    marker,
                    'click',
                    (function (marker, content, infowindow) {
                        return function () {
                            /* close the previous info-window */
                            closeInfos();

                            infowindow.setContent(content);
                            infowindow.open(map, marker);

                            /* keep the handle, in order to close it on next click event */
                            infos[0] = infowindow;
                        };
                    })(marker, content, infowindow)
                );
                crimesCounter++;
            }
        }
    }
}

/* Format numerical date to month name, date, and full year, with time. (Not included with JS.) */
function formatDate(string) {
    var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var date = new Date(string);
    return (
        monthNames[date.getMonth()] /*No JS function for name of month.*/ +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear() +
        ' ' +
        subFormatTime(date.getHours(), date.getMinutes())
    );
}

/* Format numerical date to month name, date, and full year, without time. */
function formatDateNoTime(string) {
    var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var date = new Date(string);
    return (
        monthNames[date.getMonth()] /*No JS function for name of month.*/ +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear()
    );
}

/* Formats time from 24-hour to 12-hour.  (Not included with JS.) */
function subFormatTime(hours, mins) {
    var convertHours = [
        5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2,
        3, 4
    ];
    var convertMins = [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09'
    ];
    if (mins < 10)
        //Minutes need two zeros, so must convert mins to string.
        mins = convertMins[mins];
    var ret = convertHours[hours] + ':' + mins;
    var ampm;
    if (hours < 12) ampm = 'am';
    else ampm = 'pm';
    ret += ampm;
    return ret;
}

/* Converts the description from the City's website to how a human would describe the crime. */
function prettifyDescription(original) {
    var ret;
    var dictionary = {
        'poss: cannabis 30gms or less':
            'possession of cannabis, 30 grams or less',
        'poss: pcp': 'possession of PCP',
        'poss: synthetic drugs': 'possession of synthetic drugs',
        'manu/deliver:synthetic drugs':
            'manufacture/delivery of synthetic drugs',
        'poss: crack': 'possession of crack cocaine',
        'poss: heroin(white)': 'possession of heroin (white)',
        'manu/deliver: heroin (white)':
            'manufacture/delivery of heroin (white)',
        'attempt possession narcotics': 'attempted possession of narcotics',
        'deliver cannabis to person <18': 'delivery of cannabis to person <18',
        'poss: heroin(brn/tan)': 'possession of heroin (brown/tan)',
        'poss: hallucinogens': 'possession of hallucinogens',
        'manu/del:cannabis over 10 gms':
            'manufacture/delivery, cannabis, over 10 grams',
        'manu/deliver:crack': 'manufacture/delivery, crack cocaine',
        'manu/deliver: heroin(brn/tan)':
            'manufacture/delivery, heroin (brown/tan)',
        'poss: heroin(black tar)': 'possession of heroin (black tar)',
        'poss: barbituates': 'possession of barbituates',
        'poss: amphetamines': 'possession of amphetamines',
        'manu/deliver:cocaine': 'manufacture/delivery, cocaine',
        'attempt possession cannabis': 'attempted possession of cannabis',
        'manu/del:cannabis 10gm or less':
            'manufacture/delivery of cannabis, 10 grams or less',
        'pos: hypodermic needle': 'possession of hypodermic needle',
        'poss: cocaine': 'possession of cocaine',
        'poss: cannabis more than 30gms':
            'possession of cannabis, more than 30 grams',
        'aggravated:knife/cutting instr':
            'aggravated, knife/cutting instrument',
        'sex asslt of child by fam mbr':
            'sexual assault of child by family member',
        'agg sex asslt of child fam mbr':
            'aggravated sexual assault of child by family member',
        'aggravated: other dang weapon': 'aggravated, other dangerous weapon',
        'aggravated: knife/cut instr': 'aggravated, knife/cutting instrument',
        'att: truck, bus, motor home': 'attempted, truck, bus, motor home',
        'att: automobile': 'attempted automobile',
        'financial id theft:$300 &under':
            'financial identity theft, $300 and under',
        'agg: financial id theft': 'aggravated financial identity theft',
        'attempt theft': 'attempted',
        'agg pro.emp: other dang weapon':
            'aggravated protected employee, other dangerous weapon',
        'aggravated: other firearm': 'aggravated, other firearm',
        'aggravated po: handgun': 'aggravated police officer, handgun',
        'aggravated: handgun': 'aggravated, handgun',
        'aggravated domestic battery: knife/cutting inst':
            'aggravated domestic battery, knife/cutting instrument',
        'aggravated domestic battery: other dang weapon':
            'aggravated domestic battery, other dangerous weapon',
        'aggravated po: other dang weap':
            'aggravated police officer, other dangerous weappn',
        'agg: hands/fist/feet serious injury':
            'aggravated, hands/fist/feet serious injury',
        'agg pro.emp:knife/cutting inst':
            'aggravated protected employee, knife/cutting instrument',
        'agg pro emp hands serious inj':
            'aggravated protected employee hands serious injury',
        'aggravated po: knife/cut instr':
            'aggravated police officer, knife/cutting instrument',
        'agg pro.emp: other firearm':
            'aggravated protected employee, other firearm',
        'aggravated po:knife/cut instr':
            'aggravated police officer, knife/cutting instrument',
        'agg pro.emp: other firearm':
            'aggravated protected employee, other firearm',
        'agg pro.emp: handgun': 'aggravated protected employee, handgun',
        'aggravated po:knife/cut instr':
            'aggravated police officer, knife/cutting instrument',
        'attempt: armed-knife/cut instr':
            'attempted, armed-knife/cutting instrument',
        'armed: handgun': 'armed, handgun',
        'armed: other dangerous weapon': 'armed, other dangerous weapon',
        'armed:knife/cutting instrument': 'armed, knife/cutting instrument',
        'attempt: armed-handgun': 'attempted, armed-handgun',
        'attempt: strongarm-no weapon': 'attempted, strongarm-no weapon',
        'attempt: armed-other dang weap':
            'attempted, armed-other dangerous weapon',
        'attempt: aggravated': 'attempt, aggravated',
        'aggravated: other': 'aggravated, other',
        'attempt agg: knife/cut instr':
            'attempted aggravated, knife/cutting instrument',
        'attempt agg: other': 'attempted aggravated, other',
        'attempt agg: handgun': 'attempted aggravated, handgun',
        'theft/recovery: automobile': 'theft/recovery, automobile',
        'theft/recovery: cycle, scooter, bike w-vin':
            'theft/recovery, cycle, scooter, bike',
        'cycle, scooter, bike w-vin': 'cycle, scooter, bike',
        'theft/recovery: truck,bus,mhome':
            'theft/recovery, truck,bus,motor home',
        'financial id theft: over $300': 'financial identity theft, over $300',
        'armed: other firearm': 'armed, other firearm',
        'aggravated domestic battery: handgun':
            'aggravated domestic battery, handgun',
        'aggravated domestic battery: hands/fist/feet serious injury':
            'aggravated domestic battery, hands/fist/feet serious injury',
        'attempt forcible entry': 'attempted forcible entry',
        'attempt arson': 'attempted arson',
        'attempt: cycle, scooter, bike w-vin':
            'attempted, cycle, scooter, bike w-vin',
        'from coin-op machine/device': 'from coin-operated machine/device',
        'attempt financial identity theft':
            'attempted financial identity theft',
        'cycle, scooter, bike no vin': 'cycle, scooter, bike',
        'attempt non-aggravated': 'attempted, non-aggravated',
        'agg po hands etc serious inj':
            'aggravated police officer hands etc serious inj',
        'attempt: armed-other firearm': 'attempted, armed-other firearm',
        'aggravated domestic battery: other firearm':
            'aggravated domestic battery, other firearm',
        'manu/deliver:amphetamines': 'manufacture/delivery, amphetamines'
    };
    if (dictionary[original] == undefined) {
        return original;
    } else {
        ret = dictionary[original];
    }
    return ret;
}

/* Converts the ugly primary type from the City's website to a more human-friendly format. */
function prettifyPrimaryType(original) {
    var dictionary = {
        'crim sexual assault': 'Sexual assault'
    };
    if (dictionary[original] == undefined) {
        return original;
    } else return dictionary[original];
}
/* Capitalizes the (alreadly-converted to lowercase) text. */
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

/* Cloase info boxes.  This is a bit of a hack -- Google Maps API doesn't have a mulitple-tooltips-per-map functinality built in. */
function closeInfos() {
    if (infos.length > 0) {
        /* detach the info-window from the marker ... undocumented in the API docs */
        infos[0].set('marker', null);

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
/* Called  by the console -- deals with finding duplicate points. */
function getDuplicateLatLons(year) {
    var currentCrimeCodes = determineCurrentCrimeCodes();
    latlons = [];
    for (var i = 0; i < rawData.length; i++) {
        if (new Date(rawData[i]['date']).getFullYear() == year) {
            //Only continue with crimes committed in the currently-selected year.
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
                else currentCode = 'other-drug-crimes';
            }
            if ($.inArray(currentCode, currentCrimeCodes) !== -1) {
                //Only add a point to the map if the crime is currently selected.
                var latLonString =
                    rawData[i]['latitude'] + ', ' + rawData[i]['longitude'];
                latlons.push(latLonString);
            }
        }
    }
    var counts = {};
    latlons.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    duplicateLatLons = counts;
}

function determineCurrentCrimeCodes() {
    var arrOfCodes = [];
    $('input[name="crime-category"]:checked').each(function (index, value) {
        if ($(value).attr('data-code') !== '18')
            arrOfCodes.push($(value).attr('data-code'));
        else arrOfCodes.push($(value).attr('value'));
    });
    return arrOfCodes;
}

function clearMarkers() {
    setAllMap(null);
}

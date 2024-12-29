//TODO

// ------------------ DATA ------------------
// Fetch JSON data

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
async function fetchData() {
    try {
        // get data from external source (github)
        var response = await fetch('https://raw.githubusercontent.com/chicagomaroon/data-visualizations/refs/heads/divestment/2024/divestment-history/data.json');

        var jsonData = await response.json();

        // console.log(jsonData)
        return jsonData; 

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function getUnique(data, variable) {

    // get unique values of category variable
    let categories = [];
    data.forEach(function(val) {
        categories.push(val[variable]);
    })

    var uniqueCat = new Set(categories);
    var uniqueCat = Array.from(uniqueCat);

    // console.log(uniqueCat);
    return uniqueCat;
}

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
async function processData(
    data,
    x_var,
    y_var,
) {

    try {
        let uniqueCat = getUnique(data, x_var);

        // construct plotly "dataframe"
        var traces = [];

        // manually group data
        for (var i=0; i<uniqueCat.length; i++) {

            // boxplot specs
            let trace = {
                type: 'box',
                name: uniqueCat[i],
                y: [],
                text: [],
                boxpoints: 'all',
                jitter: 0.5,
                pointpos: 0,
                marker: {
                    size: 10,
                    color: 'blue'
                },
                fillcolor: 'rgba(0,0,0,0)',
                line: {color: 'rgba(0,0,0,0)'},
                hovertemplate: '%{text}<extra></extra>'
            };
            
            data.forEach(function(val) {

                if (val[x_var]==uniqueCat[i]) {
                    trace.y.push(val[y_var]);
                    trace.text.push('<a href="' + val['Link'] + '" target="_blank">' + val['Source'] + '</a>');
                }
                
            });

            // console.log(trace);

            traces.push(trace);
        }

        console.log(traces); // confirm data exists on page load
        
        return traces;

    } catch (error) {
        console.error('Error processing data: ',error);
    }
}

new Waypoint({
    // you can create a class 'active' with all css elements tied to the class instead of individual elements
    
    element: document.getElementById('step1'),
    handler: function() {
        // here add the plotly restyle
        // plotly redraw
        document.getElementById('step1').style.backgroundColor='red'
        console.log('hello world')
    },
    offset: '100%'
})

// let config = [];
const zoomSpeed = 5000;
PRIMARY_COLOR = '#800000';
SECONDARY_COLOR = 'black';

// try plotly jitter again
// beeswarm (strip)
// if not, then manually jitter

// -------- CONSTANTS --------

const fullOpacity = 0.6;

// -------- MAIN --------

async function init() {
    let data = await fetchData();
    let uniqueCat = getUnique(data, 'Movement');
    
    let data2 = await processData(data, 'Movement','Date of Event');  
    console.log(data);  
    
    console.log(uniqueCat);

    let layout = {
        title: {
            text: 'Test'
        },
        xaxis: {
            type: 'category',
            range: uniqueCat,
            showgrid:'False',
            showline:'False'
        },
        yaxis: {
            range: ['1966-1-1','2026-1-1'],
            type: 'date',
            // https://community.plotly.com/t/date-tick-formatting/11081/5
            dtick: 'M12',
            ticklabelstep: 4
        },
        legend:{
            'font_size':10,
        },
        hovermode:'closest',
        hoverlabel:{
            'bgcolor':'white'
        },
        width: 1200,
        height: 400,
        showlegend: false
    };

    Plotly.newPlot('chartDiv', [data2], layout);
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});

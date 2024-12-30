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
    name_var,
) {

    try {
        let uniqueCat = getUnique(data, name_var);

        // construct plotly "dataframe"
        var traces = [];

        let colors = [
            'rgb(128, 0, 0)',
            'rgb(255, 163, 25)',
            'rgb(193, 102, 34)',
            'rgb(143, 57, 49)',
            'rgb(138, 144, 69)',
            'rgb(88, 89, 63)',
            'rgb(21, 95, 131)',
            'rgb(53, 14, 32)',
            'rgb(71, 181, 255)',
            'rgb(255, 51, 153)'
        ]

        // manually group data
        for (var i=0; i<uniqueCat.length; i++) {
            console.log(colors[i])
            // boxplot specs
            let trace = {
                type: 'box',
                name: uniqueCat[i],
                x: [],
                text: [],
                boxpoints: 'all',
                jitter: 0.5,
                pointpos: 0,
                marker: {
                    size: 8,
                    color: colors[i]
                },
                fillcolor: 'rgba(0,0,0,0)',
                line: {color: 'rgba(0,0,0,0)'},
                hovertemplate: '%{text}<extra></extra>'
            };
            
            data.forEach(function(val) {

                if (val[name_var]==uniqueCat[i]) {
                    trace.x.push(val['Date of Event']);
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
    // console.log(data);  

    let traces = await processData(data,'Movement');  
    console.log(traces);

    let layout = {
        title: {
            text: 'Test'
        },
        xaxis: {
            showgrid:true,
            showline:true,
            range: ['1966-1-1','2026-1-1'],
            type: 'date',
            // https://community.plotly.com/t/date-tick-formatting/11081/5
            dtick: 'M12',
            ticklabelstep: 4
        },
        yaxis: {
            showgrid:false
        },
        hovermode:'closest',
        hoverlabel:{
            'bgcolor':'white'
        },
        width: 1200,
        height: 400,
        showlegend: false
        margin: {
            l: 150
        }
    };

    Plotly.newPlot('chart-div', traces, layout);
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});

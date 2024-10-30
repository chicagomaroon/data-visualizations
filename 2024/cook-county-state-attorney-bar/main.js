let candidates = [
    {
        name: "Eileen O'Neill Burke",
        y: 4172187.5,
        drilldown: "Eileen O'Neill Burke"
    },
    {
        name: "Robert (Bob) Fioretti",
        y: 267625.79,
        drilldown: "Robert (Bob) Fioretti"	
    }
];

let eileenBurke = [
    ["Daniel O'Keefe", 348100],
    ['Craig Duchossois', 159400.00],
    ['Donald R Wilson, Jr', 131900.00],
    ['Richard Melman', 131900.00],
    ['Jim Frank', 112500.00]
];

let robFioretti = [
    ["Vincent Kolber", 124877.45],
    ['Tony J. Peraica & Associates', 17500],
    ['Fioretti-Campbell Law', 13700],
    ['Disparti Law Group', 13700],
    ['Bob Fioretti', 1300.00]
];

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

// Calculate total contributions represented and create percentages
let totalContributionsRepresented = 0;
candidates.map((d) => {
    totalContributionsRepresented += d.y;
});

candidates = candidates.map((d) => {
    d.y /= totalContributionsRepresented;
    d.y *= 100;
    return d;
});

// Calculate overall percentages for each candidate
function calculatePercentagesForDonation(d, candidate_index) {
    let candidate_sum = (candidates[candidate_index].y * totalContributionsRepresented) / 100.0;
    d[1] /= candidate_sum;
    d[1] *= 100;

    return d;
}

eileenBurke = eileenBurke.map((donation) => calculatePercentagesForDonation(donation, 0));
robFioretti = robFioretti.map((donation) => calculatePercentagesForDonation(donation, 1));


Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FFA319',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    // All code for your chart goes here
    chart: {
        type: 'column'
    },

    legend: {
        enabled: false
    },

    title: {
        text: "Top Donors in the 2024 Cook County State's Attorney Election",
        align: 'center'
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y:.1f}% of donation to the candidate'
    },

    subtitle: {
        text: 'Click The Candidates To See The Individual Donors',
        align: 'center'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Percentage of Donation in the Race'
        }
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    series: [
        {
            name: 'Candidates',
            colorByPoint: true,
            data: candidates
        }
    ],

    drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series: [
            {
                name: "Eileen O'Neill Burke",
                id: "Eileen O'Neill Burke",
                data: eileenBurke
            },
            {
                name: "Robert (Bob) Fioretti",
                id: "Robert (Bob) Fioretti",
                data: robFioretti
            }
        ]
    }
});


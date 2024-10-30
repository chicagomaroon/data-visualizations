let candidates = [
    {
        name: 'Monica Gordon',
        y: 526632.5,
        drilldown: 'Monica Gordon'
    },
    {
        name: 'Michelle Pennington',
        y: 10717.26,
        drilldown: 'Michelle Pennington'	
    }
];

let monicaGordon = [
    ['S.E.I.U. Local 73', 45900.00],
    ['SEIU Local 73 B-PAC', 27777.39],
    ['Citizens to Elect Karen Yarbrough', 25000.00],
    ['Unity Party of Bloom Township',22500.00],
    ['Chicago Land Operators Joint-Labor Mgmt PAC',21500.00]
];

let michellePennington = [
    ['Brad Stephens for State Representative', 3000.00],
    ["Meredith O'Neil", 1500.00],
    ["Kosta Drosos", 1000.00],
    ["Douglas Zinser", 1000.00],
    ["Paul Gadbut", 960.60]
];

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

monicaGordon = monicaGordon.map((donation) => calculatePercentagesForDonation(donation, 0));
michellePennington = michellePennington.map((donation) => calculatePercentagesForDonation(donation, 1));


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
        text: 'Top Donors in the 2024 Cook County Clerk Election',
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
                name: 'Monica Gordon',
                id: 'Monica Gordon',
                data: monicaGordon
            },
            {
                name: 'Michelle Pennington',
                id: 'Michelle Pennington',
                data: michellePennington
            }
        ]
    }
});


const data2020 = [
    195, 247, 308, 487, 548, 655, 795, 872, 933, 933, 994, 994, 994, 994, 994,
    1025, 1649, 1663, 1669, 1700, 1822, 1852, 1932, 1993, 2290, 2324, 2482,
    2529, 2915, 3084, 3529, 3602, 3691, 3813, 4003, 4228, 4269, 4396, 4488,
    4561, 9405, 10683, 10683, 10835, 10987, 11169, 11169, 11182, 11226, 12077,
    12263, 12287, 14886, 14958, 15236, 15491, 15868, 16002, 16762, 16823, 16865,
    16938, 17252, 17476, 17561, 17755, 17876, 17937, 17937, 18034, 18246, 19460,
    19498, 20224, 20367, 20752, 20832, 22065, 24879, 24907, 24907, 25103, 25436,
    29714, 30053, 30307, 30750, 32129, 32266, 34470, 34618, 34703, 34802, 35067,
    35699, 35740, 36019, 36139, 36217, 36251, 36464, 36497, 36515, 36919, 37076,
    37330, 37361, 37375, 37417, 37489, 38735, 38828, 38894, 38972, 39277, 39518,
    40011, 40177, 40856, 41384, 41411, 41561, 41688, 42124, 42364, 42405, 42685,
    42902, 43382, 43798, 43902, 44023, 44053, 44092, 44176, 44228, 44427, 44440,
    44475, 44493, 44535, 44672, 44725, 44818, 44854, 45247, 45519, 45685, 45997,
    47167, 48883, 48883, 48955, 49136, 49155, 49261, 49592, 49852, 50004, 50185,
    50204, 51027, 51399, 52183, 52259, 52292, 52353, 53033, 53058, 53105, 53141,
    53589, 53987, 54041, 54611, 54674, 55677, 58828, 60486, 61216, 63457, 63559,
    63727, 63889, 63893, 63982, 64035, 64329, 64695, 65152, 65484, 65654, 65686,
    65698, 65977, 66157, 66235, 66682, 67042, 68157, 68179, 68366, 70152, 71425,
    71437, 71683, 71835, 72258, 72388, 72570, 73323, 73930, 74052, 74381, 74630,
    74842, 75034, 76387, 76658, 77096, 77232, 77324, 77680, 78033, 78885, 78918,
    79154, 79394, 79627, 79741, 79880, 80003, 80492, 82169, 82261, 82411, 82486,
    82645, 83472, 83704, 84125, 84827, 86844, 86997, 87257, 87745, 87922, 88022,
    88245, 88582, 90211, 90563, 90766, 91251, 93422, 96324, 98930, 99218, 99641,
    99745, 99923, 100597, 100963, 101071, 101789, 102717, 102919, 103856,
    104564, 105173, 105635, 106754, 115976, 116954, 117828, 118277, 118444,
    118706, 118845, 119326, 120701, 120966, 121225, 124951, 125202, 125602,
    126926, 127558, 127923, 128501, 128768, 128899, 129088, 130394, 131811,
    132297, 132930, 133056, 133239, 133879, 134156, 134317, 135474, 136620,
    136771, 137275, 138170, 138414, 138695, 138837, 139514, 139675, 139961,
    142289, 142579, 142937, 143092, 143219, 143495, 143931, 144423, 144695,
    145646, 146385, 146994, 148936, 149096, 149141, 149495, 150209, 150636,
    151070, 151285, 152831, 153519, 153621, 153923, 154840, 156388, 158030,
    158816, 159247, 159987, 160431, 160924, 161296, 162187, 162356, 165849,
    166105, 168262, 168984, 170029, 171446, 171868, 172658, 174754, 175162,
    175321, 175553, 176367, 177242, 178030, 180181, 183029
];

const data2024 = [
    659, 796, 868, 925, 1040, 1205, 1437, 1468, 1898, 2114, 2160, 2181, 2251,
    2335, 2415, 2446, 2491, 2511, 2638, 2690, 2690, 2818, 2956, 3013, 3140,
    9566, 10204, 10279, 10744, 10784, 11090, 11163, 11270, 11383, 11501, 11574,
    11805, 12035, 12046, 12496, 12630, 12660, 12839, 12893, 12975, 13031, 13207,
    13286, 13296, 13693, 13708, 13729, 14219, 16414, 16414, 17098, 17494, 17619,
    18412, 18495, 18582, 18837, 18981, 19023, 19233, 19510, 19523, 19941, 20161,
    20226, 20353, 20478, 20560, 21057, 21088, 21140, 21165, 21459, 23513, 23549,
    23720, 23849, 24023, 24373, 24793, 25125, 25265, 25866, 28821, 29182, 29335,
    29461, 30617, 30770, 30954, 31021, 31275, 31286, 31752, 32051, 32077, 32256,
    32418, 32557, 32906, 32973, 33039, 33113, 33400, 33416, 34476, 34598, 45189,
    45285, 45599, 47052, 47260, 47689, 48035, 49131, 49299, 49415, 49899, 50915,
    50957, 51297, 51562, 51710, 52278, 53589, 53649, 53700, 53765, 53886, 53991,
    54022, 54070, 54581, 54872, 54918, 55074, 55231, 56391, 57433, 57917, 58375,
    58583, 59237, 59698, 62556, 63021, 63082, 64191, 64448, 64604, 64864, 65171,
    65251, 65396, 65708, 65995, 66318, 66331, 66334, 66504, 66644, 67178, 67990,
    68058, 68431, 68471, 68491, 68843, 70462, 70482, 70642, 71378, 71565, 72743,
    73228, 76995, 76995, 77060, 77624, 77674, 77674, 77838, 79509, 81019, 81260,
    81260, 81260, 81804, 81804, 81804, 81844, 81849, 82267, 82267, 82277, 82284,
    82284, 82687, 82742, 82768, 82808, 82914, 83005, 83025, 83050, 83332, 83639,
    83651, 83686, 83837, 84438, 84448, 85024, 85164, 85174, 85315, 85440, 85440,
    85941, 85993, 86033, 86098, 86128, 86223, 86223, 86263, 86293, 86303, 86328,
    87345, 87345, 87376, 87481, 87561, 87576, 87932, 87939, 88215, 88715, 88760,
    88815, 88865, 88910, 89109, 89234, 89244, 89324, 90074, 90084, 90084, 90084,
    90109, 90109, 90112, 90182, 90182, 91681, 92456, 95755, 96030, 97044, 98124,
    98404, 98484, 98584, 98644, 98744, 100165, 100165, 100210, 100260, 100270,
    100310, 100425, 100450, 100460, 100590, 100715, 100725, 100725, 100725,
    100750, 100780, 100795, 101340, 101349, 101449, 101449, 101449, 101484,
    101499, 101509, 101509, 101589, 101604, 101629, 102029, 102319, 102551,
    102566, 102566, 102630, 102640, 102665, 102705, 102730, 102790, 102934,
    102934, 102934, 103069, 103069, 103595, 103595, 103595, 103670, 103670,
    103770, 103840, 103850, 103850, 103885, 103890, 103905, 104001, 106005,
    106030, 106491, 106623, 106623, 106623, 106623, 106623, 106874, 107034,
    107034, 107034, 107034, 107084, 107089, 107089, 107140, 107140, 108143,
    108151, 108196, 108201, 108201, 108326, 108326, 108326, 108366, 108366,
    108371, 108482, 108492, 108492, 108507, 108507, 108537
];

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FFA319'],

    title: {
        text: 'Cumulative Donations by UChicago Faculty in the 2020 and 2024 Elections',
        align: 'center'
    },
    subtitle: {
        text: '2024 Election donations are losing pace compared to the 2020 Election.',
        align: 'center',
        style: {
            fontSize: '15px'
        }
    },
    yAxis: {
        title: {
            text: 'Cumulative Donations'
        },
        labels: {
            format: '${value:,.0f}'
        },
        tickInterval: 50000
    },
    xAxis: {
        title: {
            text: 'Days Until Election'
        },
        reversed: true,
        tickInterval: 50,
        accessibility: {
            description: 'Months of the year'
        }
    },
    tooltip: {
        valuePrefix: '$',
        headerFormat: '<b>{point.x}</b> Days Until Election<br/>',
        shared: true,
        distance: 30,
        Padding: 5
    },
    plotOptions: {
        series: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            }
        }
    },
    legend: {
        enabled: false
    },
    series: [
        {
            name: '2020 Election',
            label: {
                enabled: true,
                style: {
                    fontSize: '17px'
                }
            },
            data: data2020,
            pointStart: 672,
            pointInterval: -1,
            relativeXValue: true
        },
        {
            name: '2024 Election',
            label: {
                enabled: true,
                style: {
                    fontSize: '17px'
                }
            },
            data: data2024,
            pointStart: 674,
            pointInterval: -1,
            relativeXValue: true
        }
    ]
});
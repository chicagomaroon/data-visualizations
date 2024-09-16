// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart', {
    chart: {
        type: 'timeline'
    },
    accessibility: {
        screenReaderSection: {
            beforeChartFormat:
                '<h5>{chartTitle}</h5>' +
                '<div>{typeDescription}</div>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
        },
        point: {
            valueDescriptionFormat: '{point.description}'
        }
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false
    },
    title: {
        text: "Timeline of Brunson's Activies"
    },
    tooltip: {
        enabled: true
    },
    colors: ['#880404'],
    series: [
        {
            data: [
                {
                    name: '<b>September 27, 2021</b>: Brunson attends UChicago',
                    description:
                        'Brunson is first registered as a student in the College at UChicago.'
                },
                {
                    name: '<b>May 2022</b>: Brunson makes videos on armed terrorism',
                    description:
                        'Brunson makes videos, speaking in Armenian, "plainly seeking to assist Armenian speakers in the formation and operation of an armed militant terrorist organization" according to the FBI complaint. He discusses how to make explosives and rig grenade traps, and names Azerbaijani military and political officials as potential targets for assassination.'
                },
                {
                    name: '<b>November 11, 2022</b>: Brunson joins the Armenian Revolutionary Federation (ARF)',
                    description:
                        'A bullet found in Brunson\'s dorm room had the date 11/11/22 written on it - the date he was inducted into the Chicago branch of the ARF, an Armenian nationalist and socialist political party. According to the party\'s website, ARF aims to achieve "social justice, democracy and national self-determination for the Armenian people". A CIA research paper from 2009 refers to the ARF as a "major Armenian terrorist group."'
                },
                {
                    name: '<b>January 2, 2023</b>: Woodlawn explosion and fire',
                    description:
                        'Brunson accidentally detonates the black powder device he was making, leading to an evacuation of Woodlawn dormitory. Two UChicago students also living in Yovovich house "separately reported hearing an explosion and having plaster knocked off the walls in their rooms before the fire alarm sounded," according to the FBI complaint.'
                },
                {
                    name: '<b>January 5, 2023</b>: Brunson has left campus',
                    description:
                        "Brunson, who had been a member of the UChicago chapter of the Democratic Socialists of America, did not show up at the club's weekly meeting on January 5, 2023. He returns to live with his parents in Newton, Massachusetts."
                },
                {
                    name: '<b>January 18, 2023</b>:<br><a href="https://armenianweekly.com/2023/01/18/an-open-letter-to-my-ayf-comrades-its-time-to-sober-up/"><span style="color: #427CDD">Opinion article</span></a> in <i>The Armenian Weekly</i>',
                    description:
                        'Brunson publishes an article in <i>The Armenian Weekly</i> recommending that members of the Armenian diaspora take measures such as hunger strikes, picketing, "peaceful occupations and sit-ins," and "event disruptions" to assist ethnic Armenians living in contested territory such as Artsakh, now part of Azerbaijan.'
                },
                {
                    name: '<b>August 20, 2023</b>: Logan Airport incident',
                    description:
                        "At Boston Logan Airport, Brunson's bags set off an alarm indicating the presence of HMTD. He falsely tells officials at the airport that he has not previously handled firearms or explosives or been in a place where they were handled, and did not know why his belongings had tested positive. Brunson flies to Yerevan, Armenia, where he currently resides."
                },
                {
                    name: "<b>August 23, 2023</b>: Law enforcement search Brunson's home",
                    description:
                        "Officers found a notebook in Brunson's bedroom containing notes on how to make HMTD. A bomb dog alerted on three locations in his bedroom."
                },
                {
                    name: '<b>August 27, 2023</b>: FBI files complaint against Brunson',
                    description:
                        'FBI Special Agent Thomas M. Dalton files a seventeen-page complaint against Brunson alleging that he violeted U.S. federal statute sections 18 USC Section 1001(a)(2), making "false statements", and 18 USC Section 1001(a)(1), "falsifying, concealing, and covering up a material fact by trick, scheme, or device".'
                }
            ]
        }
    ]
});

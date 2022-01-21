const X_LABELS = [
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
]

const Y_MIN = [
    272,
    -137,
    35,
    17,
    333,
    280,
    300
]

const Y_MAX = [
    417,
    -137,
    35,
    14,
    658,
    481,
    485,
]

// const Y_MEAN = [
//     345,
//     -137,
//     35,
//     16,
//     496,
//     381,
//     393,
// ]

export default function chart() {
    const chartElem = document.querySelector('._chart-element'),
        legendList = document.getElementById('legend-list');

    if (!chartElem) return;

    chartElem.font = "semibold 30px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    const chart = new Chart(chartElem.getContext('2d'), {
        type: 'line',
        data: {
            labels: X_LABELS,
            datasets: [
                {
                    label: 'Минимальный процент дохода',
                    data: Y_MIN,
                    backgroundColor: [
                        'rgba(24, 120, 198, 0.3)'
                    ],
                    borderColor: [
                        'rgba(24, 120, 198, 1)'
                    ],
                    pointRadius: 1,
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                },
                // {
                //     label: 'Средний процент дохода',
                //     data: Y_MEAN,
                //     backgroundColor: [
                //         'rgba(24, 187, 198, 0.3)'
                //     ],
                //     borderColor: [
                //         'rgba(24, 187, 198, 1)'
                //     ],
                //     pointRadius: 1,
                //     borderWidth: 2,
                //
                //     cubicInterpolationMode: 'monotone',
                //     tension: 0.4
                // },
                {
                    label: 'Максимальный процент дохода',
                    data: Y_MAX,
                    backgroundColor: [
                        'rgba(91, 239, 203, 0.3)'
                    ],
                    borderColor: [
                        'rgba(91, 239, 203, 1)'
                    ],
                    pointRadius: 1,
                    borderWidth: 2,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                },
            ]
        },
        options: {
            scaleLineColor: "rgba(0,0,0,0)",
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    font: {
                        size: 11
                    }
                },
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },

            scales: {
                y: {
                    ticks: {
                        color: "#999999",
                        font: {
                            family: "'MazzardM', sans-serif",
                            padding: 0,
                            labelOffset: 50,
                            lineHeight: 1.5
                        }
                    },

                    grid: {
                        display: false,
                        borderWidth: 0,
                    }
                },
                x: {
                    ticks: {
                        color: "#999999",
                        font: {
                            family: "'MazzardM', sans-serif",
                            size: 11,
                            padding: {
                                left: 50,
                            },
                        }
                    },
                    grid: {
                        display: false,
                        borderWidth: 0,
                    }
                },
            }
        }
    })


    function sampleLegeng(arg) {

        let liLegend = document.createElement('li'),
            btnLegend = document.createElement('button'),
            lineLegend = document.createElement('span'),
            nameLegend = document.createElement('span');

        liLegend.classList.add('statistics__chart--item');
        btnLegend.classList.add('statistics__chart--item-btn');
        lineLegend.classList.add('statistics__chart--item-line', '_icon-mode');
        nameLegend.classList.add('statistics__chart--item-name');

        nameLegend.innerText = arg.label;

        liLegend.appendChild(btnLegend);
        btnLegend.appendChild(lineLegend);
        btnLegend.appendChild(nameLegend);

        btnLegend.dataset.label = arg.id;

        arg.active ? btnLegend.classList.add(arg.active) : false;


        btnLegend.addEventListener('click', function () {
            let btnList = document.querySelectorAll('.statistics__chart--item-btn');
            if (this.dataset.label != 'false' && !this.classList.contains('_active')) {

                btnList.forEach(e => {
                    e.classList.remove('_active');

                    if (e.dataset.label != 'false') {
                        if (!arg.chart.isDatasetVisible(Number(e.dataset.label))) {
                            arg.chart.show(Number(e.dataset.label));
                        }

                    }
                })

                this.classList.add('_active');
                arg.chart.hide(Number(this.dataset.label));


            } else if (this.dataset.label == 'false' && !this.classList.contains('_active')) {

                btnList.forEach(e => {
                    e.classList.remove('_active');

                    if (e.dataset.label != 'false') {

                        arg.chart.show(Number(e.dataset.label));

                    }
                })

                this.classList.add('_active');

            }

        })

        return liLegend;
    }


    //console.log(chart.defaults.color);
    legendList.appendChild(sampleLegeng({
        label: 'Все доходы',
        id: false,
        active: '_active',
        chart: chart,
    }));

    let count = chart.config.data.datasets.length - 1;


    chart.config.data.datasets.forEach(elem => {

        legendList.appendChild(sampleLegeng({
            label: elem.label,
            id: count,
            chart: chart,
        }));

        count--;

    })

}

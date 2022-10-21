import popup from './popup.js';

const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');


const selectLists = document.querySelectorAll('._select-style')
let checkTabActive = false;

function galleryPopup(link) {

    let galleryPopupBlock =
        `
    <div class="_gallery-popup _hidden">
        <div class="_gallery-popup-bg"></div>
        <div class="_gallery-popup-body _gallery-popup-max">
            <button type="button" class="_gallery-popup-close-btn">
                ×
            </button>
            <img src="${link.href}" class="_gallery-popup-img" loading="lazy">
        </div>
    </div>
    `;

    body.insertAdjacentHTML('beforeend', galleryPopupBlock);
    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    body.classList.add('_popup-active');


    let galleryPopup = document.querySelector('._gallery-popup');

    setTimeout(function () {
        galleryPopup.classList.remove('_hidden');
    }, 200);

    function removeGalleryPopup() {
        galleryPopup.classList.add('_hidden');
        setTimeout(function () {
            body.removeChild(galleryPopup);
            body.classList.remove('_popup-active');
            html.style.setProperty('--popup-padding', '0px');
        }, 200);
    }

    galleryPopup.querySelector('._gallery-popup-close-btn').addEventListener('click', function () {
        removeGalleryPopup();
    });

    galleryPopup.querySelector('._gallery-popup-bg').addEventListener('click', function () {
        removeGalleryPopup();
    });

}


body.addEventListener('click', function (e) {

    // Закрыть меню
    if (e.target.classList.contains('header__nav--block')) {
        menu.forEach(elem => {
            elem.classList.remove('_active')
        })
    }

// Меню в шапке
    if (e.target.classList.contains('_burger') || e.target.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }


// Выбор языка страницы
    if (e.target.classList.contains('_select-style-btn') || e.target.closest('._select-style-btn')) {

        if (e.target.closest('._select-style-btn')) {
            const parent = e.target.closest('._select-style');
            parent.classList.toggle('_active');

        }

    } else if (!e.target.closest('._select-style')) {
        try {
            document.querySelector('._select-style').classList.remove('_active');
        } catch {
        }

    }

// Табы
    if (e.target.classList.contains('_tab-link') || e.target.parentNode.classList.contains('_tab-link') && checkTabActive == false) {
        e.preventDefault();
        tab(e.target);
    }

// Попап

    if (e.target.classList.contains('_popup-btn') || e.target.parentNode.classList.contains('_popup-btn')) {
        e.preventDefault();
        popup({
            id: e.target.getAttribute('href'),
            html: html,
            body: body,
        })
        //popup(e.target.getAttribute('href'));
    }

// Галерея Попап
    if (e.target.classList.contains('_gallery-popup-link') || e.target.closest('._gallery-popup-link')) {
        let link = (e.target.closest('._gallery-popup-link')) ? e.target.closest('._gallery-popup-link') : e.target

        e.preventDefault()
        console.log(link);
        galleryPopup(link);

    }

// Скролл к секциям
    if (e.target.classList.contains('_btn-to-scroll')) {

        let section = document.querySelector(e.target.getAttribute('href'));

        if (section) {
            e.preventDefault();
            menu.forEach(elem => {
                elem.classList.remove('_active')
            })
            window.scroll({
                left: 0,
                top: section.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            })

        }

    }

})


function loaded() {

    var lazyVideos = [].slice.call(document.querySelectorAll("video._lazy-load-video"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                            videoSource.removeAttribute('data-src');
                        }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    var obj = document.getElementById('example');

                    video.target.addEventListener('loadeddata', function () {

                        video.target.classList.add("_visible");

                    });
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }

    // =-=-=-=-=-=-=-= СЛАЙДЕРЫ { =-=-=-=-=-=-=-=

    const tariffSlider = new Swiper('.tariffs__block', {

        spaceBetween: 15,
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.tariffs__block--arrow._next',
            prevEl: '.tariffs__block--arrow._prev',
        },
        breakpoints: {
            1180: {
                slidesPerView: 2,
                spaceBetween: 72,
                centeredSlides: false,

            },
            768: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerView: 3,

            }
        }
    });


    let reviewsSlider;


    // =-=-=-=-=-=-=-= } СЛАЙДЕРЫ =-=-=-=-=-=-=-=


    // =-=-=-=-=-=-=-= ТАЙМЕР { =-=-=-=-=-=-=-=

    function timer() {
        const timerElems = document.querySelectorAll('._timer');
        let deadline;
        timerElems.forEach(timerElem => {
            deadline = new Date(
                timerElem.getAttribute('data-date-year'),
                timerElem.getAttribute('data-date-month'),
                timerElem.getAttribute('data-date-day'),
                timerElem.getAttribute('data-date-hour'),
                timerElem.getAttribute('data-date-minute')
            );

            const day = timerElem.querySelector('.tariffs__item--timer-day .tariffs__item--timer-value'),
                hour = timerElem.querySelector('.tariffs__item--timer-hours .tariffs__item--timer-value'),
                minute = timerElem.querySelector('.tariffs__item--timer-minute .tariffs__item--timer-value');

            const diff = deadline - new Date(),

                days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
                hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
                minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

            day.innerHTML = days;
            hour.innerHTML = hours;
            minute.innerHTML = minutes;

        });
    }

    timer();

    // =-=-=-=-=-=-=-= ТАЙМЕР } =-=-=-=-=-=-=-=


    // =-=-=-=-=-=-=-= ГРАФИК { =-=-=-=-=-=-=-=

    const ctx = document.querySelectorAll('._chart-element'),
        legendList = document.getElementById('legend-list');

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

    ctx.font = "semibold 30px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    ctx.forEach(chartElem => {
        const chart = new Chart(chartElem.getContext('2d'), {
            type: 'line',
            data: {
                labels: chartElem.dataset.chartLabels.split(','),
                datasets: [
                    {
                        label: 'Минимальный процент дохода',
                        data: chartElem.dataset.chartMin.split(','),
                        backgroundColor: [
                            'rgba(24, 120, 198, 0.3)'
                        ],
                        borderColor: [
                            'rgba(24, 120, 198, 1)'
                        ],
                        pointRadius: 0,
                        borderWidth: 3,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    },
                    {
                        label: 'Максимальный процент дохода',
                        data: chartElem.dataset.chartMax.split(','),
                        backgroundColor: [
                            'rgba(91, 239, 203, 0.3)'
                        ],
                        borderColor: [
                            'rgba(91, 239, 203, 1)'
                        ],
                        pointRadius: 0,
                        borderWidth: 2,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    }
                ]
            },
            options: {

                scaleLineColor: "rgba(0,0,0,0)",
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },

                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },

                scales: {
                    y: {
                        suggestedMin: 2000,
                        suggestedMax: 6500,

                        ticks: {
                            font: {
                                family: 'MazzardM',
                                size: 13,
                                weight: 'regular',
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
                    x: {
                        ticks: {
                            font: {
                                family: 'MazzardM',
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

        });

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

    });

    // =-=-=-=-=-=-=-= ГРАФИК } =-=-=-=-=-=-=-=


    // Media запросы {

    let windowSize = window.innerWidth,
        resizeCheck = windowSize >= 768 ? false : true;

    let appendBlock = document.querySelector('._append-to-menu'),
        headerNavBody = document.querySelector('.header__nav--body'),
        headerNavBlockBody = document.querySelector('.header__nav--block-body');

    function resize() {
        windowSize = window.innerWidth;
        if (windowSize >= 768 && resizeCheck == false) {
            resizeCheck = true;

            if (appendBlock) {
                headerNavBody.prepend(appendBlock);
                appendBlock.classList.add('_visible');
            }

            if (reviewsSlider) reviewsSlider.destroy();
            reviewsSlider = new Swiper('.reviews__block', {

                spaceBetween: 0,
                slidesPerView: 1,
                centeredSlides: true,
                loop: true,
                effect: "creative",
                grabCursor: true,
                creativeEffect: {
                    prev: {
                        translate: ["-120%", 0, -500],
                    },
                    next: {
                        translate: ["120%", 0, -500],
                    },
                },


                navigation: {
                    nextEl: '.reviews__item--slider-arrow._next',
                    prevEl: '.reviews__item--slider-arrow._prev',
                },
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                }
            });

        } else if (windowSize < 768 && resizeCheck == true) {
            resizeCheck = false;

            if (reviewsSlider) reviewsSlider.destroy();
            reviewsSlider = new Swiper('.reviews__block', {

                spaceBetween: 0,
                slidesPerView: 1,
                centeredSlides: true,
                loop: true,

                navigation: {
                    nextEl: '.reviews__item--slider-arrow._next',
                    prevEl: '.reviews__item--slider-arrow._prev',
                },


            });

            if (appendBlock) {
                headerNavBlockBody.prepend(appendBlock);
                appendBlock.classList.add('_visible');
            }

        }
    }

    resize();

    window.onresize = resize;

    // Media запросы }


    // Изменение шапки при скролле {

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    function scrollPage() {
        const offsetCheckJs = document.querySelector('.offset-check-js');
        let top = [getCoords(offsetCheckJs).top, false];

        header.classList.add('_loaded');

        function scrollPageFunc() {
            top[0] = getCoords(offsetCheckJs).top;

            if (top[0] >= 300 && top[1] == false) {

                top[1] = true;
                header.style.setProperty('--pos', '-100%');

                setTimeout(function () {
                    header.classList.add('_active');
                    header.style.setProperty('--pos', '0%');
                }, 200);

            } else if (top[0] <= 300 && top[1] == true) {

                top[1] = false;
                header.style.setProperty('--pos', '-100%');

                setTimeout(function () {
                    header.style.setProperty('--pos', '0%');
                    header.classList.remove('_active');

                }, 200);

            }
        }

        scrollPageFunc();

        window.onscroll = scrollPageFunc;

    }

    scrollPage();
}


window.onload = loaded


AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    offset: 50,
});



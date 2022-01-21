import tab from './tab.js';
import popup from './popup.js';
import galleryPopup from './gallery-popup.js';
import scrollToSection from './scrollToSection.js';
import * as sliders from './sliders.js';
import timer from './timer.js';
import chart from './chart.js';
import headerToggle from './headerToggle.js';
import VideoResponser from './videoResponser.js';


const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    header = document.querySelector('.header');


let checkTabActive = false;


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
        tab({
            checkTabActive: checkTabActive,
            e: e,
        });
    }


    // Попап

    if (e.target.classList.contains('_popup-btn') || e.target.closest('._popup-btn')) {
        e.preventDefault();

        popup({
            id: e.target.getAttribute('href'),
            html: html,
            body: body,
        })

    }

    // Галерея Попап
    if (e.target.classList.contains('_gallery-popup-link') || e.target.closest('._gallery-popup-link')) {
        let link = (e.target.closest('._gallery-popup-link')) ? e.target.closest('._gallery-popup-link') : e.target

        e.preventDefault()
        galleryPopup({
            link: link,
            html: html,
            body: body,
        });
    }

    // Скролл к секциям
    if (e.target.classList.contains('_btn-to-scroll')) {
        scrollToSection({
            e: e,
            menu: menu,
            header: header,
        })
    }
})


document.addEventListener('DOMContentLoaded', function () {
    // =-=-=-=-=-=-=-= СЛАЙДЕРЫ { =-=-=-=-=-=-=-=

    sliders.tariffSlider();


    // =-=-=-=-=-=-=-= } СЛАЙДЕРЫ =-=-=-=-=-=-=-=


    // =-=-=-=-=-=-=-= ТАЙМЕР { =-=-=-=-=-=-=-=

    let timerId = setInterval(timer, 1000);


    window.onfocus = function () {
        timerId = setInterval(timer, 1000);
    }
    window.onblur = function () {
        clearInterval(timerId);
    }
    // =-=-=-=-=-=-=-= ТАЙМЕР } =-=-=-=-=-=-=-=

    // =-=-=-=-=-=-=-= ГРАФИК { =-=-=-=-=-=-=-=

    chart();

    // =-=-=-=-=-=-=-= ГРАФИК } =-=-=-=-=-=-=-=

    // Media запросы {

    function debounce(func, time) {
        var time = time || 100;
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    var md = new MobileDetect(window.navigator.userAgent);

    let windowSize = window.innerWidth,
        resizeCheck = {};

    let appendBlock = document.querySelector('._append-to-menu'),
        headerNavBody = document.querySelector('.header__nav--body'),
        headerNavBlockBody = document.querySelector('.header__nav--block-body');


    function resizeCheckFunc(size, minWidth, maxWidth) {
        if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined)) {
            resizeCheck[String(size)] = true;

            minWidth(); // > size

        } else if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined)) {
            resizeCheck[String(size)] = false;
            maxWidth(); // < size

        }
    }

    function resize() {
        windowSize = window.innerWidth;

        resizeCheckFunc(768,
            function () {

                if (appendBlock && headerNavBody) {
                    headerNavBody.prepend(appendBlock);
                    appendBlock.classList.add('_visible');
                }

                sliders.reviewsSlider.desktopMode();

            },
            function () {

                if (appendBlock && headerNavBlockBody) {
                    headerNavBlockBody.prepend(appendBlock);
                    appendBlock.classList.add('_visible');
                }

                sliders.reviewsSlider.tableMode();

            });
    }

    resize();

    window.addEventListener("resize", debounce(resize, 150));


    if (header) {
        headerToggle({ header });
    }

    new VideoResponser('#intro-video')

    // Autoplay video IPhone low power mode not working (
    const mainVideoElem = document.getElementById('intro-video');
    mainVideoElem.play()
});


/* function loaded() {


}

window.onload = loaded */

// Анимация {

AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    offset: 50
});

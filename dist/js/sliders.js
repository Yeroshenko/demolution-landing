export function tariffSlider() {
    new Swiper('.tariffs__block', {
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
                centeredSlides: false,
                spaceBetween: 30,
                slidesPerView: 2,

            }
        }
    });

}

let slider;

export let reviewsSlider = {
    desktopMode: function () {
        if (slider) slider.destroy();
        slider = new Swiper('.reviews__block', {
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
    },
    tableMode: function () {
        if (slider) slider.destroy();
        slider = new Swiper('.reviews__block', {

            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,

            navigation: {
                nextEl: '.reviews__item--slider-arrow._next',
                prevEl: '.reviews__item--slider-arrow._prev',
            },


        });
    },
}


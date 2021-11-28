
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



const selectLists = document.querySelectorAll('._select-style')
let checkTabActive = false;

body.addEventListener('click', function (e) {

    // Меню в шапке
    if (e.target.classList.contains('_burger') || e.target.parentNode.classList.contains('_burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }

    // Выбор языка страницы
    if (e.target.classList.contains('_select-style-btn') || e.target.closest('._select-style-btn')) {
        
        if(e.target.closest('._select-style-btn')) {
            const parent = e.target.closest('._select-style');

            //parent.querySelector('._select-style-btn').classList.toggle('_active');
            parent.classList.toggle('_active');

        }

    } else if(!e.target.closest('._select-style')) {
        try {
            document.querySelector('._select-style').classList.remove('_active');
        }catch {}
        
    }

    // Табы
    if(e.target.classList.contains('_tab-link') || e.target.parentNode.classList.contains('_tab-link') && checkTabActive == false) {
        e.preventDefault();
        tab(e.target);
    }

    // Попап
    if(e.target.classList.contains('_popup-btn') || e.target.parentNode.classList.contains('_popup-btn')) {
        e.preventDefault();
        popup(e.target.getAttribute('href'));
    }

    // Скролл к секциям
    if(e.target.classList.contains('_btn-to-scroll')) {
    
      let section = document.querySelector(e.target.getAttribute('href'));

      if(section) {
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


// =-=-=-=-=-=-=-= СЛАЙДЕРЫ { =-=-=-=-=-=-=-=

const tariffSlider = new Swiper('.tariffs__block', {
    
    spaceBetween: 15,
    slidesPerView: 1,
  
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

const reviewsSlider = new Swiper('.reviews__block', {
    
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: true,

  navigation: {
    nextEl: '.reviews__item--slider-arrow._next',
    prevEl: '.reviews__item--slider-arrow._prev',
  },

  breakpoints: {
      1180: {
          slidesPerView: 3,
      }
    }
});

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
            timerElem.getAttribute('data-date-minute'));

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

const ctx = document.querySelectorAll('._chart-element');

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
          labels: {
            usePointStyle: true,
            font: {
              size: 12,
            }
          },
        }
      },  
      interaction: {
        intersect: false,
        mode: 'index',
      },
      
      scales: {
        y: {
          suggestedMin: 2000,
          suggestedMax: 6500,

          grid: {
            display: false,
            borderWidth: 0,
          }
        },
        x: {
          grid: {
            display: false,
            borderWidth: 0,
          }
        },
        
        
      }

      }
    
  
    /* options: {
      scales: {
          x: {
              type: 'time',
              time: {
                  displayFormats: {
                      quarter: 'MMM YYYY'
                  }
              }
          }
      }
  } */

});  
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
  if(windowSize >= 768 && resizeCheck == false) {
    resizeCheck = true;

    if(appendBlock) {
      headerNavBody.prepend(appendBlock);
      appendBlock.classList.add('_visible');
    }
    
  } else if(windowSize < 768 && resizeCheck == true) {
    resizeCheck = false;

    if(appendBlock) {
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
  
  if(top[0] >= 300 && top[1] == false) {

      top[1] = true;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function() {
          header.classList.add('_active');
          header.style.setProperty('--pos', '0%');
      },200);

  } else if(top[0] <= 300 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function() {
          header.style.setProperty('--pos', '0%');
          header.classList.remove('_active');
          
      },200);

  }
}

scrollPageFunc();

window.onscroll = scrollPageFunc;

}

scrollPage();

// Изменение шапки при скролле }


// Анимация {

wow = new WOW({
mobile:       false,
})
wow.init();

// }
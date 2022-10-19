export default function timer() {
    const timerElems = document.querySelectorAll('._timer');

    let deadline;

    timerElems.forEach(timerElem => {

      deadline = new Date(

        timerElem.getAttribute('data-date-year'),
        Number(timerElem.getAttribute('data-date-month') - 1),
        timerElem.getAttribute('data-date-day'),
        timerElem.getAttribute('data-date-hour'),
        Number(timerElem.getAttribute('data-date-minute')) + 1);

      const day = timerElem.querySelector('.tariffs__item--timer-day .tariffs__item--timer-value'),
        hour = timerElem.querySelector('.tariffs__item--timer-hours .tariffs__item--timer-value'),
        minute = timerElem.querySelector('.tariffs__item--timer-minute .tariffs__item--timer-value'),
        second = timerElem.querySelector('.tariffs__item--timer-second .tariffs__item--timer-value');

      const diff = deadline - new Date(),
        days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
        hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
        minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
        seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

        day.innerHTML = days.toString();
        hour.innerHTML = hours.toString();
        minute.innerHTML = minutes.toString();
        //second.innerHTML = seconds.toString();

    });
}

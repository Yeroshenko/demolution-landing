export default function headerToggle(arg) {
    function getCoords(elem) {
        const box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function scrollPage() {
        const offsetCheckJs = document.querySelector('.offset-check-js'),
            header = arg.header;

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

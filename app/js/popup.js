export default function popup(arg) {

    let popup, popupBg, popupCloseBtn,
        body = arg.body,
        html = arg.html;

    try {
        popup = document.querySelector(arg.id);
        popupBg = popup.querySelector('._popup-bg');
        popupCloseBtn = popup.querySelector('._popup-close-btn');

    } catch {
        return false;
    }

    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');

    body.classList.add('_popup-active');

    if (popup.classList.contains('_hidden')) popup.classList.remove('_hidden');

    //popup.style.transition = 'all .2s ease-in-out';
    setTimeout(function () {
        popup.classList.add('_active');
    }, 200)

    function removeFunc() {

        popup.classList.remove('_active');
        setTimeout(function () {
            body.classList.remove('_popup-active');
            html.style.setProperty('--popup-padding', '0px');
        }, 200)

    }

    popupBg.addEventListener('click', function () {
        removeFunc();
        setTimeout(function () {
            return false;
        }, 200)
    });

    popupCloseBtn.addEventListener('click', function () {
        removeFunc();
        setTimeout(function () {
            return false;
        }, 200)
    });

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 27) {
            removeFunc();
            setTimeout(function () {
                return false;
            }, 200)
        }
    })

}

//export default {popup};


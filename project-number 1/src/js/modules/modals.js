const modals = () => { 
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
             modal = document.querySelector(modalSelector),
             close =  document.querySelector(closeSelector),
             windows =  document.querySelectorAll('[data-modal]'),
             scroll = calcScrool();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // заморозка скролла
                document.body.style.marginRight = `${scroll}px` // дабавляем отступы
                // document.body.classList.add('modal-open')
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px` // убираем отступы

            // document.body.classList.remove('modal-open')
        });

        modal.addEventListener('click', (e) => { // при клике на экран модалка закрывается
            if (e.target === modal && closeClickOverlay) {

                windows.forEach(item => { // закрываем все не нужные модалки
                    item.style.display = 'none';
                });
    
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px` // убираем отступы

                // document.body.classList.remove('modal-open')
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden'; // заморозка скролла

        }, time)
    }

    function calcScrool() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height= '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; // получаем чистую прокрутку без padding
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000)
}

export default modals;
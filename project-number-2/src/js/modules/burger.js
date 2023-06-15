const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
        burgerElem  = document.querySelector(burgerSelector);
    
    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {// если у нас меню скрыто и ширина экрана меньше 993
            menuElem.style.display = 'block'; // мы его показываем
        } else {// но если, оно изначально показывалось, мы его скрываем
            menuElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => { // событие отслеживание изменения размера экрана
        if (window.screen.availWidth > 992) { // если ширина экрана больше 992 
            menuElem.style.display = 'none'; // cкрываем бургер меню
        }
    })
};

export default burger;
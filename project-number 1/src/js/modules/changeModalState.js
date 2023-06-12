import checkNumInputs from "./checkNumInputs";
const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img '), // все эти данные с которых мы будет получать данные со страницы
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');
    
    checkNumInputs('#width'); // вадидируем то, что нам нужно
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop){ // Cоздаем функция, которая на определенные элемент навязывает опеределенный обработчик события и записывает в опеределенное св-во в нашей глобальном объекте state
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName){
                    case "SPAN" :
                        state[prop] = i; //  номер по порядку с которым пользователь заимодействовал
                        break;
                    case "INPUT" :
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] == 'Теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            })
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case "SELECT" :
                        state[prop] = item.value;
                    break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form'); // привязывем к опеределенным элементам с определенными событиями
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type')
    bindActionToElems('change', windowProfile, 'profile')
};

export default changeModalState;
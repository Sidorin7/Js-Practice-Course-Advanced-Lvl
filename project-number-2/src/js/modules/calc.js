const calc = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionslBlock = document.querySelector(options),
    promocodelBlock = document.querySelector(promocode),
    resultlBlock = document.querySelector(result);
  let sum = 0;

  const calcFunc = () => {
    sum = Math.round(
      +sizeBlock.value * +materialBlock.value + +optionslBlock.value
    ); // В переменную sum присваиваем округленное значание-формулу от заказчика(т.к приходит ввиде строки ставим +)

    if (sizeBlock.value == "" || materialBlock == "") {
      // Если пользователь не заполнил первый или второй select
      resultlBlock.textContent =
        "Пожалуйста, выберете размер и материал картины"; // выводим подсказку
    } else if (promocodelBlock.value === "IWANTPOPART") {
      // а если пользователь ввел промокод
      resultlBlock.textContent = Math.round(sum * 0.7); // выводим сумму-стомость картины с 30 % скидкой
    } else {
      resultlBlock.textContent = sum; // Но если пользователь не ввел промо выводим обычную стоимость
    }
  };

  sizeBlock.addEventListener('change', calcFunc); // навешиваем обработчики событий
  materialBlock.addEventListener('change', calcFunc);
  optionslBlock.addEventListener('change', calcFunc);
  promocodelBlock.addEventListener('input', calcFunc);
};

export default calc;

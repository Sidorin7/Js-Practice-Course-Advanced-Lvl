const mask = (selector) => {
  let setCusorPosition = (pos, elem) => {
    elem.focus(); // в ручную установили фокус на элементе

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos); // ставим курсоры в одинаковую позицию
    } else if (elem.createTextRange) {
      let range = elem.createTextRange(); // диапазон

      range.collapse(true); // Объеденяем граничные точки деапозона(первую с последней)
      range.moveEnd("charater", pos); // Конечная точка выделения
      range.moveStart("charater", pos); // Определяем с какого сивола будет начанаться выдыление
      range.select(); // установим курсор веделим значение которое сформоровалось при помощи 2-х верхних параметров
    }
  };
  function createMask(event) {
    let matrix = "+7 (___) ___ __ __",
      i = 0, // итератор
      def = matrix.replace(/\D/g, ""), // буду получать все НЕ ЦИФРЫ
      val = this.value.replace(/\D/g, ""); // то что ввел пользователь

    if (def.length >= val.length) {
      // если кол-во цифр, которое останеться в матрицу после удаления все НЕ ЦИФР, если оно будет больше или равно кол-во цифры, которое будет в value
      val = def; // то заменяем значение на стандартное
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });

    if (event.type === "blur") {
      if (this.value.length == 2) {
        // если кол-во символов, которое сейчас находиться в input, будет равно 2(тоесть + и  7)
        this.value = ""; // очистили инпут
      }
    } else {
      setCusorPosition(this.value.length, this); // Функция установки позиции курсора(текущаяя ко-во символов в инпуте, ссылка на элемент)
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    // перебираем все интупы
    input.addEventListener("input", createMask); // навешиваем обработчик события и используем маску
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
  });
};

export default mask;

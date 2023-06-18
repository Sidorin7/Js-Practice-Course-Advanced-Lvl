export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      seccess: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Что-то пошло не так...",
      spinner: "assets/img/spinner.gif",
      ok: "assets/img/ok.png",
      fail: "assets/img/fail.png",
    };

    this.path = "assets/question.php";
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = "";
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener("keypress", function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          // проверяем если пользователь вводит русские символы и цифры от 0-9
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
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
      let matrix = "+1 (___) ___-____",
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

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      // перебираем все интупы
      input.addEventListener("input", createMask); // навешиваем обработчик события и используем маску
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  async postData(url, data) {
    // ФУНКЦИЯ отвечающая за отправку запроса
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach((item) => {
      item.addEventListener("submit", (e) => {
        e.preventDefault();
        let statusMessage = document.createElement("div"); // start Создаем блок для показа статуса отправки пользователю
        statusMessage.style.cssText = `
            margin-top: 15px;
            font-size: 18px;
            color: grey;
        `;
        item.parentNode.appendChild(statusMessage); // добовляем в родителя картинку
        statusMessage.textContent = this.message.loading;

        const formData = new FormData(item);

        this.postData(this.path, formData)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.seccess;
          })
          .catch(() => {
            statusMessage.textContent = this.message.console.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}

// import checkNumInputs from "./checkNumInputs";

const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name="upload"]');

  //   checkNumInputs('input[name="user_phone"]'); // валидация инпутов

  const message = {
    loading: "Загрузка...",
    seccess: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то пошло не так...",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const postData = async (url, data) => {
    // ФУНКЦИЯ отвечающая за отправку запроса
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = ""; // очистили инпут
    });
    upload.forEach(item => {
        item.previousElementSibling.textContent = 'Файл не выбран';
    })
  };

  upload.forEach(item => { // перебираем файл
    item.addEventListener('input', () => {
        console.log(item.files[0]); // выводим первый файл(namem, type ...)
        let dots; // это перменная будет содержать троеточие либо нечего
        const arr = item.files[0].name.split('.');
        arr[0].length > 6 ? dots = '...' : dots = '.'; // разбиваем стоку на 2 части(показано на примере) если строка более 5 символов то троекточик, иначе точка
        // 'fgsgsdfgdgdsfasdfsdggsfdg.jpg' => ['fgsgsdfgdgdsfasdfsdggsfdg', 'jpg'] // пример работы метода split()
        const name = arr[0].substring(0, 6) + dots + arr[1]; // вырезаем кусок строки от 0 до 5 символа + троекточие / точка + расширение
        item.previousElementSibling.textContent = name;
    })
  })

  form.forEach((item) => {
    // Перебираем формы
    item.addEventListener("submit", (e) => {
      // навешиваем обработчик событий submit
      e.preventDefault(); // Страница перезагружаться не будет
      let statusMessage = document.createElement("div"); // start Создаем блок для показа статуса отправки пользователю
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage); // добовляем в родителя картинку

      item.classList.add("animated", "fadeOutUp"); // форма становиться прозрачной
      setTimeout(() => {
        item.style.display = "none"; // форма исчезает
      }, 400);

      let statusImg = document.createElement("img"); // добавляем img
      statusImg.setAttribute("src", message.spinner); // заполняем атрибус src message.spinner(путь)
      statusImg.classList.add("animated", "fadeInUp"); // добавляем классы
      statusMessage.appendChild(statusImg); // помещаем блок на страницу

      let textMessage = document.createElement("div"); // добавляем элемент див на страницу
      textMessage.textContent = message.loading; // добавляем текст загрузки....
      statusMessage.appendChild(textMessage); // помещаем блок на страницу

      const formData = new FormData(item); // собираем все данные из этой формы
      let api;
      item.closest(".popup-design") || item.classList.contains("calc_form")
        ? (api = path.designer)
        : (api = path.question); // если класс .popup-design есть у родителя или есть класс calc_form,  то оправляем по  пути path.designer, если нету то по  path.question
      console.log(api);

      postData(api, formData) // отправляем запрос на сервер по вот этому адресу и данными formData
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", message.ok); // если у нас запрос ушел с положилетным результатом, то в aтрибус src подставляем ok
          textMessage.textContent = message.seccess;
        })

        .catch(() => {
          statusImg.setAttribute("src", message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            item.classList.remove("fadeOutUp");
            item.classList.add("fadeInUp");
          }, 5000);
        });
    });
  });
};

export default forms;

import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  checkNumInputs('input[name="user_phone"]'); // валидация инпутов

  const message = {
    loading: "Загрузка...",
    seccess: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData =  async (url, data) => { // ФУНКЦИЯ отвечающая за отправку запроса
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
        method: 'POST',
        body: data
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => {
        item.value = ''; // очистили инпут
    })
  }

  form.forEach((item) => { // Перебираем формы
    item.addEventListener("submit", (e) => { // навешиваем обработчик событий submit
      e.preventDefault(); // Страница перезагружаться не будет
      let statusMessage = document.createElement("div"); // start Создаем блок для показа статуса отправки пользователю
      statusMessage.classList.add("status");
      item.appendChild(statusMessage); // close отправляем 

      const formData = new FormData(item); // собираем все данные из этой формы
      if (item.getAttribute('data-calc') === 'end') { // Если это та форма, которая нас интересуем, то есть последняя
        for (let key in state) { // берем те данные из state, мы их перебираем, и отправляем в formData при помощи метода append()
          formData.append(key, state[key])
        }
      }

      postData('assets/server.php', formData) // отправляем запрос на сервер по вот этому адресу и данными formData
        .then(res => {
            console.log(res);
            statusMessage.textContent = message.seccess;
        })

        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    });
  });
};

export default forms;


const images = () => {
  const imgPopup = document.createElement("div"), // создаем модальное окно
    workSection = document.querySelector(".works"), // получаем общий блок для всех эти изображений
    bigImage = document.createElement("img"); // cоздаем изображение

  imgPopup.classList.add("popup"); // добавили класс popup
  workSection.appendChild(imgPopup); // делаем, чтобы окно появилась на странице

  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";

  imgPopup.appendChild(bigImage); // помещаем в это модальное окно изображение, которое только, что создал

  workSection.addEventListener("click", (e) => {
    // навешиваем обработчик события
    e.preventDefault(); // обнуляем дейсткия браузера


    let target = e.target;

    if (target && target.classList.contains('preview')) {
      // если пользователь кликнул в картинку и при этом у нее есть класс preview
      
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute("href"); // получаем атрибут href
      bigImage.setAttribute("src", path); // берем то изображение, которое есть внутри модального окна, используем setAttribute, устанавливаем src  в  позитию path (то что вытащили из ссылок)
    }

    if (target && target.matches("div.popup")) {
      //  если пользователь кликнул на подложку
      imgPopup.style.display = "none"; // скрываем модальное окно
    }
  });
};



export default images;

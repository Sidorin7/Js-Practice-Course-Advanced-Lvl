const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
    paused = false;
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      // если n больше чем число все слайдов
      slideIndex = 1; // возращаемся на первый слайд
    }

    if (n < 1) {
      // если  n меньше  1
      slideIndex = items.length; // то переносимся к последнему слайду
    }

    items.forEach((item) => {
      item.classList.add("animated");
      item.style.display = "none"; // скрываем не нужные слайды
    });

    items[slideIndex - 1].style.display = "block";
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n)); // добавляем слайд
  }

  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => {
      plusSlides(-1); // вызывем фуннкию и передаем значание -1, тоесть действие назад
      items[slideIndex - 1].classList.remove("slideInLeft"); // Удаляем класс
      items[slideIndex - 1].classList.add("slideInRight"); // Доб. класс
    });
    nextBtn.addEventListener("click", () => {
      plusSlides(1); // вызывем фуннкию и передаем значание 1, тоесть действие вперед
      items[slideIndex - 1].classList.remove("slideInRight"); // Удаляем класс
      items[slideIndex - 1].classList.add("slideInLeft"); // Доб. класс
    });
  } catch (e) {}

  function activateAnimation() {
    if (dir === "vertical") {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.add("slideInDown"); // Доб. класс
      }, 3000);
    } else {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.remove("slideInRight"); // Удаляем класс
        items[slideIndex - 1].classList.add("slideInLeft"); // Доб. класс
      }, 3000);
    }
  }
  activateAnimation();

  items[0].parentNode.addEventListener("mouseenter", () => {
    // находим родителя, навешиваем обработчик события(при наведение мыши)
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener("mouseleave", () => {
    // находим родителя, навешиваем обработчик события(при наведение мыши)
    activateAnimation();
  });
};

export default sliders;

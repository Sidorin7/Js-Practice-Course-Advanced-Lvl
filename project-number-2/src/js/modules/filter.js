const filter = () => {
  const menu = document.querySelector(".portfolio-menu"),
    items = document.querySelectorAll("li"),
    btnAll = menu.querySelector(".all"),
    btnLovers = menu.querySelector(".lovers"),
    btnChef = menu.querySelector(".chef"),
    btnGirl = menu.querySelector(".girl"),
    btnGuy = menu.querySelector(".guy"),
    btnGrandmother = menu.querySelector(".grandmother"),
    btnGranddad = menu.querySelector(".granddad"),
    wrapper = document.querySelector(".portfolio-wrapper"),
    markAll = wrapper.querySelectorAll(".all"),
    markGirl = wrapper.querySelectorAll(".girl"),
    markLovers = wrapper.querySelectorAll(".lovers"),
    markChef = wrapper.querySelectorAll(".chef"),
    markGuy = wrapper.querySelectorAll(".guy"),
    no = document.querySelector(".portfolio-no");

  const typeFilter = (markType) => {
    markAll.forEach((mark) => {
      mark.style.display = "none"; // скрываем все элементы
      mark.classList.remove("animated", "fadeIn");
    });

    no.style.display = "none";
    no.classList.remove("animated", "fadeIn");

    if (markType) {
      // если хотя бы что-то есть
      markType.forEach((mark) => {
        mark.style.display = "block"; // показывакем элементы
        mark.classList.add("animated", "fadeIn"); // добавляем. классы
      });
    } else {
      // если нечего не было то показывем скрытый блок с текстом
      no.style.display = "block"; // показывакем элементы
      no.classList.add("animated", "fadeIn"); // добавляем. классы
    }
  };

  btnAll.addEventListener("click", () => {
    // если кликнул на кнопку "показать все"
    typeFilter(markAll);
  });

  btnLovers.addEventListener("click", () => {
    // аналогично
    typeFilter(markLovers);
  });
  btnChef.addEventListener("click", () => {
    typeFilter(markChef);
  });
  btnGuy.addEventListener("click", () => {
    typeFilter(markGuy);
  });

  btnGirl.addEventListener("click", () => {
    typeFilter(markGirl);
  });

  btnGrandmother.addEventListener("click", () => {
    typeFilter(); // так как таких картины по ТЗ нету показываем блок "Таких портретов еще не далали"
  });

  btnGranddad.addEventListener("click", () => {
    typeFilter();
  });

  menu.addEventListener("click", (e) => {
    let target = e.target; // элемент, на которое будет происходить событие

    if (target && target.tagName == "LI") {
      // если пользователь кликнул в тэг Li
      items.forEach((btn) => btn.classList.remove("active")); // убрали класс активность со всех элементов меню
      target.classList.add("active"); // добавляем класс активность в элемент , который кликнул пользователь
    }
  });
};

export default filter;

// ЛИБО ЖЕ ТАК БОЛЕЕ КОРОТКО



// const filter = () => {
//   const menu = document.querySelector(".portfolio-menu"),
//     items = menu.querySelectorAll("li"),
//     wrapper = document.querySelector(".portfolio-wrapper"),
//     markAll = wrapper.querySelectorAll(".all"),
//     no = document.querySelector(".portfolio-no");

//   const typeFilter = (markType) => {
//     markAll.forEach((mark) => {
//       mark.style.display = "none"; // скрываем все элементы
//       mark.classList.remove("animated", "fadeIn");
//     });

//     no.style.display = "none";
//     no.classList.remove("animated", "fadeIn");

//     if (markType) {
//       // если хотя бы что-то есть
//       markType.forEach((mark) => {
//         mark.style.display = "block"; // показывакем элементы
//         mark.classList.add("animated", "fadeIn"); // добавляем. классы
//       });
//     } else {
//       // если нечего не было то показывем скрытый блок с текстом
//       no.style.display = "block"; // показывакем элементы
//       no.classList.add("animated", "fadeIn"); // добавляем. классы
//     }
//   };

//   items.forEach(item => {
//     item.addEventListener('click', (e) => {
//       const markType = wrapper.querySelectorAll(`.${e.target.classList[0]}`);
//       typeFilter(markType);
//     })
//   })
// };

// export default filter;

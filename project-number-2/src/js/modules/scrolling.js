// import { has } from "browser-sync";

const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      // если расстояние, которое мы уже пролистали больще 1650 px
      upElem.classList.add("animated", "fadeIn");
      upElem.classList.remove("fadeOut"); // скрываем элемент
    } else {
      // если расттояние(скролл) меньше 1650 px
      upElem.classList.add("fadeOut"); // скрываем элемент
      upElem.classList.remove("fadeIn");
    }
  });
  // ----------------------Scrolling with requestAnimationFrame---------------------- 

  let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;

  links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        let widthTop = document.documentElement.scrollTop,
            hash = this.hash,
            toBlock = document.querySelector(hash).getBoundingClientRect().top ,// вверхняя граница, до куда будем скроллить(header)
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) { // если анимация запускаеться первый раз
                start = time
            }

            let progress = time - start,
                r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) :  Math.min(widthTop + progress / speed, widthTop + toBlock)); // на сколько px продвинуть анимацию и в какую сторону

                document.documentElement.scrollTo(0, r); // запускаем скролл

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
        }

    })
  })


  // ----------------------Pure js scrolling----------------------

//   const element = document.documentElement,
//     body = document.body;
//   const calcScroll = () => {
//     // подсчет сколько нужно пролистать
//     upElem.addEventListener("click", function (e) {
//       let scrollTop = Math.round(body.scrollTop || element.scrollTop); // получаем сколько мы пролистали сверху
//       if (this.hash !== "") {
//         // если у нас хэш(#) не пустой
//         e.preventDefault();
//         let hashElement = document.querySelector(this.hash), // получаем элемент, к которому мы будем скроллить страницу(тоесть header)
//           hashElementTop = 0; // а сколько еще мне нужно пролистать до родителя этого hash элемента

//         while (hashElement.offsetParent) {
//           // пока родитель hash элемент будет существовать
//           hashElementTop += hashElement.offsetTop; // а сколько px осталось у нас до вверхней границы родительского элемента от hash элемента
//           hashElement = hashElement.offsetParent;
//         }

//         hashElementTop = Math.round(hashElementTop);
//         smoothScroll(scrollTop, hashElementTop, this.hash);
//       }
//     });
//   };
//   const smoothScroll = (from, to, hash) => {
//     // принимает - откужа мы будет начанать, куда, и hash
//     let timeInterval = 1, // значение, через которое будет происходить анимация
//       prevScrollTop,
//       speed;

//     if (to > from) {
//       speed = 30;
//     } else {
//       speed = -30;
//     }

//     let move = setInterval(function () {
//       let scrollTop = Math.round(body.scrollTop || element.scrollTop);

//       if (
//         prevScrollTop === scrollTop ||
//         (to > from && scrollTop >= to) ||
//         (to < from && scrollTop <= to)
//       ) {
//         clearInterval(move);
//         history.replaceState(
//           history.state,
//           document.title,
//           location.href.replace(/#.*$/g, "") + hash
//         );
//       } else {
//         body.scrollTop += speed;
//         element.scrollTop += speed;
//         prevScrollTop = scrollTop;
//       }
//     }, timeInterval);
//   };

//   calcScroll();
};

export default scrolling;

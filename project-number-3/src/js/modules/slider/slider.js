export default class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = null,
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    this.slides = this.container.children; // получаем всех детей, которые есть на этой станицу
    this.btns = document.querySelectorAll(btns); // 2 стрелки
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

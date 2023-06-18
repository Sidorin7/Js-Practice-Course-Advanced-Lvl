export default class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = null,
    animate,
    autoplay,
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children; // получаем всех детей, которые есть на этой станицу
    } catch (error) {}
    this.btns = document.querySelectorAll(btns); // 2 стрелки
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

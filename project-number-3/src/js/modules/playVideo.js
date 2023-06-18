export default class VideoPlayer {
  constructor(triggers, oveplay) {
    this.btns = document.querySelectorAll(triggers);
    this.oveplay = document.querySelector(oveplay);
    this.close = this.oveplay.querySelector(".close");
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (document.querySelector('iframe#frame')){ // если iframe уже был создан
            this.oveplay.style.display = "flex";

        } else {
            const path = btn.getAttribute("data-url");
    
            this.createPlayer(path);
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
        this.oveplay.style.display = "none";
        this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
    });

    console.log(this.player);
    this.oveplay.style.display = "flex";
  }

  init() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0]; // находим первый скрипт на странцце
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // обращаемся к главнуму родителю, перед 1 скриптом помещаем наш скрипт
    this.bindTriggers();
    this.bindCloseBtn();
}
}

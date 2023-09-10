class Main {
  constructor() {
    this.topicsContainer = document.querySelector('[data-topics-container]');

    this.init();
  }

  initTopicsAnimation() {
    let counter = 0;

    const initAnimation = setInterval(() => {
      const quantity = this.topicsContainer.querySelectorAll('.topics__item').length;
      if (counter < quantity) {
        this.topicsContainer.querySelectorAll('.topics__item')[counter].classList.add('wiggle-animation');
        counter++
      } else clearInterval(initAnimation);
    }, 400);
  };

  init() {
    window.simpleEnglish.global.playClick();
    this.initTopicsAnimation();
  }
};

new Main();
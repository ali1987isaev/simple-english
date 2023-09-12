class Words {
  constructor() {
    this.index = 0;
    this.expressions = [];
    this.global = window.simpleEnglish.global;
    this.card = document.querySelector('[data-card]');
    this.wordEn = this.card.querySelector('[data-word-en]');
    this.expression = this.card.querySelector('[data-expression]');
    this.wordRu = this.card.querySelector('[data-word-ru]');
    this.counter = document.querySelector('[data-counter]');
    this.prev = document.querySelector('[data-button-prev]');
    this.next = document.querySelector('[data-button-next]');
    this.voiceOutput = document.querySelector('[data-generate-voice-output]');

    this.init();
  }

  initCardAnimation() {
    this.card.classList.toggle('card--rendered');
  }

  initCard() {
    setTimeout(() => {
      this.initCardAnimation();
    }, 50);
    this.wordEn.textContent = this.expressions[this.index].en
    this.expression.textContent = this.expressions[this.index].ex
    this.wordRu.textContent = this.expressions[this.index].ru
    this.initCounter();
  }

  setWords() {
    this.global
      .getExpressions().then(data => {
        this.expressions = data;
        this.initCard();
      });
  }

  initFlippetCardsHandler() {
    this.card.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('button')
        || e.target.tagName.toUpperCase() === 'SVG'
        || e.target.tagName.toUpperCase() === 'PATH'
      ) return;

      this.card.classList.toggle('card__flipped');
      this.global.playFlick();
    });
  }

  initSlider() {
    this.prev.addEventListener('click', () => {
      this.initCardAnimation();
      if (this.index > 0) {
        this.index--;
        this.initCard();
      } else {
        this.index = this.expressions.length - 1
        this.initCard();
      }
      this.global.playSwap();
    })
    this.next.addEventListener('click', () => {
      this.initCardAnimation();
      if (this.index < this.expressions.length - 1) {
        this.index++;
        this.initCard();
      } else {
        this.index = 0;
        this.initCard();
      }
      this.global.playSwap();
    })
  }

  initCounter() {
    this.counter.textContent = `${this.index +1} / ${this.expressions.length}`
  }

  generateVoice() {
    this.voiceOutput.addEventListener('click', () => {
      this.global.generateVoiceOutput(this.expressions[this.index].en)
    })
  }

  init() {
    this.global.playClick();
    this.setWords();
    this.initFlippetCardsHandler();
    this.initSlider();
    this.generateVoice();
  }
}

new Words();

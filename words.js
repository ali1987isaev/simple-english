class Words {
  constructor() {
    this.index = 0;
    this.words = [];
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
    this.card.classList.add('card--rendered');
  }

  initCard() {
    setTimeout(() => {
      this.initCardAnimation();
    }, 50);
    this.wordEn.textContent = this.words[this.index].en
    this.expression.textContent = this.words[this.index].ex
    this.wordRu.textContent = this.words[this.index].ru
    this.initCounter();
  }

  setWords() {
    this.global
      .getWords().then(data => {
        this.words = data;
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
    });
  }

  initSlider() {
    this.prev.addEventListener('click', () => {
      this.card.classList.remove('card--rendered');
      if (this.index > 0) {
        this.index--;
        this.initCard();
      } else {
        this.index = this.words.length - 1
        this.initCard();
      }
    })
    this.next.addEventListener('click', () => {
      this.card.classList.remove('card--rendered');
      if (this.index < this.words.length - 1) {
        this.index++;
        this.initCard();
      } else {
        this.index = 0;
        this.initCard();
      }
    })
  }

  initCounter() {
    this.counter.textContent = `${this.index +1} / ${this.words.length}`
  }

  generateVoice() {
    this.voiceOutput.addEventListener('click', () => {
      this.global.generateVoiceOutput(this.words[this.index].en)
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

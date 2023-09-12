class CollectWords {
  constructor() {
    this.index = 0;
    this.words = [];
    this.result = '';
    this.global = window.simpleEnglish.global;
    this.currentWordEn = document.querySelector('[data-word-en]');
    this.currentWordRu = document.querySelector('[data-word-ru]');
    this.selectedLettersResult = document.querySelector('[data-selected-letters-result]');
    this.counter = document.querySelector('[data-counter]');
    this.letterButtonsContainer = document.querySelector('[data-letter-buttons-container]');
    this.checkResult = document.querySelector('[data-check-the-result]');

    this.init();
  }

  renderCurrentWord() {
    this.currentWordRu.textContent = this.words[this.index].ru
    this.initCounter()
  }

  setWords() {
    this.global
      .getWords().then(data => {
        this.words = data;
        this.renderCurrentWord();
      });
  }

  initCounter() {
    this.counter.textContent = `${this.index +1} / ${this.words.length}`
  }

  generateVoice() {
    this.voiceOutput.addEventListener('click', () => {
      this.global.generateVoiceOutput(this.words[this.index].en)
    })
  }

  checkResultButtonStatus() {
    if (this.result.length < 1) {
      this.checkResult.disabled = true;
      this.checkResult.classList.remove('wiggle-animation');
    } else {
      this.checkResult.disabled = false;
      this.checkResult.classList.add('wiggle-animation');
    }
  }

  initLetterButtonClick() {
    let letterButtonsArr = [];
    let lettersArr = []

    this.letterButtonsContainer.addEventListener('click', (e) => {
      if (!e.target.tagName.toUpperCase() === "BUTTON") return;


      const letter = e.target.dataset.letterType;
      this.global.playSwap();

      if (letter !== 'delete' && letter !== 'space') {
        const item = `<button class="button button--primary" type="button">${letter}</button>`;
        letterButtonsArr.push(item);
        lettersArr.push(letter)

        this.selectedLettersResult.innerHTML = letterButtonsArr.join().replaceAll(",", "");
        this.result = lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();

      } else if (letter === 'delete' && letter !== 'space') {
        if (!letterButtonsArr.length) return;
        letterButtonsArr.pop();
        lettersArr.pop();
        this.selectedLettersResult.innerHTML = letterButtonsArr.join().replaceAll(",", "");
        this.result = lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();

      } else if (letter !== 'delete' && letter === 'space') {
        if (!letterButtonsArr.length) return;
        const item = `<button class="button button--primary button--space" type="button"></button>`;
        letterButtonsArr.push(item);
        lettersArr.push(' ');

        this.selectedLettersResult.innerHTML = letterButtonsArr.join().replaceAll(",", "");
        this.result = lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();
      };
    })
  }

  initCheckResult() {
    this.checkResult.addEventListener('click', () => {
      if (this.result.toLocaleLowerCase().trim() === this.words[this.index].en.toLocaleLowerCase().trim()) {
        this.global.playCorrect();
        this.currentWordEn.textContent = this.words[this.index].en;
      } else {
        this.global.playError();
      };
    });
  }

  init() {
    this.global.playClick();
    this.setWords();
    this.initLetterButtonClick();
    this.initCheckResult();
  }
}

new CollectWords();

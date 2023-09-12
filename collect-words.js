class CollectWords {
  constructor() {
    this.index = 0;
    this.words = [];
    this.result = '';
    this.letterButtonsArr = [];
    this.lettersArr = [];
    this.global = window.simpleEnglish.global;
    this.content = document.querySelector('[main-content]');
    this.currentWordEn = this.content.querySelector('[data-word-en]');
    this.currentWordRu = this.content.querySelector('[data-word-ru]');
    this.selectedLettersResult = this.content.querySelector('[data-selected-letters-result]');
    this.counter = this.content.querySelector('[data-counter]');
    this.letterButtonsContainer = this.content.querySelector('[data-letter-buttons-container]');
    this.checkResult = this.content.querySelector('[data-check-the-result]');
    this.nextButton = this.content.querySelector('[data-next]');
    this.collectWordsFinish = document.querySelector('[collect-words-finish]');

    this.init();
  }

  renderCurrentWord() {
    if (!!this.words[this.index]) {
      this.currentWordRu.textContent = this.words[this.index].ru
      this.initCounter()
    } else {
      // finish!
      this.content.classList.add('hidden');
      this.collectWordsFinish.classList.remove('hidden');
      this.global.playFinish();
    }
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
    this.letterButtonsContainer.addEventListener('click', (e) => {
      if (!e.target.tagName.toUpperCase() === "BUTTON") return;


      const letter = e.target.dataset.letterType;
      this.global.playSwap();

      if (letter !== 'delete' && letter !== 'space') {
        const item = `<button class="button button--primary" type="button">${letter}</button>`;
        this.letterButtonsArr.push(item);
        this.lettersArr.push(letter)

        this.selectedLettersResult.innerHTML = this.letterButtonsArr.join().replaceAll(",", "");
        this.result = this.lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();

      } else if (letter === 'delete' && letter !== 'space') {
        if (!this.letterButtonsArr.length) return;
        this.letterButtonsArr.pop();
        this.lettersArr.pop();
        this.selectedLettersResult.innerHTML = this.letterButtonsArr.join().replaceAll(",", "");
        this.result = this.lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();

      } else if (letter !== 'delete' && letter === 'space') {
        if (!this.letterButtonsArr.length) return;
        const item = `<button class="button button--primary button--space" type="button"></button>`;
        this.letterButtonsArr.push(item);
        this.lettersArr.push(' ');

        this.selectedLettersResult.innerHTML = this.letterButtonsArr.join().replaceAll(",", "");
        this.result = this.lettersArr.join().replaceAll(",", "");
        this.checkResultButtonStatus();
      };
    })
  }

  clearData() {
    this.result = '';
    this.currentWordEn.textContent = '';
    this.selectedLettersResult.innerHTML = '';
    this.letterButtonsArr = [];
    this.lettersArr = [];
    this.nextButton.classList.add('hidden');
    this.checkResult.classList.remove('hidden');
    this.checkResult.classList.remove('wiggle-animation');
    this.checkResult.disabled = true;
  }

  initNextWord() {
    this.nextButton.addEventListener('click', () => {
      this.index++;
      this.renderCurrentWord();
      this.clearData();
    })
  }

  initCheckResult() {
    this.checkResult.addEventListener('click', () => {
      if (this.result.toLocaleLowerCase().trim() === this.words[this.index].en.toLocaleLowerCase().trim()) {
        this.global.playCorrect();
        this.currentWordEn.textContent = this.words[this.index].en;

        this.checkResult.classList.add('hidden');
        this.nextButton.classList.remove('hidden');
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
    this.initNextWord();
  }
}

new CollectWords();

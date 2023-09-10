class Guess {
  constructor() {
    this.index = 0;
    this.words = [];
    this.randomArray = [];
    this.currentWord = '';
    this.container = document.querySelector('[guess-container]');
    this.theEnd = document.querySelector('[guess-end]');
    this.guessWord = this.container.querySelector('[data-guess-word]');
    this.guessOption = this.container.querySelectorAll('[data-guess-option]');
    this.guessWordNumber = this.container.querySelector('[guess-word-number]');
    this.quessNextButton = this.container.querySelector('[data-guess-next-button]');
    this.guessWordVoice = this.container.querySelector('[data-guess-word-voice]');

    this.init();
  }

  clearData() {
    this.guessOption.forEach(button => {
      button.disabled = false;
      button.classList.contains('button--correct') && button.classList.remove('button--correct')
    });
    this.quessNextButton.classList.remove('wiggle-animation');
    this.quessNextButton.disabled = true;
  }

  initNextWord() {
    this.quessNextButton.addEventListener('click', () => {
      this.index++;
      window.simpleEnglish.global.playClick();
      this.clearData();
      this.generateGuessItem();
    })
  }

  checkResult(e) {
    const result = e.target.dataset.guessOption;
    if (result === this.currentWord) {
      this.quessNextButton.disabled = false;
      window.simpleEnglish.global.playCorrect();
      e.target.classList.add('button--correct');

      this.guessOption.forEach(button => {
        button.classList.remove('wiggle-animation');
        if (button.dataset.guessOption !== result) {
          button.disabled = true;
        }
      });

      this.quessNextButton.classList.add('wiggle-animation');
    } else {
      window.simpleEnglish.global.playError();
    };
  }

  generateRandomWords() {
    // generate new arr with current word and with other but different words
    this.randomArray = [];
    this.randomArray.push(this.words[this.index]);
    let newArr = this.words.filter(el => el.en !== this.words[this.index].en);

    for (let index = 1; index < this.guessOption.length; index++) {
      const randomEl = newArr[Math.floor(Math.random() * newArr.length)]
      newArr = newArr.filter(el => el.en !== randomEl.en)
      // mix words to put them in different positions
      Math.floor(Math.random() * 10) % 2 ? this.randomArray.push(randomEl) : this.randomArray.unshift(randomEl)
    };
  }

  generateGuessItem() {
    if (!!this.words[this.index]) {
      this.guessWord.textContent = this.words[this.index].en;
      this.currentWord = this.words[this.index].ru;

      this.generateRandomWords();

      this.guessOption.forEach((option, idx) => {
        option.textContent = this.randomArray[idx].ru;
        option.dataset.guessOption = this.randomArray[idx].ru;
  
        // add check result functionality:
        option.addEventListener('click', this.checkResult.bind(this), { once: true });
      });
  
      this.guessWordNumber.textContent = `${this.index + 1} / ${this.words.length}`;
      window.simpleEnglish.global.initButtonAnimation(this.guessOption);
    } else {
      this.container.style.display = 'none';
      this.theEnd.style.display = 'flex';
      window.simpleEnglish.global.playFinish();
    }
  }

  initGuessWord() {
    window.simpleEnglish.global
      .getWords().then(data => {
        this.words = data;
        this.generateGuessItem();
      });
  }

  initWordVoice() {
    this.guessWordVoice.addEventListener('click', () => {
      window.simpleEnglish.global.generateVoiceOutput(this.words[this.index].en);
    });
  }

  init() {
    window.simpleEnglish.global.playClick();
    this.initGuessWord();
    this.initNextWord();
    this.initWordVoice();
  }
}



new Guess();

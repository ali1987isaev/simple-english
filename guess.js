class Guess {
  constructor() {
    this.index = 0;
    this.words = [];
    this.randomArray = [];
    this.currentWord = '';
    this.lives = 5;
    this.global = window.simpleEnglish.global;
    this.container = document.querySelector('[guess-container]');
    this.theEnd = document.querySelector('[guess-end]');
    this.gameOver = document.querySelector('[guess-game-over]');
    this.guessWord = this.container.querySelector('[data-guess-word]');
    this.guessWordExample = this.container.querySelector('[data-guess-word-example]');
    this.guessOption = this.container.querySelectorAll('[data-guess-option]');
    this.guessWordNumber = this.container.querySelector('[guess-word-number]');
    this.quessNextButton = this.container.querySelector('[data-guess-next-button]');
    this.guessWordVoice = this.container.querySelector('[data-guess-word-voice]');
    this.numberOfLives = document.querySelector('[data-number-of-lives]');

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
      !this.guessWordExample.classList.contains('hidden-up') && this.guessWordExample.classList.add('hidden-up');
      this.index++;
      this.global.playClick();
      this.clearData();
      this.generateGuessItem();
    })
  }

  checkResult(e) {
    const result = e.target.dataset.guessOption;
    
    if (result === this.currentWord) {
      this.quessNextButton.disabled = false;
      this.global.playCorrect();
      e.target.classList.add('button--correct');

      this.guessOption.forEach(button => {
        button.classList.remove('wiggle-animation');
        if (button.dataset.guessOption !== result) {
          button.disabled = true;
        }
      });

      this.quessNextButton.classList.add('wiggle-animation');
    } else {
      this.lives > 0 && this.global.playError();
      this.lives--;
      this.inittNumberOfLives();

      if (this.lives < 3) {
        this.numberOfLives.querySelectorAll('svg').forEach(el => el.classList.add('scale-animation'));
      };

      if (this.lives < 1) {
        this.container.style.display = 'none';
        this.gameOver.style.display = 'flex';
        this.global.playGameOver();
      };
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

  initOptionsCheckResult() {
    this.guessOption.forEach((option) => {
      option.addEventListener('click', this.checkResult.bind(this));
    });
  }

  generateGuessItem() {
    if (!!this.words[this.index]) {
      this.guessWord.textContent = this.words[this.index].en;
      this.guessWordExample.textContent = this.words[this.index].ex;
      this.currentWord = this.words[this.index].ru;

      this.generateRandomWords();

      this.guessOption.forEach((option, idx) => {
        option.textContent = this.randomArray[idx].ru;
        option.dataset.guessOption = this.randomArray[idx].ru;
      });
  
      this.guessWordNumber.textContent = `${this.index + 1} / ${this.words.length}`;
      this.global.initButtonAnimation(this.guessOption);
    } else {
      this.container.style.display = 'none';
      this.theEnd.style.display = 'flex';
      this.global.playFinish();
    }
  }

  initGuessWord() {
    this.global
      .getWords().then(data => {
        this.words = data;
        this.generateGuessItem();
      });
  }

  initWordVoice() {
    this.guessWordVoice.addEventListener('click', () => {
      this.global.generateVoiceOutput(this.words[this.index].en);
    });
  }

  inittNumberOfLives() {
    this.global.generateNumberOfLives(this.numberOfLives, this.lives);
  }

  initShowExample() {
    this.guessWord.addEventListener('click', () => {
      this.guessWordExample.classList.toggle('hidden-up');
    });
  }

  init() {
    this.global.playClick();
    this.initGuessWord();
    this.initShowExample();
    this.initOptionsCheckResult();
    this.initNextWord();
    this.initWordVoice();
    this.inittNumberOfLives();
  }
}

new Guess();

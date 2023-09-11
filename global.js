class Global {
  constructor() {
  }

  async getWords() {
    const res =  await fetch('./words.json');
    const data = await res.json();
    return data;
  }

  /**
   * 
   * @param {arr} arr of DOM elements 
   */
  initButtonAnimation(elements) {
    let counter = 0;

    const initAnimation = setInterval(() => {
      const quantity = elements.length;

      if (counter < quantity) {
        elements[counter].classList.add('wiggle-animation');
        counter++
      } else clearInterval(initAnimation);
    }, 400);
  }

  checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal.en;
    });
  }

  playCorrect() {
    const audioElem = new Audio();
    audioElem.src = './correct.wav';
    audioElem.play();
  }

  playSwap() {
    const audioElem = new Audio();
    audioElem.src = './swap.wav';
    audioElem.play();
  }

  playFlick() {
    const audioElem = new Audio();
    audioElem.src = './flick.wav';
    audioElem.play();
  }

  playError() {
    const audioElem = new Audio();
    audioElem.src = './error.wav';
    audioElem.play();
  }

  playFinish() {
    const audioElem = new Audio();
    audioElem.src = './finish.wav';
    audioElem.play();
  }

  playGameOver() {
    const audioElem = new Audio();
    audioElem.src = './game-over.wav';
    audioElem.play();
  }

  playClick() {
    const audioElem = new Audio();
    audioElem.src = './click.wav';
    const promise = audioElem.play();
    if(promise !== undefined){
      promise.then(() => {
        audioElem.play()
      }).catch(error => {
        audioElem.muted = true;
      });
    };
  }

  generateVoiceOutput (message) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(`${message}`);
    utterThis.lang = "en-US";
    utterThis.rate = 0.9;
    synth.speak(utterThis);
  }

  generateNumberOfLives(element, counter) {
    let html = ''

    for (let i = 0; i < counter; i++) {
      html += `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      `
    };

    element.innerHTML = html;
  }
}

window.simpleEnglish = {};
window.simpleEnglish.global = new Global();
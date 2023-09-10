class Global {
  constructor() {
  }

  async getWords() {
    const res =  await fetch('./words.json');
    const data = await res.json();
    return data;
  }

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

  playError() {
    const audioElem = new Audio();
    audioElem.src = './error.wav';
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
}

window.simpleEnglish = {};
window.simpleEnglish.global = new Global();
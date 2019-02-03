const UIController = (() => {
  const DOMStrings = {
    input: ".pipeify-form__input",
    btn: ".pipeify-form__btn",
    label: "pipeify-form__label",
  };
  
  return {
    getDOMStrings: () => DOMStrings,
    getInput: () => document.querySelector(DOMStrings.input).value,
  };
})();

// const textProcessController = (() => {
//   return {

//   };
// });

const controller = ((UICtrl) => {
  const processText = (input) => 
    input
      .split(' ')
      .filter(word => word !== '')
      .map(word => {
        console.log(word)
        const punctuation = [',', '.', ':', ';', '!', '?'];
        // if word contains punctuation
        if (punctuation.some((elm) => word.indexOf(elm) >= 0)) {
          const newWord = `${word.replace(/(.)$/, '|$1|')}`
          return newWord;
        }
        return `${word}|`;
      })
      .join(' ');

  const setupEventListeners = () => {
    DOMElms = UICtrl.getDOMStrings();
    document.querySelector(DOMElms.btn).addEventListener('click', () => {
      processText(UICtrl.getInput());
    });

    document.addEventListener('keydown', (e) => {
      if (e.charCode === 13) {
        processText(UICtrl.getInput());
      }
    });
  }

  return setupEventListeners();

})(UIController);
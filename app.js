const UIController = (() => {
  const DOMStrings = {
    input: '.pipeify-form__input',
    btn: '.pipeify-form__btn',
    label: 'pipeify-form__label',
    output: '.pipeify-result__output',
    copyBtn: '.pipeify-result__copy-btn',
  };
  
  return {
    getDOMStrings: () => DOMStrings,
    getInput: () => document.querySelector(DOMStrings.input).value,
    showResult: (str) => {
      document.querySelector(DOMStrings.output).value = str;
    },
    copyResult: () => {
      document.querySelector(DOMStrings.output).select();
      document.execCommand('copy');
      console.log('Copied!');
    }
  };
})();

const textProcessController = (() => {
  return {
    processText:(input) => 
      input
        .split(' ')
        .filter(word => word !== '')
        .map(word => {
          const punctuation = [',', '.', ':', ';', '!', '?'];
          // if word contains punctuation
          if (punctuation.some((elm) => word.indexOf(elm) >= 0)) {
            return `${word.replace(/(.)$/, '|$1|')}`
          }
          return `${word}|`;
        })
        .join(' '),
  };
})();

const controller = ((UICtrl, textProcessCtrl) => {
  const runProcessor = () => {
    // get input
    const resultString = textProcessCtrl.processText(UICtrl.getInput());

    UICtrl.showResult(resultString);
    UICtrl.copyResult();
  };

  const setupEventListeners = () => {
    DOMElms = UICtrl.getDOMStrings();
    document.querySelector(DOMElms.btn).addEventListener('click', () => {
      runProcessor();
    });

    document.addEventListener('keydown', (e) => {
      if (e.charCode === 13) {
        runProcessor();
      }
    });

    document.querySelector(DOMElms.input).addEventListener('keydown', (e) => {
      if(e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        runProcessor();
      }
    });

    document.querySelector(DOMElms.copyBtn).addEventListener('click', (e) => {
        UICtrl.copyResult();
    });
  };

  return setupEventListeners();

})(UIController, textProcessController);
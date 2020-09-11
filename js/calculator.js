const calculator = (() => {
  const Model = (() => {
    const model = {
      history: '',
      output: '',
      operator: '',
    };

    return model;
  })();

  const View = (() => {
    const setOutput = (output) => {
      const outputTag = document.querySelector('.calculator__result__output');
      outputTag.textContent = output;

      if (output.toString().length > 10) {
        outputTag.style.fontSize = '28px';
      } else if (output.toString().length > 7) {
        outputTag.style.fontSize = '48px';
      } else {
        outputTag.style.fontSize = '68px';
      }
    };

    const setHistory = (history) => {
      const historyTag = document.querySelector('.calculator__result__history');
      historyTag.textContent = history;
    };

    return {
      setOutput,
      setHistory,
    };
  })();

  const Controller = (() => {
    const clickOperator = (e) => {
      const stringOutput = Model.output.toString();

      let output;

      switch (e.target.id) {
        case 'clear':
          Model.output = '';
          Model.history = '';
          Model.operator = '';
          View.setOutput('');
          View.setHistory('');
          break;

        case 'backspace':
          if (stringOutput) {
            const newOutput = stringOutput.substr(0, stringOutput.length - 1);
            Model.output = newOutput;
            View.setOutput(newOutput);
          }
          break;

        case '=':
          //if you didn't choose operator, do nothing
          if (Model.operator === '') {
            return;
          } else {
            let result = getResult();
            Model.output = result;
            Model.history = '';
            View.setOutput(result);
            View.setHistory('');
          }
          break;

        default:
          // if there is output, calculate them or just put them on history
          if (Model.output !== '') {
            if (Model.output === '-') {
              return;
            }
            if (Model.history !== '') {
              let result = getResult();
              Model.history = result;
            } else if (Model.history === '') {
              Model.history = Model.output;
            }
            Model.operator = e.target.id;
            Model.output = '';
            View.setHistory(Model.history + Model.operator);
            View.setOutput(Model.output);

            // if there is no output and there is history, put operator next to the history number
          } else if (Model.output === '') {
            if (Model.history !== '') {
              Model.operator = e.target.id;
              View.setHistory(Model.history + Model.operator);

              //if there is no output and history, then do nothing expent the operator was '-'
            } else if (Model.history === '') {
              if (Model.operator === '' && e.target.id === '-') {
                Model.operator = e.target.id;
                Model.output = Model.operator;
                View.setOutput(Model.output);
              }
              return;
            }
          }

          break;
      }
    };

    const clickNumber = (e) => {
      let output = Model.output;
      let newOutput = output + e.target.id;
      Model.output = newOutput;
      View.setOutput(newOutput);
    };

    const getResult = () => {
      const history = Number(Model.history);
      const output = Number(Model.output);
      const operator = Model.operator;

      let result;

      switch (operator) {
        case '+':
          result = history + output;
          break;
        case '-':
          result = history - output;
          break;
        case '*':
          result = history * output;
          break;
        case '%':
          result = history % output;
          break;
        case '/':
          result = history / output;
          break;
      }

      Model.operator = '';
      return result;
    };

    const operatorsListener = () => {
      const operators = document.querySelectorAll(
        '.calculator__keyboard__operator',
      );
      operators.forEach((operator) => {
        return operator.addEventListener('click', (e) => clickOperator(e));
      });
    };

    const numbersListener = () => {
      const numbers = document.querySelectorAll(
        '.calculator__keyboard__number',
      );
      numbers.forEach((number) => {
        return number.addEventListener('click', (e) => clickNumber(e));
      });
    };

    return {
      operatorsListener,
      numbersListener,
    };
  })();

  Controller.operatorsListener();
  Controller.numbersListener();
})();

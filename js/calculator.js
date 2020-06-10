const getHistory = () => (
    document.querySelector('.history_value').innerText
)

const printHistory = (num) => {
    document.querySelector('.history_value').innerText = num;
}

const getOutput = () => (
    document.querySelector('.output_value').innerText
)

const printOutput = (num) => {
    if(num === "") {
        document.querySelector('.output_value').innerText = num;
    }else{
        document.querySelector('.output_value').innerText = getFormattedNumber(num);
    }
}

const getFormattedNumber = (num) => {
    if(num === "-"){
        return "";
    }else{
        let number = Number(num);
        let value = number.toLocaleString("en");
        return value;
    }
}

const getReverseFormattedNumber = (num) => (
    Number(num.replace(/,/g,''))
)


//when click numbers,
const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        let output = getReverseFormattedNumber(getOutput());

        if(output !== NaN) {
            output = output + event.target.id;
            printOutput(output);
        }
    })
});


// when click operations,
const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        let output = getOutput();
        let history = getHistory();

        if(event.target.id === 'clear') {
            printHistory('');
            printOutput('');
        }else if(event.target.id === 'backspace') {
            let output = getReverseFormattedNumber(getOutput()).toString();
            
            if(output){
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        }else if(output === "" && history !== "") {
            if(isNaN(history[history.length-1])){
                history = history.substr(0, history.length-1);
            }
        }else if(output !== "" || history !== "") {
            output = output === "" ? output : getReverseFormattedNumber(output);
            history = history + output;

            if(event.target.id === "="){
                let result = eval(history);
                printOutput(result);
                printHistory("");
            }else{
                history = history + event.target.id;
                printOutput("");
                printHistory(history);
            } 
        }
    })
})
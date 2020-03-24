window.addEventListener('load', ()=> {
    
    function getHistory(){
        return document.querySelector('.history-value').innerText;
    }
    function printHistory(num){
        document.querySelector('.history-value').innerText = num;
    }
    function getOutput(){
        return document.querySelector('.output-value').innerText;
    }
    function printOutput(num){
        if(num==""){
            document.querySelector('.output-value').innerText = '';
        }else{
            document.querySelector('.output-value').innerText = getFormattedNumber(num);
        }
    }
    function getFormattedNumber(num){
        if(num=="-"){
            return '';
        }
        var value = Number(num).toLocaleString("en");
        return value;
    }
    function getReverseFormattedNumber(num){
        return Number(num.replace('/,/g',''));
    }

    var operator = document.querySelectorAll('.operator');
    for(var i = 0; i < operator.length; i++ ){
        operator[i].addEventListener('click', function(){
            if(this.id == "clear"){
                printHistory('');
                printOutput('');
            }else if(this.id == "backspace"){
                var output = getReverseFormattedNumber(getOutput()).toString();
                if(output){
                    output = output.substr(0, output.length-1);
                    printOutput(output);
                }
            }else{
                var output = getOutput();
                var history = getHistory();
                if(output == "" && history != ""){
                    if(isNaN(history[history.length-1])){
                        history = history.substr(0, history.length-1);
                    }
                }else if(output != "" || history != ""){
                    output = output ==""?
                    output:getReverseFormattedNumber(output);
                    history = history + output;
                    if(this.id == "="){
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    }else{
                        history = history + this.id;
                        printOutput("");
                        printHistory(history);
                    } 
                }
            }
        })
    }

    var number = document.querySelectorAll('.number');
    for(var i = 0; i < number.length; i++ ){
        number[i].addEventListener('click', function(){
            var output = getReverseFormattedNumber(getOutput());
            if(output != NaN){
                output = output + this.id;
                printOutput(output);
            }
        })
    }

}); 
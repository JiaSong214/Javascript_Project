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
            document.querySelector('.output-value').innerText = num;
        }else{
            document.querySelector('.output-value').innerText = getFormattedNumber(num);
        }
    }
    function getFormattedNumber(num){
        if(num=="-"){
            return "";
        }
        var n = Number(num);
	    var value = n.toLocaleString("en");
	    return value;
    }
    function getReverseFormattedNumber(num){
        return Number(num.replace(/,/g,''));
    }

    const operator = document.querySelectorAll('.operator');
    for(i = 0; i < operator.length; i++ ){
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

                if(output == "" && history != ""){ //output이 비어있고, history가 있는 경우에
                    if(isNaN(history[history.length-1])){
                        history = history.substr(0, history.length-1);
                    }
                }else if(output != "" || history != ""){ //output이 있거나, history가 있으면
                    output = output == "" ? output:getReverseFormattedNumber(output);
                    //output이 비어있으면 output 반환, 비어있지 않으면 일반 스트링으로 변환해서 반환
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
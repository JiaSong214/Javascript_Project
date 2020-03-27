window.addEventListener('load', ()=> {
    //date
    const today = new Date();

    const monthNames = ["JAN", "FEB", "MAR", "APRIL", "MAY", "JUNE",
    "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    const date = today.getDate();
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const day = dayNames[today.getDay()];
    
    document.querySelector(".date").innerText = date;
    document.querySelector(".year").innerText = year;
    document.querySelector(".month").innerText = month;
    document.querySelector(".day").innerText = day;


    //to-do list
    const toDoForm = document.querySelector(".add-item");
    const toDoInput = toDoForm.querySelector("input");
    const toDoList = document.querySelector(".list"); 

    const TODOS_LS = 'toDos';
    let toDos = [];

    //get localstorage when window load
    if(localStorage.getItem(TODOS_LS) !== null){
        JSON.parse(localStorage.getItem(TODOS_LS)).forEach(function(toDo){
            addToDo(toDo.text);
        });
    }else if(localStorage.getItem(TODOS_LS) == null){
        addToDo("Study Javascript :)");
    }

    //submit new to-do
    toDoForm.addEventListener("submit", function(){
        event.preventDefault();
        addToDo(toDoInput.value);
        toDoInput.value = "";
    }); 

    function addToDo(todo){
        const item = document.createElement("li");
        item.classList.add("item");
        item.id = toDos.length + 1;

        const text = document.createElement("p");
        text.classList.add("text");
        text.innerText = todo;

        const compelete = document.createElement("span");
        compelete.classList.add("compelete");
        compelete.addEventListener("click", compeleteToDo);

        const remove = document.createElement("span");
        remove.classList.add("remove");
        remove.innerHTML="&times;"
        remove.addEventListener("click", removeToDo);

        const list = document.querySelector(".list");
        list.appendChild(item);
        item.append(compelete, text, remove);

        const toDoObject =  {
            text : todo,
            compelete: "No",
            id : item.id
        };
        toDos.push(toDoObject); 
        saveToDos();
    }

    function removeToDo(event){
        const removeBtn = event.target;
        const item = removeBtn.parentNode;
        toDoList.removeChild(item);

        const cleanToDos =  toDos.filter(function(toDo){ 
            return parseInt(toDo.id) !== parseInt(item.id);
        });
        toDos = cleanToDos;
        saveToDos();
    }

    function compeleteToDo(event){
        const compeleteBtn = event.target;
        const item = compeleteBtn.parentNode;

        if(toDos[item.id-1].compelete == "No"){
            toDos[item.id-1].compelete = "Yes";
            item.classList.add("compelete");
        }else{
            toDos[item.id-1].compelete = "No";
            item.classList.remove("compelete");
        }
        saveToDos();
    }

    function saveToDos(){
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //로컬스토리지에 toDos를 TODOS_LS의 키로 저장한다.
    };

});
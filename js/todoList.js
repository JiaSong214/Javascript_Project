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
    
    document.querySelector(".todoList-date").innerText = date;
    document.querySelector(".todoList-year").innerText = year;
    document.querySelector(".todoList-month").innerText = month;
    document.querySelector(".todoList-day").innerText = day;

    //to-do list
    const toDoList = document.querySelector(".todoList-list"); 
    const toDoForm = document.querySelector(".add_todo");
    const toDoInput = toDoForm.querySelector("#todoList-input");

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
    toDoForm.addEventListener("submit", function(event){
        event.preventDefault();
        addToDo(toDoInput.value);
        toDoInput.value = "";
    }); 


    function addToDo(todo){
        const todo_item = document.createElement("li");
        todo_item.classList.add("todo_item");
        todo_item.id = toDos.length + 1;

        const todo_text = document.createElement("p");
        todo_text.classList.add("todo_text");
        todo_text.innerText = todo;

        // const todo_created_time = document.createElement("p");
        // todo_created_time.classList.add("todo_created_time");
        // const created_time = today.getHours()+":"+today.getMinutes()+" on "+month+" "+date;
        // todo_created_time.innerText = "Created at "+ created_time;

        const compelete_todo = document.createElement("span");
        compelete_todo.classList.add("compelete_todo");
        compelete_todo.addEventListener("click", compeleteToDo);

        const remove_todo = document.createElement("span");
        remove_todo.classList.add("remove_todo");
        remove_todo.innerHTML="&times;"
        remove_todo.addEventListener("click", removeToDo);

        const todo_list = document.querySelector(".todoList-list");
        todo_list.appendChild(todo_item);
        // const todo_contents_box = document.createElement("div");
        // todo_contents_box.classList.add("todo_contents_box");
        todo_item.append(compelete_todo, todo_text, remove_todo);
        // todo_contents_box.append(todo_text, todo_created_time);

        const toDoObject =  {
            id : todo_item.id,
            text : todo,
            compelete: "No",
            // created_at: created_time
        };
        toDos.push(toDoObject); 
        saveToDos();
    }

    function removeToDo(event){
        const removeBtn = event.target;
        const todo_item = removeBtn.parentNode;
        toDoList.removeChild(todo_item);

        const cleanToDos =  toDos.filter(function(toDo){ 
            return parseInt(toDo.id) !== parseInt(todo_item.id);
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
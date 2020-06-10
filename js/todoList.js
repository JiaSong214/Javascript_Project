//date
const today = new Date();
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

document.querySelector(".todoList-date").innerText = today.getDate();
document.querySelector(".todoList-year").innerText = today.getFullYear();
document.querySelector(".todoList-month").innerText = monthNames[today.getMonth()];
document.querySelector(".todoList-day").innerText = dayNames[today.getDay()];

const toDoList = document.querySelector(".todoList-list"); 
const toDoForm = document.querySelector(".add_todo");
const toDoInput = toDoForm.querySelector("#todoList-input");

const TODOS_LS = 'toDos';
let toDos = [];


//handle form submit event
toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submit_time = new Date();
    const current_time = `at ${submit_time.getHours()}:${submit_time.getMinutes()} on ${monthNames[submit_time.getMonth()]} ${submit_time.getDate()}`;

    addToDo('No', toDoInput.value, current_time);
    toDoInput.value = '';
}); 


//handle add to-do evnet 
const addToDo = (compelete, text, created_time) => {
    const todo_item = document.createElement('li');
    todo_item.classList.add('todo_item');
    todo_item.id = toDos.length + 1;

    const todo_text = document.createElement('p');
    todo_text.classList.add('todo_text');
    todo_text.innerText = text;

    const todo_created_time = document.createElement('p');
    todo_created_time.classList.add('todo_created_time');
    todo_created_time.innerText = `Created ${created_time}`;

    const compelete_todo = document.createElement('span');
    compelete_todo.classList.add('compelete_todo');
    if(compelete == 'Yes'){
        todo_item.classList.add('compelete');
    }
    compelete_todo.addEventListener('click', compeleteToDo);

    const remove_todo = document.createElement('span');
    remove_todo.classList.add('remove_todo');
    remove_todo.innerHTML='&times;'
    remove_todo.addEventListener('click', removeToDo);

    const todo_list = document.querySelector('.todoList-list');
    todo_list.appendChild(todo_item);

    const todo_contents_box = document.createElement('div');
    todo_contents_box.classList.add('todo_contents_box');

    todo_item.append(compelete_todo, todo_contents_box, remove_todo);
    todo_contents_box.append(todo_text, todo_created_time);

    const toDoObject =  {
        id : todo_item.id,
        compelete: compelete,
        text : text,
        created_time: created_time
    };
    toDos.push(toDoObject);
    saveToDos();
}


//handle remove to-do event
const removeToDo = (event) => {
    const removeBtn = event.target;
    const todo_item = removeBtn.parentNode;
    toDoList.removeChild(todo_item);

    const cleanToDos =  toDos.filter((toDo) => { 
        return parseInt(toDo.id) !== parseInt(todo_item.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


//handle compelete to-do event
const compeleteToDo = (event) => {
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


//save in user's local storage
const saveToDos = () => {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};


//get user's local storage to-do list when window loaded
if(localStorage.getItem(TODOS_LS) !== null) {
    JSON.parse(localStorage.getItem(TODOS_LS)).forEach((toDo) => {
        addToDo(toDo.compelete, toDo.text, toDo.created_time);
    });
}else{
    addToDo("Yes", "Study Javascript :)", "a month ago");
    addToDo("No", "Go for a walk", "3 days ago");
};
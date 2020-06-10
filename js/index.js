//drag and move
const dragBars = document.querySelectorAll('.drag_bar');
let mouseDown = false;
let offset = [];
let index;

//drag bar move event
dragBars.forEach((eachBar, i) => {
    eachBar.addEventListener('mousedown', (event) => {
        mouseDown = true;
        index = i;

        event.target.parentElement.style.zIndex = '99';
        event.target.parentElement.style.opacity = '0.8';
        offset = [
            event.target.parentElement.offsetLeft - event.clientX,
            event.target.parentElement.offsetTop - event.clientY
        ];
        
        document.addEventListener('mouseup', () => {
            mouseDown = false;
            eachBar.parentElement.style.zIndex = '1';
            eachBar.parentElement.style.opacity = '1';
        });
    });
});

document.addEventListener('mousemove', () => {
    if(mouseDown == true){
        dragBars[index].parentElement.style.left = (event.clientX + offset[0]) + 'px';
        dragBars[index].parentElement.style.top  = (event.clientY + offset[1]) + 'px';
    }
});

//task bar event
const taskBar = document.querySelector('#task_bar');
const taskBar_icons = taskBar.querySelectorAll('div');
const elements_container = document.querySelector('#container');
const elements = Array.from(elements_container.children);

elements.forEach((element, i) => {
    if(element.classList.contains('invisible')){
        taskBar_icons[i].classList.remove('active');
    }else{
        taskBar_icons[i].classList.add('active');
    }
});

taskBar_icons.forEach((eachIcon, i) => {
    eachIcon.addEventListener('click', () => {
        if(elements[i].classList.contains('invisible')){
            elements[i].classList.remove('invisible');
            this.classList.add('active');
        }else{
            elements[i].classList.add('invisible');
            this.classList.remove('active');
        }
    });
});

//window close event
dragBars.forEach((eachBtn, i) => {
    eachBtn.children[0].addEventListener('click', () => {
        elements[i].classList.add('invisible');
        taskBar_icons[i].classList.remove('active');
    });
});
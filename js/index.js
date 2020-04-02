window.addEventListener('load', ()=> {

    //drag and move
    const dragBars = document.querySelectorAll(".drag_bar");
    let mouseDown = false;
    let offset = [];
    let index;

    dragBars.forEach(function(eachBar, i){
        eachBar.addEventListener("mousedown", function(){
            mouseDown = true;
            index = i;
            this.parentElement.style.zIndex = "99";
            this.parentElement.style.opacity = "0.8";
            offset = [
                this.parentElement.offsetLeft - event.clientX,
                this.parentElement.offsetTop - event.clientY
            ];
            
            document.addEventListener('mouseup', function(){
                mouseDown = false;
                eachBar.parentElement.style.zIndex = "1";
                eachBar.parentElement.style.opacity = "1";
            });
        });
    });

    document.addEventListener("mousemove", function(){
        if(mouseDown == true){
            dragBars[index].parentElement.style.left = (event.clientX + offset[0]) + 'px';
            dragBars[index].parentElement.style.top  = (event.clientY + offset[1]) + 'px';
        }
    });
    
    //task bar
    const taskBar = document.querySelector("#task_bar");
    const taskBar_icons = taskBar.querySelectorAll("div");
    const elements_container = document.querySelector("#container");
    const elements = Array.from(elements_container.children);

    elements.forEach(function(element, i){
        if(element.classList.contains("invisible")){
            taskBar_icons[i].classList.remove("active");
        }else{
            taskBar_icons[i].classList.add("active");
        }
    });

    taskBar_icons.forEach(function(eachIcon, i){
        eachIcon.addEventListener("click", function(){
            if(elements[i].classList.contains("invisible")){
                elements[i].classList.remove("invisible");
                this.classList.add("active");
            }else{
                elements[i].classList.add("invisible");
                this.classList.remove("active");
            }
        });
    });

    dragBars.forEach(function(eachBtn, i){
        eachBtn.children[0].addEventListener("click", function(){
            elements[i].classList.add("invisible");
            taskBar_icons[i].classList.remove("active");
        });
    });

});
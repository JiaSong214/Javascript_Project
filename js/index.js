window.addEventListener('load', ()=> {

    const elements = document.getElementsByClassName('element');
    let mouseDown = false;

    for(i=0; i < elements.length; i++){

        elements[i].addEventListener('mousedown', function(event) {
            mouseDown = true;
            this.style.zIndex = "99";

            this.addEventListener('mousemove', function(event) {
                // event.preventDefault();
                if(mouseDown){
                    this.style.left = (event.clientX  - 150) + 'px';
                    this.style.top  = (event.clientY - 150) + 'px'; 
                }
            }, true);

            this.addEventListener('mouseup', function() {
                mouseDown = false;
                this.style.zIndex = "1";
             }, true);
        }, true);

    }

    //to-do list drag
    const toDoListDrag = document.querySelector('.topSection');
    const toDoList = toDoListDrag.parentElement.parentElement;
    let toDoMouseDown = false;
    
    toDoListDrag.addEventListener('mousedown', function(event){
        toDoMouseDown = true;
        toDoList.style.zIndex="99";
    });
    document.addEventListener('mousemove', function(event){
        event.preventDefault();
        if(toDoMouseDown){
            toDoList.style.left = (event.clientX  - 150) + 'px';
            toDoList.style.top  = (event.clientY - 100) + 'px'; 
        }
    });
    document.addEventListener('mouseup', function(){
        toDoMouseDown= false;
        toDoList.style.zIndex="1";
    });

    //paint drag 
    const paintDragButton = document.querySelector('.dragBtn');
    const paint = paintDragButton.parentElement;
    let paintMouseDown = false;

    paintDragButton.addEventListener('mousedown', function(event){
        paintMouseDown = true;
        paint.style.zIndex="99";
    });
    document.addEventListener('mousemove', function(event){
        event.preventDefault();
        if(paintMouseDown){
            paint.style.left = (event.clientX  - 80) + 'px';
            paint.style.top  = (event.clientY - 50) + 'px'; 
        }
    });
    document.addEventListener('mouseup', function(){
        paintMouseDown= false;
        paint.style.zIndex="1";
    });
});
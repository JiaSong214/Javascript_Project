window.addEventListener('load', ()=> {

    const dragBar = document.querySelectorAll(".drag_bar");
    let mouseDown = false;

    for(i=0; i<dragBar.length; i++){
        dragBar[i].addEventListener('mousedown', function(event){
            mouseDown = true;
            this.parentElement.style.zIndex = "99";
            this.parentElement.style.opacity = "0.8";
        });
    };

    document.addEventListener('mousemove', function(event){
        event.preventDefault();
        const element = event.target.parentElement;
        if(mouseDown == true && element.parentElement.id == "container"){
            element.style.left = (event.clientX - element.offsetWidth + 100 ) + 'px';
            element.style.top  = (event.clientY - 30 ) + 'px';
        }
        }, true);

    document.addEventListener('mouseup', function(){       
        mouseDown = false;
        for(i=0; i<dragBar.length; i++){
            dragBar[i].parentElement.style.zIndex = "1";
            dragBar[i].parentElement.style.opacity = "1";
        }
    }, true);
    const test = document.querySelector(".test_button");
    test.addEventListener("click", function(){
        alert("click");
    })

});
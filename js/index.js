window.addEventListener('load', ()=> {

    const dragBar = document.querySelectorAll(".drag_bar");
    let mouseDown = false;

    for(i=0; i < dragBar.length; i++){
        dragBar[i].addEventListener('mousedown', function(event) {
            mouseDown = true;
            this.parentElement.style.zIndex = "99";
            // this.parentElement.style.opacity = "0.5";

            this.addEventListener('mousemove', function(event) {
                event.preventDefault();
                if(mouseDown){
                    this.parentElement.style.left = (event.clientX - this.parentElement.offsetWidth + 100 ) + 'px';
                    this.parentElement.style.top  = (event.clientY - 30 ) + 'px';
                }
            }, true);

            window.addEventListener('mouseup', function() {
                mouseDown = false;
                this.parentElement.style.zIndex = "1";
                // this.parentElement.style.opacity = "1";
            }, true);
        });
    };


});
window.addEventListener('load', ()=> {

    const dragButtons = document.querySelectorAll(".drag-button");
    let mouseDown = false;

    for(i=0; i < dragButtons.length; i++){
        dragButtons[i].addEventListener('mousedown', function(event) {
            mouseDown = true;
            this.parentElement.style.zIndex = "99";

            this.addEventListener('mousemove', function(event) {
                event.preventDefault();
                if(mouseDown){
                    this.parentElement.style.left = (event.clientX - this.parentElement.offsetWidth - 60 ) + 'px';
                    this.parentElement.style.top  = (event.clientY - 50 ) + 'px';
                }
            }, true);

            window.addEventListener('mouseup', function() {
                mouseDown = false;
                this.parentElement.style.zIndex = "1";
            }, true);
        });
    };

});
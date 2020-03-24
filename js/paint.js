window.addEventListener('load', ()=> {
    
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    const colors = document.querySelectorAll(".color");
    const range = document.getElementById("widthRange");
    const mode = document.getElementById("mode");
    const saveBtn = document.getElementById("save");
    
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    ctx.fillRect(0,0, 618, 500);

    let painting = false;
    let filling = false;

    function startPainting(){
        painting = true;
    }
    function stopPainting(){
        painting = false;
    }
    function onMouseMove(event){
        const x = event.offsetX;
        const y = event.offsetY;
        // var rect = canvas.getBoundingClientRect();
        // const x = event.clientX - rect.left;
        // const y = event.clientY - rect.top;
        console.log(x,y);
        
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
    function handleColorClick(event){
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    function handleRangeChange(event){
        const size = event.target.value;
        ctx.lineWidth = size;
    }
    function handleModeClick(event){
        if(filling===true){
            filling = false;
            mode.innerText = "FILL";
        }else{
            filling = true;
            mode.innerText = "PAINT";
        }
    }
    function handleCanvasClick(event){
        if(filling){
            ctx.fillRect(0,0, 618, 500);
        }
    }
    // function handleCM(event){
    //     event.preventDefault();
    // }
    function handleSaveClick(event){
        const image = canvas.toDataURL("img/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "paintJS";
        link.click();
    }

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup",stopPainting);
        canvas.addEventListener("mouseleave",stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        // canvas.addEventListener("contextmenu", handleCM);
    }

    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorClick)
    );

    if(range){
        range.addEventListener("input", handleRangeChange)
    }
    if(mode){
        mode.addEventListener("click", handleModeClick)
    }
    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick)
    }
});
window.addEventListener('load', ()=> {
    
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    const tools_container = document.querySelector(".tools");
    const tools = tools_container.querySelectorAll("button");
    const colors = document.querySelectorAll(".color");
    // const saveBtn = document.getElementById("save");
    
    canvas.width = 618;
    canvas.height = 600;

    //default setting
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;

    let painting = false;
    let filling = false;

    //pick a tool
    for(i=0; i<tools.length; i++){
        tools[i].addEventListener("click", function(event){
            for(j=0; j<tools.length; j++){
                tools[j].style.top = "0px";
                painting = false;
                filling = false;
                ctx.globalAlpha = 1;
            }
            event.target.style.top = "-20px";
        });
    }

    //tool setting
    const pencil = document.querySelector("#pencil");
    const pen = document.querySelector("#pen");
    const marker = document.querySelector("#marker");
    const paint = document.querySelector("#paint");

    pencil.addEventListener("click", function(){
        painting = true;
        ctx.lineWidth = 1;
    });
    pen.addEventListener("click", function(){
        painting = true;
        ctx.lineWidth = 3;
    });
    marker.addEventListener("click", function(){
        painting = true;
        ctx.lineWidth = 10;
        ctx.globalAlpha = 0.01;
    });
    paint.addEventListener("click", function(){
        filling = true;
    });


    function startPainting(){
        painting = true;
    };
    
    function stopPainting(){
        painting = false;
    };

    function onMouseMove(event){
        const x = event.offsetX;
        const y = event.offsetY;
        
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
        }else{
            ctx.lineTo(x, y);
            ctx.stroke();
        };
    };

    function handleColorClick(event) {
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    };

    function handleRangeChange(event) {
        const size = event.target.value;
        ctx.lineWidth = size;
    };

    function handleCanvasClick(){
        if(filling){
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
    };

    function handleCM(event){
        event.preventDefault();
    };

    function handleSaveClick(){
        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "PaintJS";
        link.click();
    };

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    };

    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );

    // if(saveBtn){
    //     saveBtn.addEventListener("click", handleSaveClick);
    // };

});
const canvas = document.querySelector(".paint_canvas");
const ctx = canvas.getContext("2d");
const tools_container = document.querySelector(".tools");
const tools = tools_container.querySelectorAll("button");
const pencil = tools_container.querySelector("#pencil");
const pen = tools_container.querySelector("#pen");
const marker = tools_container.querySelector("#marker");
const paint = tools_container.querySelector("#paint");
const colors = document.querySelectorAll(".color");

canvas.width = 618;
canvas.height = 600;

//default setting
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 1;

let drawing = false;
let filling = false;

//pick a tool
for(i=0; i<tools.length; i++){
    tools[i].addEventListener("click", function(event){
        for(j=0; j<tools.length; j++){
            tools[j].style.top = "0px";
            drawing = false;
            filling = false;
            ctx.globalAlpha = 1;
        }
        event.target.style.top = "-20px";
    });
};

//tool setting
pencil.addEventListener("click", function(){
    ctx.lineWidth = 1;
});
pen.addEventListener("click", function(){
    ctx.lineWidth = 3;
});
marker.addEventListener("click", function(){
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.01;
});
paint.addEventListener("click", function(){
    filling = true;
});

//pick the colors
Array.from(colors).forEach(color =>
    color.addEventListener("click", function(event){
        for(i=0; i<colors.length; i++){
            colors[i].classList.remove("on");
        };
        event.target.classList.add("on");
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
);

function startDrawing(){
    drawing = true;
};
function stopDrawing(){
    drawing = false;
};

//drawing
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!drawing){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    };
};

//painting
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
};

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("click", handleCanvasClick);
};
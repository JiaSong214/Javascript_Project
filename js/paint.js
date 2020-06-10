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
ctx.fillStyle = "white";
ctx.lineWidth = 1;

let drawing = false;
let filling = false;


//pick a tool
tools.forEach(tool => {
    tool.addEventListener('click', (event) => {
        //make everything to default setting
        tools.forEach(eachTool => {
            eachTool.style.top = '0px';
            drawing = false;
            filling = false;
            ctx.globalAlpha = 1;
        })
        event.target.style.top = '-20px';
    })
})


//tool setting
pencil.addEventListener('click', () => {
    ctx.lineWidth = 1;
});
pen.addEventListener('click', () => {
    ctx.lineWidth = 3;
});
marker.addEventListener('click', () => {
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.01;
});
paint.addEventListener('click', () => {
    filling = true;
});


//pick the colors
colors.forEach(color =>
    color.addEventListener('click', (event) => {
        //make it to default setting
        colors.forEach(eachColor => {
            eachColor.classList.remove('on');
        });

        const color = event.target.style.backgroundColor;
        event.target.classList.add('on');
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
);


//drawing
const onMouseMove = (event) => {
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
const onCanvasClick = () => {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
};


if(canvas){
    canvas.addEventListener('mousedown', () => ( drawing = true ));
    canvas.addEventListener('mouseup', () => ( drawing = false ));
    canvas.addEventListener('mouseleave', () => ( drawing = false ));
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onCanvasClick);
};
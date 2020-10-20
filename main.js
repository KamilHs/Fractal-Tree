const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

ctx.fillRect(0, 0, canvas.width, canvas.height);


let x = canvas.width / 2;
let y = canvas.height;
let len = 250;
let precision = 10;

let angle = Math.PI / 4;
const ratio = 2 / 3;

const angleSlider = document.createElement('input');
angleSlider.type = "range";

angleSlider.min = 0;
angleSlider.max = 180;
angleSlider.step = 0.01;
angleSlider.value = angle * 180 / Math.PI;


angleSlider.style.position = "absolute";
angleSlider.style.right = "1%";
angleSlider.style.top = "1%";

angleSlider.addEventListener('input', (e) => {
    angle = +e.target.value * Math.PI / 180;
    reset();
    draw(len);
})

document.body.append(angleSlider);

const lenSlider = document.createElement('input');
lenSlider.type = "range";

lenSlider.min = 1;
lenSlider.max = 1000;
lenSlider.step = 10;
lenSlider.value = len;

lenSlider.style.position = "absolute";
lenSlider.style.right = "1%";
lenSlider.style.top = "4%";

lenSlider.addEventListener('input', (e) => {
    len = +e.target.value;
    reset();
    draw(len);
})

document.body.append(lenSlider);


const precisionSlider = document.createElement('input');
precisionSlider.type = "range";

precisionSlider.min = -20;
precisionSlider.max = -1;
precisionSlider.step = 1;
precisionSlider.value = -precision;

precisionSlider.style.position = "absolute";
precisionSlider.style.right = "1%";
precisionSlider.style.top = "7%";

precisionSlider.addEventListener('input', (e) => {
    precision = -+e.target.value;
    reset();
    draw(len);
})

document.body.append(precisionSlider);



function reset() {
    ctx.rotate(0);
    ctx.resetTransform();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(x, y);
}



function draw(len) {
    if (len < precision) return;
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${(len / 2 * Math.floor(Math.random() * 255)) % 255},${(len * Math.floor(Math.random() * 255)) % 255},${(len * 2 / 3 * Math.floor(Math.random() * 255)) % 255})`
    ctx.moveTo(0, 0);
    ctx.lineTo(0, - len);
    ctx.stroke();
    ctx.translate(0, -len);
    ctx.save();
    ctx.rotate(angle);
    draw(len * ratio);
    ctx.restore();
    ctx.save();
    ctx.rotate(-angle);
    draw(len * ratio);
    ctx.restore();
    ctx.closePath();
}
ctx.translate(x, y);
draw(len);


/*
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'grey';
ctx.fillRect(50, 200, 150, 150);


function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '10pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    writeMessage(canvas, message);
}, false);
*/


function writeMessage(canvas, message) {
    let context = canvas
    //let context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '12pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}




let vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

let canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    cx = null,
    fps = 30,
    bX = 30,
    bY = 30,
    mX = 150,
    mY = 300,
    lastTime = Date.now(),
    currentTime = 0,
    delta = 0;

cx = canvas.getContext('2d');

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = Date.now()
    delta = (currentTime - lastTime) / 1000;
    cx.clearRect(0, 0, cw, cw);

    cx.beginPath();
    cx.fillStyle = 'teal';
    cx.arc(bX, bY, 40, 0, 2 * Math.PI );
    cx.fill();
    if (bX >= cw || bX <= 0) {
        mX *= -1;
    }
    if (bY >= ch || bY <= 0) {
        mY *= -1;
    }

    bX += (mX * delta);
    bY += (mY * delta);

    lastTime = currentTime;

    writeMessage(cx, Number(1/delta).toFixed(0))
}


gameLoop()

/*
if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');

    gameLoop();
}
*/
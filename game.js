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




function random_int(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max + 1));
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


function a_circle(x, y, radius, color) {
    cx.beginPath();
    cx.fillStyle = color;
    cx.arc(cw * x, ch * y, cw * radius, ch * radius, 360 * Math.PI);
    cx.fill();
}

first_draw = true
new_pick = true;
current_message = 'START';
color_pick = 0;
last_color_pick = 0;
number_completed = -1;

function pick_color() {
    if (new_pick == true) {

        last_color_pick = color_pick;
        color_pick = random_int(1, 10); // first chance of being different must be half of reciprocal it will be naturally different
        if (color_pick <= 6) {
            color_pick = random_int(0, 5);
        }
        else color_pick = last_color_pick;
        new_pick = false;
    }
    if (color_pick == 0) this.color = 'lime';
    else if (color_pick == 1) this.color = 'pink';
    else if (color_pick == 2) this.color = 'red';
    else if (color_pick == 3) this.color = 'teal';
    else if (color_pick == 4) this.color = 'orange';
    else if (color_pick == 5) this.color = 'purple';
    a_circle(0.5, 0.5, 0.3, color);
    //writeMessage()
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);


    if (first_draw == true) {
        
        cx.clearRect(0, 0, cw, cw);
        draw_buttons();
        color_pick = 0;
        last_color_pick = 0;
        current_message = 'START'
        first_draw = false;

        pick_color();
        writeMessage(current_message);
    }

    currentTime = Date.now()
    delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    //this.writeMessage(cx, Number(1/delta).toFixed(0))

}

writeMessage = function (message, col = 'black', x = cw*0.45, y = ch*0.5) {
    //let context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    cx.font = '20pt Calibri';
    cx.fillStyle = col;
    cx.fillText(message, x, y);
}

function is_left(){
    if (number_completed > -1) {
        if (last_color_pick != color_pick) {
            current_message = 'CORRECT';
            number_completed++;
        }
        else {
            current_message = 'START';
            number_completed = -1;
        }
    }
    else {
        number_completed = 0;
    }
    before_changing_color();
}

function is_right(){
    if (number_completed > -1) {
        if (last_color_pick == color_pick) {
            current_message = 'CORRECT';
            number_completed++;
        }
        else {
            current_message = 'START'
            number_completed = -1;
        }

    }
    else {
        number_completed = 0;
    }
    before_changing_color();
}

addEventListener('keydown', e => {
    if (e.keyCode == 37) { // left
        is_left();
    }
    else if (e.keyCode == 38) { //up

    }
    else if (e.keyCode == 39) { // right
        is_right();
    }
    else if (e.keyCode == 40) { // down

    }
})
/*
canvas.addEventListener('touchstart', e => {
    let rect = canvas.getBoundingClientRect();
    startx = e.targetTouches[0].pageX - rect.left;
    starty = e.targetTouches[0].pageY - rect.top;
    touched_button(startx,starty);
})
*/
canvas.addEventListener('mousedown', e => {
    let rect = canvas.getBoundingClientRect();
    startx = e.clientX - rect.left;
    starty = e.clientY - rect.top;
    touched_button(startx,starty);
})

function touched_button(startx,starty){
    if(startx < 250 && starty > 400){
        is_left();
    }
    if(startx > 250 && starty > 400){
        is_right();
    }
}

function draw_buttons(){
    cx.clearRect(0, 0, cw, cw);
    cx.fillStyle = 'black'
    cx.fillRect(260,410,250,90)
    cx.fillStyle = 'black'
    cx.fillRect(0,410,240,90)
    writeMessage('left','white',100,450)
    writeMessage('right','white',330,450)
}

function before_changing_color() {
    draw_buttons();
    pick_color();
    if (number_completed > -1) writeMessage(number_completed);
    else writeMessage(current_message)
    new_pick = true;
}

gameLoop()

/*
if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');

    gameLoop();
}
*/
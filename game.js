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

first_draw = true;
new_pick = true;
const startmessage = 'START'
let current_message = startmessage;
color_pick = 0;
last_color_pick = 0;
let number_completed = -1;
const timer_max = 2000
time_left = timer_max;
let highest_score = 0;

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
    a_circle(0.5, 0.43, 0.35, color);
    //writeMessage()
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    display_highscore();

    if (first_draw == true) {
        number_completed = -1;
        time_left = timer_max;
        cx.clearRect(0, 0, cw, cw);
        draw_buttons();
        color_pick = 0;
        last_color_pick = 0;
        current_message = startmessage;
        first_draw = false;

        pick_color();
        writeMessage(current_message, 'black', cw * 0.5);
        writeMessage('(Press Left or Right)', 'black', cw * 0.5, y = ch * 0.45, '16pt')

    }

    currentTime = Date.now()
    delta = (currentTime - lastTime);
    lastTime = currentTime;
    draw_timer();
    //this.writeMessage(cx, Number(1/delta).toFixed(0))

}

display_highscore = () => {
    cx.clearRect(cw * 0.66, 5, cw * 0.33, ch * 0.04);
    cx.strokeRect(cw * 0.66, 5, cw * 0.33, ch * 0.04);
    writeMessage('Highest Score:    ' + highest_score, 'black', cw * 0.8, 20, '12pt')
}

writeMessage = (message, col = 'black', x = cw * 0.49, y = ch * 0.4, fontsize = '20pt') => {
    //let context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    cx.font = fontsize + ' Calibri';
    cx.textAlign = 'center'
    cx.fillStyle = col;
    cx.fillText(message, x, y);
}

function is_correct() {
    current_message = 'CORRECT';
    number_completed++;
    if (number_completed < timer_max * 0.2) {
        time_left = time_left + timer_max - number_completed;
    }
    else {
        time_left = time_left + timer_max * 0.2;
    }
    if (time_left > timer_max) time_left = timer_max;
}

function is_left() {
    if (number_completed > -1) {
        if (last_color_pick != color_pick) {
            is_correct();
        }
        else {
            is_wrong();
        }
    }
    else {
        number_completed = 0;
    }
    before_changing_color();
}

is_wrong = () => {
    current_message = startmessage;
    if (number_completed > highest_score) highest_score = number_completed;
    first_draw = true;
}

function is_right() {
    if (number_completed > -1) {
        if (last_color_pick == color_pick) {
            is_correct();
        }
        else {
            is_wrong();
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

canvas.addEventListener('touchstart', e => {
    let rect = canvas.getBoundingClientRect();
    startx = e.targetTouches[0].pageX - rect.left;
    starty = e.targetTouches[0].pageY - rect.top;
    touched_button(startx, starty);
})

/*
canvas.addEventListener('mousedown', e => {
    let rect = canvas.getBoundingClientRect();
    startx = e.clientX - rect.left;
    starty = e.clientY - rect.top;
    touched_button(startx,starty);
})
*/
function touched_button(startx, starty) {
    if (startx < 250 && starty > 400) {
        is_left();
    }
    if (startx > 250 && starty > 400) {
        is_right();
    }
}

function draw_timer() {
    if (number_completed > -1) {
        time_left = time_left - delta;
    }

    cx.clearRect(5, 5, 300, 20);
    cx.fillStyle = 'lime';
    cx.fillRect(5, 5, 300 * (time_left / timer_max), 20);
    cx.strokeRect(5, 5, 300, 20);
    writeMessage('timer', 'grey', 150, 20, '12pt');
    if (time_left <= 0) {
        first_draw = true;
    }
}

function draw_buttons() {
    cx.clearRect(0, 0, cw, cw);
    cx.fillStyle = 'black'
    cx.fillRect(260, 410, 250, 90)
    cx.fillStyle = 'black'
    cx.fillRect(0, 410, 240, 90)
    writeMessage('left', 'white', 115, 460)
    writeMessage('right', 'white', 380, 460)
}

function before_changing_color() {
    new_pick = true;
    draw_buttons();
    pick_color();
    if (number_completed > -1) writeMessage(number_completed, 'black', cw * 0.49, ch * 0.43);
    else writeMessage(current_message)

}

gameLoop()

/*
if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');

    gameLoop();
}
*/
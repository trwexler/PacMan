var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 1],
    [1, 2, 1, 2, 0, 1, 0, 1, 0, 2, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 1],
    [1, 2, 1, 2, 0, 1, 0, 1, 0, 2, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 1],
    [1, 2, 1, 2, 0, 1, 0, 1, 0, 2, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
}

function genRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function genNewWorld() {
    for (var row = 1; row < world.length - 1; row++) {
        for (var x = 1; x < world[row].length - 1; x++) {
            world[row][x] = genRandom(4);
        }
    }
    drawWorld();
    return world;
}
genNewWorld();

function drawWorld() {
    output = " ";
    for (var row = 0; row < world.length; row++) {
        output += "<div class='row'>"

        for (var x = 0; x < world[row].length; x++) {
            output += "<div class='" + worldDict[world[row][x]] + "'></div>"
        }
        output += "</div>"
    }

    document.getElementById('world').innerHTML = output;
}
//    drawWorld(); 

function newGame() {
    document.location.reload();
    genNewWorld();
}

var ninjaman = {
    vertical: 1, //row
    horizontal: 1, //item in row

}

function drawNinjaman() {
    document.getElementById('ninjaman').style.top = ninjaman.vertical * 40 + 'px';
    document.getElementById('ninjaman').style.left = ninjaman.horizontal * 40 + 'px';
}
drawNinjaman();

var score = 0;
var sound = document.getElementById('sound');
sound.playbackRate = 4;

function scoring() {
    // debugger;
    if (world[ninjaman.vertical][ninjaman.horizontal] == 2) {
        score = score + 10;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        sound.play();


    } else if (world[ninjaman.vertical][ninjaman.horizontal] == 3) {
        score = score + 20;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        sound.play();
    } else {
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }
}

document.onkeydown = function (e) {

    if (e.keyCode == 37) { //LEFT   
        if (world[ninjaman.vertical][ninjaman.horizontal - 1] != 1) {
            ninjaman.horizontal--;
        }
        document.getElementById('ninjaman').style.transform = 'scaleX(-1)';
        scoring();
    }

    if (e.keyCode == 39) { //RIGHT
        if (world[ninjaman.vertical][ninjaman.horizontal + 1] != 1) {
            ninjaman.horizontal++;
        }
        document.getElementById('ninjaman').style.transform = 'rotate(0deg)';
        scoring();
    }

    if (e.keyCode == 38) { //UP
        if (world[ninjaman.vertical - 1][ninjaman.horizontal] != 1) {
            ninjaman.vertical--;
        }
        document.getElementById('ninjaman').style.transform = 'rotate(270deg)';
        scoring();
    }

    if (e.keyCode == 40) { //DOWN
        if (world[ninjaman.vertical + 1][ninjaman.horizontal] != 1) {
            ninjaman.vertical++;
        }
        document.getElementById('ninjaman').style.transform = 'rotate(90deg)';
        scoring();
    }

    world[ninjaman.vertical][ninjaman.horizontal] = 0;
    drawNinjaman();
    drawWorld();
    stopTimer();
}

var second = 0;
var ms = 0.0;

function hello() {
    if (!fired) {
        fired = true;

        var theTimer = setInterval(function () {
            timer.innerHTML = second + "." + ms;
            ms++;
            if (ms == 10) {
                second++;
                ms = 0;
                if (second == 0) {
                    second = 5;
                }
            }
        }, 100);
    }
}

var fired = false;
var timer = document.getElementById("timer");


onkeydown = function () {
    hello();
};

timer.onkeyup = function () {
    fired = false;
};

var stopTotal;
var totalSushis = 0;
var totalBlanks = 0;
var totalWalls = 0;

function reset() {
    totalSushis = 0;
    totalBlanks = 0;
    totalWalls = 0;
}

function stopTimer() {

    for (var row = 0; row < world.length; row++) {
        for (var x = 0; x < world[row].length; x++) {
            if (world[row][x] == 0) {
                totalBlanks++;
            } else if (world[row][x] == 1) {
                totalWalls++;
            } else if (world[row][x] == 2) {
                totalSushis++;
            }
        }
    }
    if (totalSushis == 0) {
        stopTotal = second + "." + ms;
        document.getElementById('timer').style.display = "none";
        document.getElementById('yourTime').innerHTML = 'Your time is: ' + stopTotal + '!!!';
    }
    reset();
}
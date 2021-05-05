let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let interval;
let on = false;
let win;

const turnhtml = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnhtml.innerHTML = "-";
    } else {
        on = false;
        turnhtml.innerHTML = "";
        clearColor();
        clearInterval(interval);
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    interval = 0;
    turn = 1;
    turnhtml.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    interval = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(interval);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    topLeft.style.backgroundColor = "lightpink";
}

function two() {
    topRight.style.backgroundColor = "lightpink";
}

function three() {
    bottomLeft.style.backgroundColor = "lightpink";
}

function four() {
    bottomRight.style.backgroundColor = "lightpink";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkred";
    topRight.style.backgroundColor = "rgb(78, 5, 5)";
    bottomLeft.style.backgroundColor = "rgb(216, 103, 103)";
    bottomRight.style.backgroundColor = "rgb(212, 76, 76)";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightpink";
    topRight.style.backgroundColor = "lightpink";
    bottomLeft.style.backgroundColor = "lightpink";
    bottomRight.style.backgroundColor = "lightpink";
}

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 5 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        turnhtml.innerHTML = "NO!";
        setTimeout(() => {
            turnhtml.innerHTML = turn;
            clearColor();
            compTurn = true;
            flash = 0;
            playerOrder = [];
            good = true;
            interval = setInterval(gameTurn, 800);
        })
    }

    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnhtml.innerHTML = turn;
        interval = setInterval(gameTurn, 800);
    }

}

function winGame() {
    flashColor();
    turnhtml.innerHTML = "WIN!";
    on = false;
    win = true;
}


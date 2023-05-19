//game constant
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('assets/food.mp3');
const music = new Audio('assets/music.mp3');
const movesound = new Audio('assets/move.mp3');
const gameoversound = new Audio('assets/gameover.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{
    x: 13,
    y: 15
}];

let food = {
    x: 6,
    y: 7
};

//game functions
function main(ctime) {
    music.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {

    //part 1 update snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to Play again!");
        snakeArr = [{
            x: 13,
            y: 15
        }];
        music.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //if eaten food increment score and regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        foodsound.play();
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML = "HighScore:" + hiscoreval;
        }
        let a = 2;
        let b = 16;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //part2  display the snakex
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //part2  display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

function isCollide(sarr) {

    //bump with yourself
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }

    //bump into wall
    if (sarr[0].x >= 18 || sarr[0].x <= 0) {
        return true;
    }
    if (sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }

}


let hiscore = localStorage.getItem("highscore");
let hiscoreval = JSON.parse(hiscore);
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval));
} else {
    HighscoreBox.innerHTML = "HighScore:" + hiscoreval;
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
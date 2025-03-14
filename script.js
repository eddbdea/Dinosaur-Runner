const dinosaur = document.getElementById('dinosaur');
const cactusObstacle = document.getElementById('obstacle-cactus');
const birdObstacle = document.getElementById('obstacle-bird');
const gameBoard = document.getElementById('main-game');
const gameContent = document.getElementById('game-content');
const gameBoardRect = gameBoard.getBoundingClientRect();
const initialStartingPoint = 750;
const previousObjDistance = 60;
const spaceKey = '32';
const arrowDownKey = '40';
const aditionalSpeed = 15;
const FIVE_SECONDS = 5000;
const THOUSAND = 1000;
const HUNDRED = 100;
const SEVENTY_FIVE = 75;
const FIFTY = 50;
const BIRD_COLLISION = 150;
let startingSpeed = 250;
let score = 0;
let birdMovment;
const jump = parseInt(window.getComputedStyle(dinosaur).getPropertyValue('bottom'));

window.addEventListener('keydown', dinosaurJump);
window.addEventListener('keydown', crouchDinosaur);

setTimeout(() => {
    birdObstacle.style['display'] = 'block';
    birdMovment = setInterval(moveBirdObstacle, startingSpeed);
}, 2 * THOUSAND);

function dinosaurJump(event) {
    if (event.keyCode == spaceKey) { 
        dinosaur.style.bottom = (jump + SEVENTY_FIVE) + 'px';
        setTimeout(() => {
            dinosaur.style.bottom = 0 + 'px';
            dinosaur.style.height = HUNDRED + 'px';
        }, THOUSAND); 
    }
}

function crouchDinosaur(event) {
    if (event.keyCode == arrowDownKey) {
        dinosaur.style.height = FIFTY + 'px';
        dinosaur.style.width = FIFTY + 'px';
        setTimeout(() => {
            dinosaur.style.height = HUNDRED + 'px';
            dinosaur.style.width = HUNDRED + 'px';
        }, THOUSAND);
    }
}

function moveCactusObstacle() {
    let obstaclePosition = parseInt(window.getComputedStyle(cactusObstacle).getPropertyValue('left'));
    if (obstaclePosition > 0) {
        const dinosaurRect = document.getElementById('dinosaur').getBoundingClientRect();
        const obstacleRect = cactusObstacle.getBoundingClientRect();
        let dinosaurBottom = gameBoardRect.bottom - dinosaurRect.bottom;
        let obstacleX = obstacleRect.left - gameBoardRect.left;
        let dinosaurX = dinosaurRect.left - gameBoardRect.left;
        if (!checkCollisionCactus(obstacleX, dinosaurX, dinosaurBottom)) {
            cactusObstacle.style.left = (obstaclePosition - FIFTY) + 'px';
        }
    } else {
        cactusObstacle.style.left = initialStartingPoint + 'px';
        updateScore();
    }
}

function moveBirdObstacle() {
    let obstaclePosition = parseInt(window.getComputedStyle(birdObstacle).getPropertyValue('left'));
    if (obstaclePosition > 0) {
        const obstacleRect = birdObstacle.getBoundingClientRect();
        let obstacleX = obstacleRect.left - gameBoardRect.left;
        if (!checkCollisionBird(obstacleX)) {
            birdObstacle.style.left = (obstaclePosition - FIFTY) + 'px';
        }
    } else {
        birdObstacle.style.left = initialStartingPoint + 'px';
        updateScore();
    }
}

const obstaclesMovment = setInterval(moveCactusObstacle, startingSpeed); 
const increaseSpeed = setInterval(() => {
    startingSpeed -= aditionalSpeed;
}, FIVE_SECONDS); 

function checkCollisionCactus(obstacleX, dinosaurX, dinosaurBottom) {
    obstacleX = Math.floor(obstacleX);
    dinosaurX = Math.floor(dinosaurX); 
    dinosaurBottom = Math.floor(dinosaurBottom);
    if (obstacleX - previousObjDistance === dinosaurX && dinosaurBottom === 0) { 
        restartGame();
        return true;
    }
    return false;
}

function checkCollisionBird(obstacleX) { 
    obstacleX = Math.floor(obstacleX);
    if ((obstacleX === BIRD_COLLISION || obstacleX >= FIFTY &&
         obstacleX <= HUNDRED) && dinosaur.style.height === "100px") {
        restartGame();
        return true;
    }
    return false; 
}

function updateScore() {
    ++score;
    document.getElementById('live-score').innerText = 'SCORE: ' + score;
}

function finalScore() {
    const finalScore = document.createElement('h1');
    gameContent.appendChild(finalScore);
    finalScore.innerText = 'Your final score is: ' + score;
    finalScore.style['text-align'] = 'center'; 
}

function createRestartButton() {
    const restartButton = document.createElement('button');
    gameContent.appendChild(restartButton);
    restartButton.innerText = 'Play again';
    restartButton.classList.add('btn', 'btn-success', 'btn-color');
    restartButton.style['align'] = 'center';
    restartButton.addEventListener('click', () => {
        location.reload();
    })
}

function restartGame() {
    clearInterval(obstaclesMovment);
    clearInterval(birdMovment);
    clearInterval(increaseSpeed);
    finalScore();
    createRestartButton();
}
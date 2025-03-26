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
const FIVE_SECONDS_MS = 5000;
const ONE_SECOND_MS = 1000;
const HUNDRED_PX = 100;
const SEVENTY_FIVE_PX = 75;
const FIFTY = 50;
const BIRD_COLLISION = 150;
let startingSpeed = 250;
let score = 0;
let birdMovment;
const jump = parseInt(window.getComputedStyle(dinosaur).getPropertyValue('bottom'));

window.addEventListener('keydown', dinosaurMovment);

setTimeout(() => {
    birdObstacle.style['display'] = 'block';
    birdMovment = setInterval(moveBirdObstacle, startingSpeed);
}, 2 * ONE_SECOND_MS);

function dinosaurMovment(event) {
    if (event.keyCode == spaceKey) { 
        dinosaur.style.bottom = (jump + SEVENTY_FIVE_PX) + 'px';
        setTimeout(() => {
            dinosaurRetrace();
        }, ONE_SECOND_MS); 
    } else if (event.keyCode == arrowDownKey) {
        dinosaurSize(FIFTY);
        setTimeout(() => {
            dinosaurSize(HUNDRED_PX);
        }, ONE_SECOND_MS);
    }
}

function dinosaurSize(noPixels) {
    dinosaur.style.height = noPixels + 'px';
    dinosaur.style.width = noPixels + 'px';
}

function dinosaurRetrace() {
    dinosaur.style.bottom = 0 + 'px';
    dinosaur.style.height = HUNDRED_PX + 'px';
}

function moveCactusObstacle() {
    const obstaclePosition = positionX(cactusObstacle);
    if (obstaclePosition > 0) {
        const dinosaurRect = document.getElementById('dinosaur').getBoundingClientRect();
        const obstacleRect = cactusObstacle.getBoundingClientRect();
        const dinosaurBottom = Math.floor(gameBoardRect.bottom - dinosaurRect.bottom);
        const obstacleLeft = Math.floor(obstacleRect.left - gameBoardRect.left);
        const dinosaurLeft = Math.floor(dinosaurRect.left - gameBoardRect.left);
        checkCollisionCactus(obstacleLeft, dinosaurLeft, dinosaurBottom, obstaclePosition);
    } else {
        restoreObstaclePosition(cactusObstacle);
    }
}

function moveBirdObstacle() {
    const obstaclePosition = positionX(birdObstacle);
    if (obstaclePosition > 0) {
        const obstacleRect = birdObstacle.getBoundingClientRect();
        const obstacleLeft = Math.floor(obstacleRect.left - gameBoardRect.left);
        checkCollisionBird(obstacleLeft, obstaclePosition);
    } else {
        restoreObstaclePosition(birdObstacle); 
    }
}

const obstaclesMovment = setInterval(moveCactusObstacle, startingSpeed); 
const increaseSpeed = setInterval(() => {
    startingSpeed -= aditionalSpeed;
}, FIVE_SECONDS_MS); 

function checkCollisionCactus(obstacleLeft, dinosaurLeft, dinosaurBtm, obsPos) {
    if (obstacleLeft - previousObjDistance === dinosaurLeft &&
        dinosaurBtm === 0) { 
        restartGame();
        return true;
    }
    cactusObstacle.style.left = (obsPos - FIFTY) + 'px';
    return false;
}

function checkCollisionBird(obstacleLeft, obstaclePosition) { 
    if ((obstacleLeft === BIRD_COLLISION || obstacleLeft >= FIFTY &&
        obstacleLeft <= HUNDRED_PX) && dinosaur.style.height === "100px") {
        restartGame();
        return true;
    }
    birdObstacle.style.left = (obstaclePosition - FIFTY) + 'px';
    return false; 
}

function positionX(obstacle) {
    return parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
}

function restoreObstaclePosition(obstacle) {
    obstacle.style.left = initialStartingPoint + 'px';
    updateScore();
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
    });
}

function restartGame() {
    clearInterval(obstaclesMovment);
    clearInterval(birdMovment);
    clearInterval(increaseSpeed);
    finalScore();
    createRestartButton();
}
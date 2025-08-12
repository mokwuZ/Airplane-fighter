const canvas = document.getElementById("canvasBoard");
const ctx = canvas.getContext("2d");
const airplaneImg = createImage("Airplane V2.png");
const asteroidImg = createImage("Asteroid.png");
const explosionImg = createImage("Explosion.jpg");
let gameStatus = true;
let gameStart = false;
let score = 0;
let timerScore;
let timerAsteroid;

function createImage(location) {
    let img = new Image();
    img.src = location;
    return img;
}

const airplane = {
    x: 250,
    y: 620,
    vx: 50,
    vy: 0,
    width: 100,
    height: 100,
};

const asteroid = {
    x: Math.floor(Math.random() * (canvas.width - 50)),
    y: 30,
    vx: 0,
    vy: 50,
    width: 50,
    height: 50,
};

function gameScore() {
    ctx.font = "20px serif";
    ctx.clearRect(0, 0, 3000, 20);
    ctx.fillText("Score: " + score, 0, 15);
}

function fallingAsteroid() {
    clearImage(asteroid);
    asteroid.y += asteroid.vy;
    drawImage(asteroidImg, asteroid);
    if (asteroid.y >= canvas.height) {
        asteroid.x = Math.floor(Math.random() * (canvas.width - 50));
        asteroid.y = 0;
        ++score;
        gameScore();
    }
    if (collisionCheck(asteroid, airplane)) {
        clearImage(asteroid);
        clearImage(airplane);
        drawImage(explosionImg, airplane);
        gameStatus = false;
        clearInterval(timerAsteroid);
        clearInterval(timerScore);
        ctx.font = "50px serif";
        ctx.fillText("GAME OVER!", canvas.width / 2 - 150, canvas.height / 2);
        ctx.fillText("Your score is: " + score, canvas.width / 2 - 170, canvas.height / 2 + 70);
    }
}

function collisionCheck(objOne, objTwo) {
    if (((objOne.x + objOne.width >= objTwo.x && objOne.x <= objTwo.x + objTwo.width)
         && (objOne.y + objOne.height)) >=  objTwo.y) {
        return true;
        }
        return false;
}

function drawImage(imageToDraw, objImage) {
    ctx.drawImage(imageToDraw, objImage.x, objImage.y, objImage.width, objImage.height);
}

function clearImage(objImage) {
    ctx.clearRect(objImage.x, objImage.y, objImage.width, objImage.height);
}

window.addEventListener("load", () => {
    ctx.font = "20px serif";
    ctx.fillText("Press \"SPACE\" to start!", canvas.width / 2 - 100, canvas.height / 2);
})

window.addEventListener("keydown", (event) => {
    if (event.code == "Space" && gameStart == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameScore();
        gameStart = true;
        drawImage(airplaneImg, airplane);
        drawImage(asteroidImg, asteroid);
        timerAsteroid = setInterval(fallingAsteroid, 150);
    }
 })

addEventListener("keydown", (e) => {
    if (gameStatus) {
        if (e.code === "ArrowRight" && airplane.x < 500) {
            clearImage(airplane);
            airplane.x += airplane.vx;
            drawImage(airplaneImg, airplane);
        }
        if (e.code === "ArrowLeft" && airplane.x > 0) {
            clearImage(airplane);
            airplane.x -= airplane.vx;
            drawImage(airplaneImg, airplane);
        }
    }
})


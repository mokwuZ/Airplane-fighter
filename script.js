const canvas = document.getElementById("canvasBoard")
const canvasWidth = 600
const canvasHeight = 750
const ctx = canvas.getContext("2d")
const airplaneImg = new Image()
airplaneImg.src = "Airplane V2.png"
const asteroidImg = new Image()
asteroidImg.src = "Asteroid.png"
const explosionImg = new Image()
explosionImg.src = "Explosion.jpg"
let gameStatus = true
let score = 0
let timerScore
let timerAsteroid

const airplane = {
    x: 250,
    y: 620,
    vx: 50,
    vy: 0,
    width: 100,
    height: 100,
};

const asteroid = {
    x: Math.floor(Math.random() * (canvasWidth - 50)),
    y: 25,
    vx: 0,
    vy: 50,
    width: 50,
    height: 50,
};

function gameScore() {
    ctx.font = "20px serif";
    ctx.clearRect(0, 0, 3000, 20);
    ctx.fillText("Score: " + score, 0, 15);
    score += 10;
}

function fallingAsteroid() {
    ctx.clearRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height)
    asteroid.y += asteroid.vy
    ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height)
    if (asteroid.y >= canvasHeight) {
        asteroid.x = Math.floor(Math.random() * (canvasWidth - 50))
        asteroid.y = 0
    }
    if (((asteroid.x + asteroid.width >= airplane.x && asteroid.x <= airplane.x + airplane.width)
         && (asteroid.y + asteroid.vy)) >=  airplane.y) {
        ctx.clearRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height)
        ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height)
        ctx.drawImage(explosionImg, airplane.x, airplane.y, airplane.width, airplane.height)
        gameStatus = false
        clearInterval(timerAsteroid)
        clearInterval(timerScore)
        ctx.font = "50px serif"
        ctx.fillText("GAME OVER!", canvasWidth / 2 - 150, canvasHeight / 2)
        ctx.fillText("Your score is: " + score, canvasWidth / 2 - 170, canvasHeight / 2 + 70)
    }
}

window.addEventListener("load", () => {
    ctx.font = "20px serif"
    ctx.fillText("Press \"SPACE\" to start!", canvasWidth / 2 - 100, canvasHeight / 2)
})

window.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameScore()
        ctx.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height)
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height)
        timerScore = setInterval(gameScore, 1000)
        timerAsteroid = setInterval(fallingAsteroid, 150)
    }
 })


airplaneImg.addEventListener("keyboard", () => {
        gameScore()
        ctx.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height)
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height)
        timerScore = setInterval(gameScore, 1000)
        timerAsteroid = setInterval(fallingAsteroid, 150)
});

addEventListener("keydown", (e) => {
    if (gameStatus) {
        if (e.code === "ArrowRight" && airplane.x < 500) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height)
            airplane.x += airplane.vx
            ctx.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height)
        }
        if (e.code === "ArrowLeft" && airplane.x > 0) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height)
            airplane.x -= airplane.vx
            ctx.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height)
        }
    }
})


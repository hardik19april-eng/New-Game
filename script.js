// ===================================
// HIGHWAY RUSH
// Built without a game engine
// ===================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const speedText = document.getElementById("speed");

const menu = document.getElementById("menu");
const gameOverScreen = document.getElementById("gameOver");
const pauseScreen = document.getElementById("pauseScreen");

const finalScore = document.getElementById("finalScore");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Canvas dimensions

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Road settings

const road = {
    x: 65,
    width: 320,
    laneCount: 3,
    offset: 0
};

const laneWidth = road.width / road.laneCount;

// Player settings

const player = {
    x: 0,
    y: HEIGHT - 125,
    width: 48,
    height: 85,
    lane: 1,
    color: "#ff3030"
};

// Game variables

let enemies = [];

let score = 0;

let best = 0;

try {
    best = Number(localStorage.getItem("highwayRushBest")) || 0;
} catch (error) {
    best = 0;
}

let gameSpeed = 5;

let spawnTimer = 0;

let running = false;
let paused = false;
let gameStarted = false;

let lastTime = 0;

// Set initial player position

function laneX(lane) {
    return road.x +
        lane * laneWidth +
        laneWidth / 2 -
        player.width / 2;
}

player.x = laneX(player.lane);

// ===================================
// DRAW ROAD
// ===================================

function drawRoad(delta) {

    // Grass

    ctx.fillStyle = "#176b35";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Road

    ctx.fillStyle = "#30343b";
    ctx.fillRect(road.x, 0, road.width, HEIGHT);

    // Road edges

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(road.x + 5, 0, 5, HEIGHT);

    ctx.fillRect(
        road.x + road.width - 10,
        0,
        5,
        HEIGHT
    );

    // Moving lane markings

    if (running && !paused) {
        road.offset += gameSpeed * delta;

        road.offset %= 80;
    }

    ctx.fillStyle = "#eeeeee";

    for (let lane = 1; lane < road.laneCount; lane++) {

        const x = road.x + lane * laneWidth;

        for (let y = -80 + road.offset; y < HEIGHT; y += 80) {

            ctx.fillRect(x - 3, y, 6, 40);

        }
    }

    // Roadside decorations

    for (let y = -60 + road.offset; y < HEIGHT; y += 100) {

        ctx.fillStyle = "#0d4824";

        ctx.beginPath();
        ctx.arc(30, y + 30, 17, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(420, y + 30, 17, 0, Math.PI * 2);
        ctx.fill();

    }
}

// ===================================
// DRAW CAR
// ===================================

function drawCar(x, y, width, height, color) {

    // Shadow

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(x + 5, y + 7, width, height);

    // Wheels

    ctx.fillStyle = "#101010";

    ctx.fillRect(x - 7, y + 15, 9, 20);
    ctx.fillRect(x + width - 2, y + 15, 9, 20);

    ctx.fillRect(x - 7, y + height - 35, 9, 20);
    ctx.fillRect(x + width - 2, y + height - 35, 9, 20);

    // Car body

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();

    // Windshield

    ctx.fillStyle = "#8edcff";

    ctx.fillRect(
        x + 8,
        y + 17,
        width - 16,
        18
    );

    // Rear glass

    ctx.fillStyle = "#163c57";

    ctx.fillRect(
        x + 8,
        y + height - 28,
        width - 16,
        13
    );

    // Headlights

    ctx.fillStyle = "#fff4a3";

    ctx.fillRect(x + 5, y + 3, 10, 6);
    ctx.fillRect(x + width - 15, y + 3, 10, 6);

    // Tail lights

    ctx.fillStyle = "#ff0000";

    ctx.fillRect(x + 5, y + height - 9, 10, 6);
    ctx.fillRect(x + width - 15, y + height - 9, 10, 6);

}

// ===================================
// SPAWN ENEMY CARS
// ===================================

function spawnEnemy() {

    const lane = Math.floor(Math.random() * 3);

    const colors = [
        "#ffd500",
        "#00d9ff",
        "#b45cff",
        "#ff8c00",
        "#ffffff"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    const enemy = {
        lane: lane,
        x: laneX(lane),
        y: -110,
        width: 48,
        height: 85,
        color: color
    };

    // Prevent overlapping cars

    const blocked = enemies.some(car =>
        car.lane === lane && car.y < 130
    );

    if (!blocked) {
        enemies.push(enemy);
    }
}

// ===================================
// COLLISION DETECTION
// ===================================

function checkCollision(a, b) {

    const margin = 8;

    return (
        a.x + margin < b.x + b.width - margin &&
        a.x + a.width - margin > b.x + margin &&
        a.y + margin < b.y + b.height - margin &&
        a.y + a.height - margin > b.y + margin
    );
}

// ===================================
// PLAYER MOVEMENT
// ===================================

function movePlayer(direction) {

    if (!running || paused) return;

    player.lane += direction;

    if (player.lane < 0) {
        player.lane = 0;
    }

    if (player.lane > 2) {
        player.lane = 2;
    }
}

// ===================================
// START GAME
// ===================================

function startGame() {

    enemies = [];

    score = 0;

    gameSpeed = 5;

    spawnTimer = 0;

    road.offset = 0;

    player.lane = 1;
    player.x = laneX(player.lane);

    running = true;
    paused = false;
    gameStarted = true;

    menu.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    pauseScreen.classList.add("hidden");

    updateHUD();
}

// ===================================
// GAME OVER
// ===================================

function endGame() {

    running = false;

    const final = Math.floor(score);

    finalScore.textContent = final;

    if (final > best) {

        best = final;

        try {
            localStorage.setItem("highwayRushBest", best);
        } catch (error) {
            // Game remains playable if storage is unavailable.
        }
    }

    updateHUD();

    gameOverScreen.classList.remove("hidden");
}

// ===================================
// PAUSE GAME
// ===================================

function togglePause() {

    if (!running) return;

    paused = !paused;

    if (paused) {
        pauseScreen.classList.remove("hidden");
    } else {
        pauseScreen.classList.add("hidden");
    }
}

// ===================================
// UPDATE HUD
// ===================================

function updateHUD() {

    scoreText.textContent = Math.floor(score);

    bestText.textContent = best;

    speedText.textContent = Math.floor(gameSpeed * 20);
}

// ===================================
// UPDATE GAME
// ===================================

function update(delta) {

    if (!running || paused) return;

    // Increase score

    score += delta * 0.25;

    // Increase difficulty

    gameSpeed = Math.min(
        12,
        5 + score / 150
    );

    // Smooth movement

    const targetX = laneX(player.lane);

    player.x += (targetX - player.x) *
        Math.min(1, 0.25 * delta);

    // Spawn traffic

    spawnTimer += delta;

    const spawnInterval = Math.max(
        35,
        90 - score / 15
    );

    if (spawnTimer >= spawnInterval) {

        spawnEnemy();

        spawnTimer = 0;
    }

    // Update enemies

    for (let i = enemies.length - 1; i >= 0; i--) {

        const enemy = enemies[i];

        enemy.y += gameSpeed * delta;

        // Check crash

        if (checkCollision(player, enemy)) {

            endGame();
            return;
        }

        // Remove cars outside screen

        if (enemy.y > HEIGHT + 100) {

            enemies.splice(i, 1);

            score += 10;
        }
    }

    updateHUD();
}

// ===================================
// DRAW GAME
// ===================================

function draw(delta) {

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawRoad(delta);

    // Draw enemy cars

    enemies.forEach(enemy => {

        drawCar(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height,
            enemy.color
        );

    });

    // Draw player

    drawCar(
        player.x,
        player.y,
        player.width,
        player.height,
        player.color
    );
}

// ===================================
// MAIN GAME LOOP
// ===================================

function gameLoop(timestamp) {

    if (!lastTime) {
        lastTime = timestamp;
    }

    const delta = Math.min(
        (timestamp - lastTime) / 16.67,
        2
    );

    lastTime = timestamp;

    update(delta);

    draw(delta);

    requestAnimationFrame(gameLoop);
}

// ===================================
// KEYBOARD CONTROLS
// ===================================

document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();

    if (
        key === "arrowleft" ||
        key === "arrowright" ||
        key === " " ||
        key === "arrowup" ||
        key === "arrowdown"
    ) {
        event.preventDefault();
    }

    // Ignore repeated key presses

    if (event.repeat) return;

    // Start or restart

    if (event.code === "Space") {

        if (!running) {
            startGame();
        }

        return;
    }

    // Pause

    if (key === "p") {

        togglePause();
        return;
    }

    // Left

    if (key === "arrowleft" || key === "a") {

        movePlayer(-1);
    }

    // Right

    if (key === "arrowright" || key === "d") {

        movePlayer(1);
    }

});

// ===================================
// BUTTON CONTROLS
// ===================================

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

leftButton.addEventListener("click", function() {
    movePlayer(-1);
});

rightButton.addEventListener("click", function() {
    movePlayer(1);
});

// ===================================
// INITIALIZE
// ===================================

updateHUD();

requestAnimationFrame(gameLoop);
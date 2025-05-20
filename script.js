
console.log("Alpha 1.0.4 - Script running");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 375;
let y = 275;
const size = 50;
const speed = 5;

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, size, size);

    if (keys["ArrowUp"] || keys["w"]) y -= speed;
    if (keys["ArrowDown"] || keys["s"]) y += speed;
    if (keys["ArrowLeft"] || keys["a"]) x -= speed;
    if (keys["ArrowRight"] || keys["d"]) x += speed;

    requestAnimationFrame(gameLoop);
}

gameLoop();

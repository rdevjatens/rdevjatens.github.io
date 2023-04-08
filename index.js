// Initialize the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the size of the canvas
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Set the colors
const BLACK = '#000000';
const WHITE = '#FFFFFF';
const RED = '#FF0000';

// Set the font
ctx.font = '30px sans-serif';

// Set the player square
let playerWidth = 70;
let playerHeight = 180;
let playerX = CANVAS_WIDTH / 2 - playerWidth / 2;
let playerY = CANVAS_HEIGHT - playerHeight - 140;
const playerSpeed = 10;

// Set the circle
let circleWidth = 50;
let circleHeight = 50;
let circleX = Math.floor(Math.random() * (CANVAS_WIDTH - circleWidth + 1));
let circleY = 0;
const circleSpeed = 3;

// Set the score
let score = 0;

// Load the rectangle image
const rectImage = new Image();
rectImage.src = 'eliza4.png';

// Load the circle image
const circleImage = new Image();
circleImage.src = 'cat1.png';

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft' && playerX > 0) {
    playerX -= playerSpeed;
    rectImage.src = 'eliza4.png';
  } else if (event.code === 'ArrowRight' && playerX < CANVAS_WIDTH - playerWidth) {
    playerX += playerSpeed;
    rectImage.src = 'elizaflipped.png';
  }
});

// Main game loop
function gameLoop() {
  // Clear the canvas
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Move the circle
  circleY += circleSpeed;
  if (circleY > CANVAS_HEIGHT) {
    circleX = Math.floor(Math.random() * (CANVAS_WIDTH - circleWidth + 1));
    circleY = 0;
  }

  // Check for collision
  if (circleY + circleHeight >= playerY && circleX + circleWidth >= playerX && circleX <= playerX + playerWidth) {
    circleX = Math.floor(Math.random() * (CANVAS_WIDTH - circleWidth + 1));
    circleY = 0;
    score += 1;
  }

  // Draw the screen
  const bg = new Image();
  bg.src = 'background5.jpg';
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(rectImage, playerX, playerY);
  ctx.drawImage(circleImage, circleX, circleY);
  ctx.fillStyle = WHITE;
  ctx.fillText(`Cats caught: ${score}`, 10, 40);

  // Request the next frame of the animation
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

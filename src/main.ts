import Renderer from './main/renderer/Renderer';
import World from './main/world/World';

// World constants
const worldWidth = 500;
const worldHeight = 500;

// Initial setup of the game world
const world = new World(worldWidth, worldHeight);

// Draw the initial state of the world
const canvas = Renderer.getRenderer().getCanvas();
canvas.width = worldWidth;
canvas.height = worldHeight;

const context = Renderer.getRenderer().getDrawingContext();


// Define the target FPS and the time interval per frame
const targetFPS = 60;
const targetFrameInterval = 1000 / targetFPS;

// Start the game loop
let lastTime = performance.now();
function gameLoop(time: number) {
	const deltaTime = time - lastTime;
	lastTime = time;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a background
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, canvas.width, canvas.height);

	// Update the world
	world.update();

	// Draw the world
	world.draw();

	// Calculate the time to wait until the next frame
	const timeToNextFrame = targetFrameInterval - (performance.now() - time);

	// Use setTimeout to control the frame rate
	if (timeToNextFrame > 0) {
		setTimeout(() => {
			requestAnimationFrame(gameLoop);
		}, timeToNextFrame);
	} else {
		requestAnimationFrame(gameLoop);
	}
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Basic debugging stuff
// !todo move this into some kind of UI class

// setup an event listener on the generate sand button
const generateSandButton = document.getElementById('control.generate_sand');
if (generateSandButton) {
    generateSandButton.addEventListener('click', () => {
        generateRandomElements();
    });
}

function generateRandomElements() {
    for (let i = 0; i < 100; i++) {
        world.createRandomElement();
    }
}

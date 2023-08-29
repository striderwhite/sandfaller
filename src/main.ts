import { OrthographicCamera, Scene, Vector2, WebGLRenderer } from 'three';
import World from './main/world';

// Define canvas size
const canvasSize = new Vector2(500, 500);

// Define grid dimensions
const gridRows = 10;
const gridCols = 10;

// Calculate cell size
const cellSize = Math.min(canvasSize.x / gridCols, canvasSize.y / gridRows);

// Define the world
const world = new World (new Vector2(gridCols, gridRows), cellSize);

// Configure camera and scene
const scene = new Scene();
const camera = new OrthographicCamera(
    -canvasSize.x / 2,   // left
    canvasSize.x / 2,    // right
    canvasSize.y / 2,    // top
    -canvasSize.y / 2,   // bottom
    1,                   // near clipping plane
    1000                 // far clipping plane
);
camera.position.set(canvasSize.x / 2, canvasSize.y / 2, 10);

// Setup the render and append to the DOM
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(canvasSize.x, canvasSize.y);
document.body.appendChild(renderer.domElement);

// Add the camera to the scene
scene.add(camera);


// ======== SCENE SETUP ========

// Add every cell's mesh to the scene
world.getCells().forEach((row) => {
    row.forEach((cell) => {
        scene.add(cell.getMeshContainer());
    });
});


// This is the primary "game loop"
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

    // Lets rotate every cell randomly
    world.getCells().forEach((row) => {
        row.forEach((cell) => {
            cell.getMeshContainer().rotation.x += 0.01;
            cell.getMeshContainer().rotation.y += 0.01;
        });
    });
}

// cout all the cell's world position
world.getCells().forEach((row) => {
    row.forEach((cell) => {
        console.log(cell.getWorldPosition());
    });
});

animate();

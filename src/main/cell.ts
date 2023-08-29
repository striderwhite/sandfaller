import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Vector2 } from "three";

class Cell {
    // Represents the cell's mesh
    private container: Object3D;

    // Its index position on the World's grid
    private position: Vector2;

    // the size of the cell
    private size: number;

    constructor(position: Vector2, size: number) {
        this.position = position;
        this.size = size;

        // Setup the geometry and material for this cell's mesh
        const geometry = new PlaneGeometry(size, size);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });

        // Define the mesh
        const mesh = new Mesh(geometry, material);

        // Add this mesh to the container
        this.container = new Object3D();
        this.container.add(mesh);

        // Set the default position of the container to the world position
        this.container.position.set(
            position.x * size + size / 2,
            position.y * size + size / 2,
            0
        );
    }

    // Get the 3D Object Container for this cell
    public getMeshContainer(): Object3D {
        return this.container;
    }

    // Get the position of this cell
    public getPosition(): Vector2 {
        return this.position;
    }

    // Get the size of this cell
    public getSize(): number {
        return this.size;
    }

    // Get the world position of this cell relative to the world's origin
    public getWorldPosition(): Vector2 {
        return new Vector2(
            this.position.x * this.size + this.size / 2,
            this.position.y * this.size + this.size / 2
        );
    }
}

export default Cell;

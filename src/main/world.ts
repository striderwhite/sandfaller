import { Vector2 } from "three";
import Cell from "./cell";

class World {
    // The actual game world of cells
    private cells: Cell[][];

    // The max X and Y values of the world
    private maxX: number;
    private maxY: number;

    constructor(gridSize: Vector2, cellSize: number = 10) {
        this.maxX = gridSize.x,
        this.maxY = gridSize.y

        this.cells = [];

        // Generate all the cells
        for (let x = 0 ; x < this.maxX ; x++) {
            this.cells[x] = [];
            for (let y = 0 ; y < this.maxY ; y++) {
                this.cells[x][y] = new Cell(new Vector2(x, y), cellSize);
            }
        }
    }

    // Get the cells
    public getCells(): Cell[][] {
        return this.cells;
    }

    // Get the max X value of the world
    public getMaxX(): number {
        return this.maxX;
    }

    // Get the max Y value of the world
    public getMaxY(): number {
        return this.maxY;
    }

    // Get the cell at a specific position
    public getCellAt(x: number, y: number): Cell {
        return this.cells[x][y];
    }
}

export default World;

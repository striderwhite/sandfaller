import SandWorldElement from "../elements/SandWorldElement";
import WorldElement from "../elements/WorldElement";
import Vector2 from "../geometry/Vector2";
import { Direction } from "./Direction";

class World {
    // Represents a list of all WorldElements in the world
    protected elements: WorldElement[] = [];

    // Represents a spatial lookup table for WorldElements
    protected grid: (WorldElement|null)[][];

    protected scale: number; // the scaling factor for the world

    constructor(width: number, height: number, scale: number = 1) {
        this.scale = scale;
        this.grid = new Array(height/scale);
        for (let i = 0; i < height/scale; i++) {
            this.grid[i] = new Array(width/scale);
        }
    }

    update() {
        this.elements.filter(elm => !elm.getIsStationary()).forEach(element => {
            element.update();
        });
    }

    draw() {
        this.elements.forEach(element => {
            element.draw();
        });
    }

    createRandomElement() {
        const x = Math.floor(Math.random() * this.grid[0].length);
        const y = Math.floor(Math.random() * this.grid.length);

        if (this.isEmptyAt(new Vector2(x, y))) {
            this.addElementAtIndex(
                new SandWorldElement(
                    this,
                    new Vector2(x, y)
                ),
                x, y
            );
        } else {
            this.createRandomElement();
        }
    }

    findElementAtIndex(x: number, y: number): (WorldElement|null) {
        return this.grid[y][x];
    }

    addElementAtIndex(element: WorldElement, x: number, y: number): void {
        this.elements.push(element);
        this.grid[y][x] = element;
        // update the element's underlying position
        element.setPosition(new Vector2(x, y));
    }

    updateElementPosition(element: WorldElement, x: number, y: number): void {
        // update on the grid
        this.grid[element.getPosition().y][element.getPosition().x] = null;
        this.grid[y][x] = element;
        // update the element's underlying position
        element.setPosition(new Vector2(x, y));
    }

    destroyElement(element: WorldElement): void {
        const index = this.elements.indexOf(element);

        // Stop tracking it
        if (index > -1) {
            this.elements.splice(index, 1);
        }

        // Remove it from the grid
        this.grid[element.getPosition().y][element.getPosition().x] = null;
    }

    swapElements(a: WorldElement, b: WorldElement): void {
        const aPosition = a.getPosition();
        const bPosition = b.getPosition();
        this.addElementAtIndex(b, aPosition.x, aPosition.y);
        this.addElementAtIndex(a, bPosition.x, bPosition.y);
        // update the element's underlying position
        a.setPosition(bPosition);
        b.setPosition(aPosition);
    }

    isEmptyAt(position: Vector2) {
        return !this.grid[position.y][position.x];
    }

    isOutOfBounds(position: Vector2) {
        return position.x < 0 || position.x >= this.getWidth() || position.y < 0 || position.y >= this.getHeight();
    }

    getWidth(): number {
        return this.grid[0].length;
    }

    getHeight(): number {
        return this.grid.length;
    }

    getScale(): number {
        return this.scale;
    }

    getNeighborAtDirection(element: WorldElement, direction: Direction) {
        switch (direction) {
            case Direction.NORTH:
                return this.findElementAtIndex(element.getPosition().x, element.getPosition().y - 1);
            case Direction.EAST:
                return this.findElementAtIndex(element.getPosition().x + 1, element.getPosition().y);
            case Direction.SOUTH:
                return this.findElementAtIndex(element.getPosition().x, element.getPosition().y + 1);
            case Direction.WEST:
                return this.findElementAtIndex(element.getPosition().x - 1, element.getPosition().y);
            case Direction.NORTH_EAST:
                return this.findElementAtIndex(element.getPosition().x + 1, element.getPosition().y - 1);
            case Direction.SOUTH_EAST:
                return this.findElementAtIndex(element.getPosition().x + 1, element.getPosition().y + 1);
            case Direction.SOUTH_WEST:
                return this.findElementAtIndex(element.getPosition().x - 1, element.getPosition().y + 1);
            case Direction.NORTH_WEST:
                return this.findElementAtIndex(element.getPosition().x - 1, element.getPosition().y - 1);
            default:
                throw new Error("Invalid direction");
        }
    }

    getAllNeighbors(element: WorldElement): WorldElement[] {
        const neighbors: WorldElement[] = [];

        const north = this.getNeighborAtDirection(element, Direction.NORTH);
        if (north) {
            neighbors.push(north);
        }

        const east = this.getNeighborAtDirection(element, Direction.EAST);
        if (east) {
            neighbors.push(east);
        }

        const south = this.getNeighborAtDirection(element, Direction.SOUTH);
        if (south) {
            neighbors.push(south);
        }

        const west = this.getNeighborAtDirection(element, Direction.WEST);
        if (west) {
            neighbors.push(west);
        }

        const northEast = this.getNeighborAtDirection(element, Direction.NORTH_EAST);
        if (northEast) {
            neighbors.push(northEast);
        }

        const southEast = this.getNeighborAtDirection(element, Direction.SOUTH_EAST);
        if (southEast) {
            neighbors.push(southEast);
        }

        const southWest = this.getNeighborAtDirection(element, Direction.SOUTH_WEST);
        if (southWest) {
            neighbors.push(southWest);
        }

        const northWest = this.getNeighborAtDirection(element, Direction.NORTH_WEST);
        if (northWest) {
            neighbors.push(northWest);
        }

        return neighbors;
    }

    getNeighborsBelow(element: WorldElement): WorldElement[] {
        const neighbors: WorldElement[] = [];

        const south = this.getNeighborAtDirection(element, Direction.SOUTH);
        if (south) {
            neighbors.push(south);
        }

        const southEast = this.getNeighborAtDirection(element, Direction.SOUTH_EAST);
        if (southEast) {
            neighbors.push(southEast);
        }

        const southWest = this.getNeighborAtDirection(element, Direction.SOUTH_WEST);
        if (southWest) {
            neighbors.push(southWest);
        }

        return neighbors;
    }
}

export default World;

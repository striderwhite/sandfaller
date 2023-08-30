
import { ElementType } from "./ElementType";
import Vector2 from "../geometry/Vector2";
import World from "../world/World";
import Renderer from "../renderer/Renderer";
import VectorDirection from "../world/VectorDirection";

abstract class WorldElement {
    protected world: World;
    protected position: Vector2; // represents the index position on the 2D grid
    protected color: string;
    protected density: number;
    protected type: ElementType;
    protected stationary: boolean = false; // determines if the element was stationary during the last update

    abstract update(): void;

    protected tryToMove(direction: Vector2): boolean {
        // Try to move the element in the given direction
        // Returns true if the move was successful, false otherwise
        const newPosition = this.position.add(direction);
        if (!this.world.isOutOfBounds(newPosition) && this.world.isEmptyAt(newPosition)) {
            this.world.updateElementPosition(this, newPosition.x, newPosition.y);
            return true;
        }
        return false;
    }

    gravity(): void {
        if (this.stationary) {
            return;
        }

        // Implements base basic gravity

        // Try to "move down" if possible
        if (this.tryToMove(VectorDirection.DOWN)) {
            return;
        }

        // If not, pick randomly between down left and down right and try to move there
        const randomDirection = Math.random() > 0.5 ? VectorDirection.DOWN_LEFT : VectorDirection.DOWN_RIGHT;
        const otherDirection = randomDirection === VectorDirection.DOWN_LEFT ? VectorDirection.DOWN_RIGHT : VectorDirection.DOWN_LEFT;

        if (this.tryToMove(randomDirection)) {
            return;
        }


        // otherwise pick the "other" direction and attempt to move the
        if (this.tryToMove(otherDirection)) {
            return;
        }

        // finally mark the element as was updated
        this.stationary = true;
    }

    draw(): void {
        // Get the renderer and draw itself on the canvas
        const renderer: Renderer = Renderer.getRenderer();
        const context: CanvasRenderingContext2D = renderer.getDrawingContext();

        context.fillStyle = this.color;

        if (this.stationary) {
            context.fillStyle = 'red';
        } else {
            context.fillStyle = 'green';
        }

        context.fillRect(
            this.position.x * this.world.getScale(),
            this.position.y * this.world.getScale(),
            this.world.getScale(),
            this.world.getScale()
        );
    }

    constructor(world: World, position: Vector2, color: string = '#ff00ff', density: number = 100, type: ElementType = ElementType.SOLID) {
        this.world = world;
        this.position = position;
        this.color = color;
        this.density = density;
        this.type = type;
    }

    setPosition(position : Vector2) {
        this.position = position;
    }

    getPosition(): Vector2 {
        return this.position;
    }

    getIsStationary(): boolean {
        return this.stationary;
    }

    toString(): string {
        return `WorldElement at ${this.position}`;
    }
}

export default WorldElement;


import { ElementType } from "./ElementType";
import Vector2 from "../geometry/Vector2";
import World from "../world/World";
import Renderer from "../renderer/Renderer";

abstract class WorldElement {
    protected world: World;
    protected position: Vector2; // represents the index position on the 2D grid
    protected color: string;
    protected density: number;
    protected type: ElementType;
    protected size: number = 5;

    abstract update(): void;

    draw(): void {
        // Get the renderer and draw itself on the canvas
        const renderer: Renderer = Renderer.getRenderer();
        const context: CanvasRenderingContext2D = renderer.getDrawingContext();

        context.fillStyle = this.color;
        context.fillRect(
            this.position.x,
            this.position.y,
            this.size,
            this.size
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

    toString(): string {
        return `WorldElement at ${this.position}`;
    }
}

export default WorldElement;

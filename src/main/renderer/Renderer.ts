// A singleton class for the instance of the canvas and renderer
class Renderer {
    private static instance: Renderer;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

        if (!this.canvas) {
            throw new Error('Canvas not found');
        }

        // @ts-ignore
        this.context = this.canvas.getContext('2d');

        if (!this.context) {
            throw new Error('Canvas context not found');
        }
    }

    public static getRenderer(): Renderer {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer();
        }

        return Renderer.instance;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getDrawingContext(): CanvasRenderingContext2D {
        return this.context;
    }
}

export default Renderer;

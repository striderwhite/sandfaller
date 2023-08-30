import Vector2 from "../geometry/Vector2";
import WorldElement from "./WorldElement";

class SandWorldElement extends WorldElement {

    update(): void {
        this.gravity();
    }
}

export default SandWorldElement;

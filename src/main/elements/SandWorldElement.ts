import Vector2 from "../geometry/Vector2";
import WorldElement from "./WorldElement";

class SandWorldElement extends WorldElement {

    update(): void {
        const newX = this.position.x;
        const newY = this.position.y + 1;

        // the next calculated position is out of bounds
        if (newX >= this.world.getWidth() || newY >= this.world.getHeight() || newX < 0 || newY < 0) {
            this.world.destroyElement(this);
            return;
        }

        if (this.world.isEmptyAt(new Vector2(this.position.x, this.position.y + 1))) {
            this.world.updateElementPosition(this, newX, newY);
        }
    }
}

export default SandWorldElement;

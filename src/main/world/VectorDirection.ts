import Vector2 from "../geometry/Vector2";

class VectorDirection {
    static UP = new Vector2(0, -1);
    static DOWN = new Vector2(0, 1);
    static LEFT = new Vector2(-1, 0);
    static RIGHT = new Vector2(1, 0);

    static UP_LEFT = new Vector2(-1, -1);
    static UP_RIGHT = new Vector2(1, -1);
    static DOWN_LEFT = new Vector2(-1, 1);
    static DOWN_RIGHT = new Vector2(1, 1);
}

export default VectorDirection;

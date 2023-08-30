class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    // Vector addition
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    // Vector subtraction
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    // Scalar multiplication
    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    // Scalar division
    divide(scalar: number): Vector2 {
        if (scalar !== 0) {
            return new Vector2(this.x / scalar, this.y / scalar);
        } else {
            throw new Error("Division by zero is undefined.");
        }
    }

    // Calculate the magnitude (length) of the vector
    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Normalize the vector (make it a unit vector)
    normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag !== 0) {
            return this.divide(mag);
        } else {
            throw new Error("Cannot normalize a zero vector.");
        }
    }

    // Calculate the dot product with another vector
    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    // Calculate the angle between two vectors in radians
    angleTo(other: Vector2): number {
        const dotProduct = this.dot(other);
        const magnitudeProduct = this.magnitude() * other.magnitude();
        return Math.acos(dotProduct / magnitudeProduct);
    }
}

export default Vector2;

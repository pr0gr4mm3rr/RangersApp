export default class Vec2 {
    constructor(public x: number, public y: number) {

    }

    //#region Basic Math
    add(other: Vec2) {
        this.x += other.x;
        this.y += other.y;
    }

    plus(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vec2) {
        this.x -= other.x;
        this.y -= other.y;
    }

    minus(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;
    }

    times(s: number): Vec2 {
        return new Vec2(
            this.x * s,
            this.y * s
        );
    }
    //#endregion Basic Math

    //#region Vector Math
    /**
     * Computes the dot product of this and another vector
     * @param other Vector to compute dot product with
     */
    dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Computes the square of the length of this vector
     */
    lengthSq(): number {
        return this.dot(this);
    }

    /**
     * Computes the length of this vector
     */
    length(): number {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * Returns a unit vector in the same direction as this vector
     */
    normalize(): Vec2 {
        return this.times(1 / this.length());
    }
    //#endregion Vector Math
}
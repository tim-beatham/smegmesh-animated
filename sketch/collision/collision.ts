
/**
 * Implements the collision bounds of an object
 */
interface ICollisionBounds {
    isColliding(point: p5.Vector): boolean;
}

class CircleCollisionBounds implements ICollisionBounds {
    private r: number;
    private point: IPointMass;

    public constructor(r: number, point: IPointMass) {
        this.r = r;
        this.point = point;
    }

    isColliding(point: p5.Vector): boolean {
        const dist = point.dist(this.point.getPosition());
        return dist < this.r;
    }
}

class RectangleCollisionBounds implements ICollisionBounds {
    private dims: p5.Vector;
    private point: IPointMass;

    public constructor(dims: p5.Vector, point: IPointMass) {
        this.dims = dims;
        this.point = point;
    }

    isColliding(point: p5.Vector): boolean {
        const left = this.point.getPosition().x;
        const right = this.point.getPosition().x + this.dims.x;
        const top = this.point.getPosition().y - this.dims.y / 2;
        const bottom = this.point.getPosition().y + this.dims.y;

        const overlapX = point.x > left && point.x < right;
        const overlapY = point.y > top && point.y < bottom;

        return overlapX && overlapY;
    }

}
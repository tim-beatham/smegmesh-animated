
/**
 * Implements the collision bounds of an object
 */
interface ICollisionBounds {
    isColliding(point: p5.Vector): boolean;
}

class CircleCollisiionBounds implements ICollisionBounds {
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
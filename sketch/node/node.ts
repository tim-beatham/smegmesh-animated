class SmegNode implements IObject, IPointMass, ICollisionBounds {
    private pointMass: PointMass;
    private radius: number;
    private counter: number;
    private collisionBounds: ICollisionBounds;

    constructor(position: p5.Vector, radius: number) {
        this.pointMass = new PointMass(position.x, position.y);
        this.radius = radius;
        this.counter = 0;
        this.collisionBounds = new CircleCollisiionBounds(this.radius, this.pointMass);
    }

    isColliding(point: p5.Vector): boolean {
        return this.collisionBounds.isColliding(point);
    }

    onCollide(vector: p5.Vector): void {
        this.pointMass.setPosition(vector);
    }

    addForce(force: p5.Vector): void {
        this.pointMass.addForce(force);
    }

    render(): void {
        fill(255, 204, 0);

        const position = this.pointMass.getPosition();

        DrawManager.drawCircle(position.x, position.y, this.radius);
    }

    update(): void {
        const velocity = this.pointMass.getVelocity();
        const airResistance = velocity.mult(-.01);

        this.pointMass.update();
        this.pointMass.addForce(airResistance);
        this.counter++;
    }

    public getPosition(): p5.Vector {
        return this.pointMass.getPosition();
    }

    public getVelocity(): p5.Vector {
        return this.pointMass.getVelocity();
    }
}
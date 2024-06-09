
class SmegNode implements IObject, IPointMass, ICollisionBounds {
    private pointMass: PointMass;
    private radius: number;
    private counter: number;
    private collisionBounds: ICollisionBounds;
    private colour: number[];

    private nodeName: string;

    constructor(position: p5.Vector, radius: number) {
        this.pointMass = new PointMass(position.x, position.y);
        this.radius = radius;
        this.counter = 0;
        this.collisionBounds = new CircleCollisionBounds(this.radius, this.pointMass);
        this.colour = [random(50, 255), random(50, 255), random(50, 255)];
        this.nodeName = uuidv4();
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
        fill(this.colour[0], this.colour[1], this.colour[2]);

        const position = this.pointMass.getPosition();

        DrawManager.drawCircle(position.x, position.y, this.radius);
    }

    update(): void {
        const velocity = this.pointMass.getVelocity();
        const airResistance = velocity.mult(-.00);

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

    public getMass(): PointMass {
        return this.pointMass;
    }

    public getID(): string {
        return this.nodeName;
    }

    public onReceive() {
    }
}
class Message implements IObject {
    private pointMass: PointMass;
    private colour: number[] = [50, 50, 50];
    private from: SmegNode;
    private to: SmegNode;
    private hide: boolean;

    public constructor(from: SmegNode, to: SmegNode) {
        this.from = from;
        this.to = to;
        this.pointMass = new PointMass(this.from.getPosition().x, this.from.getPosition().y);
    }
    onCollide(vector: p5.Vector): void {
    }

    render(): void {
        if (this.hide) {
            return;
        }

        fill(this.colour[0], this.colour[1], this.colour[2]);

        DrawManager.drawCircle(this.pointMass.getPosition().x, this.pointMass.getPosition().y,
            5);
    }

    update(): void {
        const diff = this.pointMass.getPosition().copy().sub(this.to.getPosition()).normalize();

        const angle = atan2(diff.y, diff.x);

        const forceX = -2 * cos(angle);
        const forceY = -2 * sin(angle);

        this.pointMass.addForce(createVector(forceX, forceY));
        this.pointMass.update();

        if (this.pointMass.getPosition().copy().sub(this.to.getPosition()).mag() < 50) {
            this.to.onReceive();
            this.hide = true;
        }
    }

    setVelocity() {
    }
}

class PointMass {
    private force: p5.Vector;
    private velocity: p5.Vector;
    private position: p5.Vector;

    public constructor(x: number, y: number) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.force = createVector(0, 0);
    }

    /**
     * addForce adds a force to the point mass.
     */
    public addForce(force: p5.Vector) {
        this.force.add(force);
    }

    public getPosition(): p5.Vector {
        return this.position;
    }

    public getVelocity(): p5.Vector {
        return this.velocity;
    }

    public setPosition(position: p5.Vector) {
        this.position = position;
    }

    /**
     * Update updates the point mass
     */
    public update() {
        // add the resultant force to the velocity
        this.velocity.add(this.force);
        // add velocity to the position
        this.position.add(this.velocity);

        // Reset the force to 0
        this.force = createVector(0, 0);
    }
}
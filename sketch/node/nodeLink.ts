
class NodeLink implements IObject {
    private from: SmegNode;
    private to: SmegNode;

    private static C_1: number = .5;
    private static C_2: number = 500;

    private colour: number[];

    constructor(from: SmegNode, to: SmegNode) {
        this.from = from;
        this.to = to;
        this.colour = [random(50, 255), random(50, 255), random(50, 255)];
    }
    onCollide(vector: p5.Vector): void {
        throw new Error("Method not implemented.");
    }

    render(): void {
        stroke(this.colour[0], this.colour[1], this.colour[2]);

        const fromPosition = this.from.getPosition();
        const toPosition = this.to.getPosition();

        DrawManager.drawLine(fromPosition, toPosition);
    }

    update(): void {
        const pos1 = this.from.getPosition();
        const pos2 = this.to.getPosition();

        const distance = pos2.dist(pos1) - 400;

        const force = NodeLink.C_1 * (distance / NodeLink.C_2);

        const diff = pos2.copy().sub(pos1);


        const angle = atan2(abs(diff.x), abs(diff.y))

        const forceX = cos(angle) * -force;
        const forceY = sin(angle) * -force;

        const actedForce = createVector(forceX, forceY);

        const multFrom = createVector(diff.x < 0 ? 1 : -1, diff.y < 0 ? 1 : -1);
        const multTo = createVector(diff.x < 0 ? -1 : 1, diff.y < 0 ? -1 : 1);

        this.from.addForce(actedForce.copy().mult(multFrom));
        this.to.addForce(actedForce.copy().mult(multTo));
    }
}
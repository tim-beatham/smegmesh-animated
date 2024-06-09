
class NodeLink implements IObject {
    private from: SmegNode;
    private to: SmegNode;
    private colour: number[];
    private messages: Message[];
    private rigid: boolean;

    private static C_1: number = .01;
    private static C_2: number = .01;

    constructor(from: SmegNode, to: SmegNode) {
        this.from = from;
        this.to = to;
        this.colour = [random(50, 255), random(50, 255), random(50, 255)];
        this.messages = [];
    }

    onCollide(vector: p5.Vector): void {
        throw new Error("Method not implemented.");
    }

    render(): void {
        stroke(this.colour[0], this.colour[1], this.colour[2]);
        this.messages.forEach(msg => msg.render());
    }

    update(): void {
        const pos1 = this.from.getPosition();
        const pos2 = this.to.getPosition();

        const distance = pos2.dist(pos1) - 400;
        const force = NodeLink.C_1 * log(distance / NodeLink.C_2);
        const diff = pos2.copy().sub(pos1);
        const angle = atan2(abs(diff.x), abs(diff.y))
        const forceX = cos(angle) * -force;
        const forceY = sin(angle) * -force;
        const actedForce = createVector(forceX, forceY);

        const multFrom = createVector(diff.x < 0 ? 1 : -1, diff.y < 0 ? 1 : -1);
        const multTo = createVector(diff.x < 0 ? -1 : 1, diff.y < 0 ? -1 : 1);

        if (!this.rigid) {
            this.from.addForce(actedForce.copy().mult(multFrom));
            this.to.addForce(actedForce.copy().mult(multTo));
        }

        this.messages.forEach(msg => msg.update());
    }

    addMessage(src: string): void {
        if (this.from.getID() === src) {
            this.messages.push(new Message(this.from, this.to));
            return;
        }

        if (this.to.getID() == src) {
            this.messages.push(new Message(this.to, this.from));
            return;
        }

        throw new Error('message is not present in the link');
    }

    contains(nodeID: string): boolean {
        return this.from.getID() === nodeID || this.to.getID() === nodeID;
    }
}
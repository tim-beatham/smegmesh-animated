
class NodeLink implements IObject {
    private from: SmegNode;
    private to: SmegNode;

    constructor(from: SmegNode, to: SmegNode) {
        this.from = from;
        this.to = to;
    }

    render(): void {
        stroke(255, 42, 0);

        const fromPosition = this.from.getPosition();
        const toPosition = this.to.getPosition();

        DrawManager.drawLine(fromPosition, toPosition);
    }

    update(): void {
    }
}
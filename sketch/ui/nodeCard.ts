
/**
 * NodeCard displays information about each node in the network.
 */
class NodeCard implements IObject, IUIComponent {
    private node: SmegNode;
    private point: IPointMass;

    private static PADDING: number = 20;

    public static WIDTH = 300;
    public static HEIGHT = 100;


    public constructor(node: SmegNode, position: p5.Vector) {
        this.node = node;
        this.point = new PointMass(position.x, position.y);
    }
    isMouseOver(): boolean {
        return false;
    }
    onMousePress(): void {
    }
    render(): void {
        fill(0, 125, 0);

        rect(this.point.getPosition().x + (NodeCard.WIDTH / 2), this.point.getPosition().y,
            NodeCard.WIDTH, NodeCard.HEIGHT);

        fill(255, 255, 255);
        text(this.node.getID(), this.point.getPosition().x + NodeCard.PADDING , this.point.getPosition().y);
    }
    update(): void {
    }

    onCollide(vector: p5.Vector): void {
    }
}
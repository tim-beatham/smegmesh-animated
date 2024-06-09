class NodeGroup implements IObject {
    private nodes: string[];
    private timer: Timer;

    constructor() {
        this.nodes = [];
        this.timer = new Timer(2000, () => {
            const nodes = [...this.nodes].sort();

            if (nodes.length <= 1) {
                return;
            }

            NodeManager.getInstance().getNodeLinks(nodes[0]).forEach(m => {
                m.addMessage(nodes[0]);
            })
        });
        this.timer.setRepeat();
    }

    public addNode(name: string) {
        if (NodeManager.getInstance().getNode(name) === null) {
            throw new Error('node does not exist');
        }

        this.nodes.push(name);
    }

    render(): void {
    }

    update(): void {
        this.timer.update();
    }

    onCollide(vector: p5.Vector): void {
    }
}
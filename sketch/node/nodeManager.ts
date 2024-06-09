
class NodeManager {
    private static instance: NodeManager;
    private group: NodeGroup;

    private constructor() {
        this.group = new NodeGroup();
    }

    public static getInstance(): NodeManager {
        if (!NodeManager.instance) {
            NodeManager.instance = new NodeManager();
        }
        return NodeManager.instance;
    }

    public getNodes(): SmegNode[] {
        return SketchManager.getInstance()
            .getObjects()
            .filter(n => n instanceof SmegNode) as SmegNode[];
    }

    public getLinks(): NodeLink[] {
        return SketchManager.getInstance()
            .getObjects()
            .filter(n => n instanceof NodeLink) as NodeLink[];
    }

    public update() {
        this.group.update();
    }

    public addNode(node: SmegNode) {
        SketchManager.getInstance().registerObjects(node);
        const newLinks: NodeLink[] = [];

        this.getNodes().forEach(n => {
            newLinks.push(new NodeLink(n, node));
        });

        SketchManager.getInstance().registerObjects(...newLinks);
        this.group.addNode(node.getID());
    }

    public getNodeLinks(nodeID: string): NodeLink[] {
        return this.getLinks().filter(n => n.contains(nodeID));
    }

    public getNode(nodeID: string): SmegNode {
        return this.getNodes()
            .find(n => n.getID() === nodeID);
    }
}

/**
 * NodeSelector is a representation of all nodes in the animation
 */
class NodeSelector implements IObject, IUIComponent {
    private addButton: NodeButton;
    private nextButton: NodeButton;
    private backButton: NodeButton;
    private currentPage: number;

    public constructor() {
        this.addButton = new NodeButton(createVector(30, 50), "Add Node",
            () => {
                NodeManager.getInstance().addNode(new SmegNode(createVector(50, 50), 50));
            });
        this.currentPage = 0;
        this.nextButton = new NodeButton(createVector(30, 90), "Next",
            () => {
                const numNodes = NodeManager.getInstance().getNodes().length;
                this.currentPage = (this.currentPage + 1) % Math.floor((numNodes / 5));
            });
        this.backButton = new NodeButton(createVector(30, 130), "Back",
            () => {
                const numNodes = NodeManager.getInstance().getNodes().length;
                this.currentPage = (Math.floor(numNodes / 5) + (this.currentPage - 1)) % Math.floor((numNodes / 5));
            }
        );
    }

    private getCards() {
        const nodes = NodeManager.getInstance().getNodes();
        const selected = nodes.slice(this.currentPage * 5, (this.currentPage + 1) * 5);

        return selected.map((n, idx) => new NodeCard(n, createVector(30, 210 + idx * (NodeCard.HEIGHT + 10))));
    }

    render(): void {
        fill(192, 194, 201, 150);
        stroke(0, 0, 0);
        rect(0, 0, windowWidth / 2, windowHeight * 2);

        const cards = this.getCards();
        cards.forEach(c => c.render());

        this.addButton.render();
        this.nextButton.render();
        this.backButton.render();
    }

    update(): void {
    }

    onCollide(vector: p5.Vector): void {
    }

    isMouseOver(): boolean {
        return this.addButton.isMouseOver() || this.nextButton.isMouseOver()
            || this.backButton.isMouseOver();
    }

    onMousePress(): void {
        if (this.addButton.isMouseOver()) {
            this.addButton.onMousePress();
        }

        if (this.nextButton.isMouseOver()) {
            this.nextButton.onMousePress();
        }

        if (this.backButton.isMouseOver()) {
            this.backButton.onMousePress();
        }
    }
}
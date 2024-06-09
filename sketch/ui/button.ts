
class NodeButton implements IObject, IUIComponent {
    private collisionBounds: ICollisionBounds;
    private text: string;
    private pointMass: PointMass;
    private onClick: () => void;

    private static PADDING: number = 10;

    public constructor(position: p5.Vector, text: string, onClick: () => void) {
        this.text = text;
        this.pointMass = new PointMass(position.x, position.y);
        this.collisionBounds = new RectangleCollisionBounds(
            createVector(textWidth(this.text) + NodeButton.PADDING * 2, textAscent() + textDescent() + NodeButton.PADDING * 2), this.pointMass);
            this.onClick = onClick;
    }

    render(): void {
        fill(0, 0, 255);

        const strWidth = textWidth(this.text);
        const strAscent = textAscent();
        const strDescent = textDescent();
        const strHeight = strAscent + strDescent;

        rect(this.pointMass.getPosition().x + (strWidth + NodeButton.PADDING * 2) / 2,
        (this.pointMass.getPosition().y - strAscent) + strHeight / 2,
        strWidth + NodeButton.PADDING * 2,
        strHeight + NodeButton.PADDING * 2);

        fill(255, 255, 255);

        text(this.text, this.pointMass.getPosition().x + NodeButton.PADDING,
        this.pointMass.getPosition().y);
    }

    update(): void {
    }

    onCollide(vector: p5.Vector): void {
    }

    isMouseOver(): boolean {
        return this.collisionBounds.isColliding(createVector(mouseX, mouseY));
    }

    onMousePress(): void {
        if (this.isMouseOver()) {
            this.onClick();
        }
    }
}
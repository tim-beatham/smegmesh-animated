class SmegNode implements IObject {
    private position: p5.Vector;
    private radius: number;

    constructor(position: p5.Vector, radius: number) {
        this.position = position;
        this.radius = radius;
    }

    render(): void {
        fill(255, 204, 0);
        DrawManager.drawCircle(this.position.x, this.position.y, this.radius);
    }

    update(): void {
    }

    public getPosition(): p5.Vector {
        return this.position;
    }
}
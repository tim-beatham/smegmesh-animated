
interface IObject {
    render(): void;
    update(): void;
    onCollide(vector: p5.Vector): void;
}

interface IPointMass {
    addForce(force: p5.Vector): void;
    getPosition(): p5.Vector
}
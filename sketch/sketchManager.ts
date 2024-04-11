

function isCollidable(o: any): o is ICollisionBounds {
    return typeof o.isColliding !== "undefined";
}

class SketchManager implements IObject {
    private static instance: SketchManager;

    private objects: IObject[];

    private constructor() {
        this.objects = [Camera.getInstance()];
    }

    onCollide(vector: p5.Vector): void {
        const coords = DrawManager.realCoordToWorldCoord(vector);
        console.log(coords);

        for (const o of this.objects) {
            if (isCollidable(o) && o.isColliding(coords)) {
                o.onCollide(coords);
                break;
            }
        }
    }

    render(): void {
        this.objects.forEach(o => {
            o.render()
        });
    }
    update(): void {
        this.objects.forEach(o => o.update());
    }

    public static getInstance(): SketchManager {
        if (!SketchManager.instance) {
            SketchManager.instance = new SketchManager();
        }

        return SketchManager.instance;
    }

    public registerObjects(...objs: IObject[]) {
        this.objects = [...this.objects, ...objs];
    }
}
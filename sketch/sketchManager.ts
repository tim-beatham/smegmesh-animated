

function isCollidable(o: any): o is ICollisionBounds {
    return typeof o.isColliding !== "undefined";
}

function isUIElement(o: any): o is IUIComponent {
    return typeof o.isMouseOver !== "undefined";
}

class SketchManager implements IObject {
    private static instance: SketchManager;
    private objects: IObject[];
    private linkTimer: Timer;

    private constructor() {
        this.objects = [Camera.getInstance()];
        this.linkTimer = new Timer(5000, () => {
        });
    }

    onCollide(vector: p5.Vector): void {
        const coords = DrawManager.realCoordToWorldCoord(vector);

        for (const o of this.objects) {
            if (isCollidable(o) && o.isColliding(coords)) {
                o.onCollide(coords);
                break;
            }
        }
    }

    onUIClick(): void {
        for (const o of this.objects) {
            if (isUIElement(o) && o.isMouseOver()) {
                o.onMousePress();
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
        if (!this.linkTimer.isStarted()) {
            this.linkTimer.start();
        }

        this.objects.forEach(o => {
            o.update()
        });

        this.linkTimer.update();
        NodeManager.getInstance().update();
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

    public getObjects(): IObject[] {
        return this.objects;
    }
}
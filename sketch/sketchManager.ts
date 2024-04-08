
class SketchManager implements IObject {
    private static instance: SketchManager;

    private objects: IObject[];

    private constructor() {
        this.objects = [Camera.getInstance()];
    }
    render(): void {
        const cameraDisplacement = Camera.getInstance().getDisplacement();

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

class Camera implements IObject {
    // position represents the camera's center of the screen
    private position: p5.Vector;
    private viewport: p5.Vector;
    private speed: number;
    private zoom: number;

    private movementKeys: Map<number, p5.Vector>;
    private zoomKeys: Map<number, number>;

    private static instance: Camera;

    private constructor (position: p5.Vector, viewport: p5.Vector) {
        this.position = position;
        this.viewport = viewport;
        this.zoom = 1;
        this.speed = 5;


        this.movementKeys = new Map();
        this.zoomKeys = new Map();

        this.movementKeys.set(LEFT_ARROW, createVector(-1, 0));
        this.movementKeys.set(RIGHT_ARROW, createVector(1, 0));
        this.movementKeys.set(UP_ARROW, createVector(0, -1));
        this.movementKeys.set(DOWN_ARROW, createVector(0, 1));

        this.zoomKeys.set(61, 1);
        this.zoomKeys.set(173, -1);
    }

    public static getInstance(): Camera {
        if (!Camera.instance) {
            const viewport = createVector(width, height);
            Camera.instance = new Camera(createVector(width / 2, height / 2), viewport);
        }

        return Camera.instance;
    }

    render(): void {
    }

    update(): void {

        const displacement = createVector(0, 0);
        let zoom = 0;

        for (const key of this.movementKeys.keys()) {
            if (keyIsDown(key)) {
                displacement.add(this.movementKeys.get(key));
            }
        }


        for (const key of this.zoomKeys.keys()) {
            if (keyIsDown(key)) {
                zoom += this.zoomKeys.get(key);
            }
        }

        this.position.add(displacement.mult(this.speed));
        this.zoom += zoom / 100;
        this.zoom = Math.max(0.2, this.zoom);
        this.zoom = Math.min(1.5, this.zoom);
    }

    /**
     * Calculate the displacement of the camera. Which
     * is used to translate objects on the screen.
     *
     * @returns the displacement of the camera
     */
    public getDisplacement(): p5.Vector {
        const displacementX = this.position.x - (this.viewport.x / 2);
        const displacementY = this.position.y - (this.viewport.y / 2);

        return createVector(displacementX, displacementY);
    }

    public getZoom(): number {
        return this.zoom;
    }
}
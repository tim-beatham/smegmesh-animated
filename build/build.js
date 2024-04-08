class DrawManager {
    static worldCoordToRealCoord(coord) {
        return createVector(DrawManager.worldXToRealX(coord.x), DrawManager.worldYToRealY(coord.y));
    }
    static worldXToRealX(x) {
        const worldDisplacement = Camera.getInstance().getDisplacement();
        const xDisplacement = x - worldDisplacement.x;
        return xDisplacement * Camera.getInstance().getZoom();
    }
    static worldYToRealY(y) {
        const worldDisplacement = Camera.getInstance().getDisplacement();
        const yDisplacement = y - worldDisplacement.y;
        return yDisplacement * Camera.getInstance().getZoom();
    }
    static worldDimToRealDim(dim) {
        return dim * Camera.getInstance().getZoom();
    }
    static drawCircle(worldX, worldY, worldRadius) {
        const realX = DrawManager.worldXToRealX(worldX);
        const realY = DrawManager.worldYToRealY(worldY);
        const realRadius = DrawManager.worldDimToRealDim(worldRadius);
        circle(realX, realY, realRadius);
    }
    static drawLine(from, to) {
        const realFrom = DrawManager.worldCoordToRealCoord(from);
        const realTo = DrawManager.worldCoordToRealCoord(to);
        line(realFrom.x, realFrom.y, realTo.x, realTo.y);
    }
}
let numberOfShapesControl;
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    const objects = createObjects();
    SketchManager.getInstance().registerObjects(...objects);
    const links = createLinks(objects);
    SketchManager.getInstance().registerObjects(...links);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function createObjects() {
    const objects = [];
    randomSeed(50);
    for (let i = 0; i < 2; i++) {
        const x = random(0, width);
        const y = random(0, height);
        objects.push(new SmegNode(createVector(x, y), 50));
    }
    return objects;
}
function createLinks(objects) {
    return [new NodeLink(objects[0], objects[1])];
}
function draw() {
    background(0);
    SketchManager.getInstance().update();
    SketchManager.getInstance().render();
}
class SketchManager {
    constructor() {
        this.objects = [Camera.getInstance()];
    }
    render() {
        const cameraDisplacement = Camera.getInstance().getDisplacement();
        this.objects.forEach(o => {
            o.render();
        });
    }
    update() {
        this.objects.forEach(o => o.update());
    }
    static getInstance() {
        if (!SketchManager.instance) {
            SketchManager.instance = new SketchManager();
        }
        return SketchManager.instance;
    }
    registerObjects(...objs) {
        this.objects = [...this.objects, ...objs];
    }
}
class Camera {
    constructor(position, viewport) {
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
    static getInstance() {
        if (!Camera.instance) {
            const viewport = createVector(width, height);
            Camera.instance = new Camera(createVector(width / 2, height / 2), viewport);
        }
        return Camera.instance;
    }
    render() {
    }
    update() {
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
    getDisplacement() {
        const displacementX = this.position.x - (this.viewport.x / 2);
        const displacementY = this.position.y - (this.viewport.y / 2);
        return createVector(displacementX, displacementY);
    }
    getZoom() {
        return this.zoom;
    }
}
class SmegNode {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
    render() {
        fill(255, 204, 0);
        DrawManager.drawCircle(this.position.x, this.position.y, this.radius);
    }
    update() {
    }
    getPosition() {
        return this.position;
    }
}
class NodeLink {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    render() {
        stroke(255, 42, 0);
        const fromPosition = this.from.getPosition();
        const toPosition = this.to.getPosition();
        DrawManager.drawLine(fromPosition, toPosition);
    }
    update() {
    }
}
//# sourceMappingURL=build.js.map
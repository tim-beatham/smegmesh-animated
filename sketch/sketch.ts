// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER).noFill().frameRate(30);

    const objects = createObjects();

    const links = createLinks(objects);
    SketchManager.getInstance().registerObjects(...links);
    SketchManager.getInstance().registerObjects(...objects);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createObjects() {
    const objects = [];


    const length = random(2, 40);

    for (let i = 0; i < length; i++) {
        const x = random(0, width);
        const y = random(0, height);

        objects.push(new SmegNode(createVector(x, y), 50));
    }

    return objects;
}

function createLinks(objects: SmegNode[]): NodeLink[] {
    const links = [];

    for (let i = 0; i < objects.length - 1; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            links.push(new NodeLink(objects[i], objects[j]))
        }
    }


    return links;
}

function draw() {
    background(0);

    SketchManager.getInstance().update();
    SketchManager.getInstance().render();
}

function mouseDragged() {
    SketchManager.getInstance().onCollide(createVector(mouseX, mouseY));
}
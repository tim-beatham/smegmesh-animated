// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER).noFill().frameRate(30);

    const objects = createObjects();
    SketchManager.getInstance().registerObjects(...objects);

    const links = createLinks(objects);
    SketchManager.getInstance().registerObjects(...links);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
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

function createLinks(objects: SmegNode[]): NodeLink[] {
    return [new NodeLink(objects[0], objects[1])];
}



// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FRAME
function draw() {
    background(0);

    SketchManager.getInstance().update();
    SketchManager.getInstance().render();
}


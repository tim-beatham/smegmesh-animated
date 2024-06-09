// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER).noFill().frameRate(30);

    SketchManager.getInstance().registerObjects(...createUI());
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createUI() {
    return [new NodeSelector()];
}

function draw() {
    background(0);

    SketchManager.getInstance().update();
    SketchManager.getInstance().render();
}

function mouseDragged() {
    SketchManager.getInstance().onCollide(createVector(mouseX, mouseY));
}

function mousePressed() {
    SketchManager.getInstance().onUIClick();
}
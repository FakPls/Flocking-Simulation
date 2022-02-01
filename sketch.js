let mover;


function setup() {
  createCanvas(400, 400);
  mover = new vehicle(width/2, height/2);
}

function draw() {
  background(0);
  mover.draw();
  mover.update();
}

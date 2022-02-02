
let movers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  for(let i = 0; i < 500; i++) {
    movers.push(new vehicle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  for(let mover of movers){
    mover.draw();
    mover.update();
  }
}

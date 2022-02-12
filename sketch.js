
let movers = [];
let showPerception;
let perRad;


function setup() {
  createCanvas(windowWidth, windowHeight-50);
  showPerception = createCheckbox('Show perception', false);
  perRad = createSlider(2, 150, 50, 1);
  
  
  for(let i = 0; i < 200; i++) {
    movers.push(new vehicle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  let pVal = perRad.value();

  for(let mover of movers){
    if(showPerception.checked()) {
      mover.showPer();
    }
    mover.draw();
    mover.update();
  }
}

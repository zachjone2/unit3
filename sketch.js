let cam1;
let cam2;
let isDefaultCamera = true;
let isLit = false;
let angle = 0
let textures = {};

let startTime;
let startPos = -1100;  
let endPos = 1100;     
let currentPos = startPos;
let moveDuration = 30000; 
let lerpAmount = 0; 
let color;

let startTime2;
let startPos2 = -2000;  
let endPos2 = 2000;     
let currentPos2 = startPos;
let moveDuration2 = 45000; 
let lerpAmount2 = 0; 

let boxes = [];
let perpendicularBoxes = [];
let numBoxes = 500; 
let moveDurations = [30000, 90000, 75000, 50000, 80000, 45000, 60000, 40000, 35000, 30000, 98000, 76500, 53000, 82000, 45000, 61000, 40066, 35500, 20000, 91100, 79050, 55000, 88890, 45500, 62050, 40660, 37600, 98060, 76700, 53000, 82700, 45000, 61500, 40066, 35555, 26600, 91100, 79050, 58880, 88090, 45570, 62550, 42660, 37640]; // Different speeds (in milliseconds)
//let n;
//let moveDurations = Array.from({length: 120 }, () => random(30000, 90000));
//let moveDurations = [];
//for (let i = 0; i < 500; i++){
  //moveDurations.push(Math.floor(Math.random() * (90000 - 30000) + 30000));
//}

let topDownView = false;
let bgMusic;
let musicStarted = false;
let showText = true;
let font;

function preload(){
  bgMusic = loadSound("Reich2.mp3");
  font = loadFont("Helvetica.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  window.addEventListener("mousemove", startMusic);
  window.addEventListener("click", startMusic);
  //normalMaterial();
  cam1 = createCamera();
  cam2 = createCamera();
  textures.right = loadImage("sky.jpg");
  textures.left = loadImage("sky.jpg");
  textures.top = loadImage("sky.jpg");
  textures.bottom = loadImage("sky.jpg");
  textures.front = loadImage("sky.jpg");
  textures.back = loadImage("sky.jpg");
  startTime = millis();
  startTime2 = millis();

  if (showText) {
    fill(0);
    textFont(font);
    textSize(24);
    textAlign(CENTER, TOP);
    text("Double Click to change view.", width/2,height/2);
  }

  for (let i = 0; i < numBoxes; i++) {
    boxes.push({
      startTime: millis(),
      startPos: -1200,
      endPos: 1200,
      duration: moveDurations[i % moveDurations.length], 
      currentPos: -1200,
      color: [random(255), random(255), random(255)]
    });
  }
  for (let i = 0; i < numBoxes; i++) {
    perpendicularBoxes.push({
      startTime: millis(),
      startPos: -1200,
      endPos: 1200,
      duration: moveDurations[(i + 2) % moveDurations.length],
      currentPos: -1200,
      color: [random(255), random(255), random(255)]
    });
  }
}

function startMusic() {
  if (!musicStarted) {
    let audioContext = getAudioContext(); 
    if (audioContext.state !== "running") {
      audioContext.resume().then(() => {
        bgMusic.loop();
        musicStarted = true;
        window.removeEventListener("mousemove", startMusic);
        window.removeEventListener("click", startMusic);
      }).catch(err => console.log("AudioContext Error:", err));
    }
  }
}


function draw() {
  background(0);

  if (!topDownView) {
  let radius = 800;
  let camX = cos(angle) * radius;
  let camZ = sin(angle) * radius;
  camera(camX, -300, camZ,  0, 0, 0,  0, 1, 0); 
  angle += 0.1;
  } else {
    camera(0, 1000, 0, 0, 0, 0, 0, 0, -1);
  }

  if (showText) {
    fill(0);
    textFont(font);
    textSize(24);
    textAlign(CENTER, TOP);
    text("Double Click to change view.", width/2,height/2);
  }

  //orbitControl();
  ambientLight(255,255,255);
  directionalLight(255, 255, 255, 0.5, -1, -0.5);

  push();//sky
  noStroke();
  drawSkybox(2000); 
  pop();

  push();//ground
  noStroke();
  translate(0, 30, 0);
  rotateX(90);
  ambientMaterial(255)
  plane(2000);
  pop();
  
  /*push();//farmhouse box 1
  translate(0, 0, -50);
  ambientMaterial(79,64,45);
  box(70, 70, 70);
  pop();

  push();//farmhouse box 2
  translate(65, 5, -50);
  ambientMaterial(79,64,45);
  box(60, 60, 60);
  pop();

  push();//road
  noStroke();
  translate(0, 29, -160);
  rotateX(90);
  ambientMaterial(92,90,87)
  plane(2000,150);
  pop();

  push();//road 2
  noStroke();
  translate(200, 29, 50);
  rotateX(90);
  rotateZ(90);
  ambientMaterial(92,90,87)
  plane(2000,200);
  pop();
  

  push();//shadow
  noStroke();
  fill(50, 50, 50, 100);
  translate(20, 29, -50); 
  rotateX(90);
  ellipse(0, 0, 200, 100);
  pop();

  push()//roof 1
  ambientMaterial(79,64,45); 
  translate(0,-65,-50);
  rotateY(90);
  drawTriangularPrism(70);
  pop()

  push()//roof 2
  ambientMaterial(79,64,45); 
  specularMaterial(255);
  shininess(50);
  translate(60,-51,-50);
  rotateY(90);
  drawTriangularPrism(60);
  pop()

  
  let elapsedTime = millis() - startTime;
  
  lerpAmount = map(elapsedTime, 0, moveDuration, 0, 1);
  currentPos = lerp(startPos, endPos, lerpAmount);

  if (elapsedTime > moveDuration) {
    [startPos, endPos] = [endPos, startPos];
    startTime = millis();
  }
  
  //car 1
  translate(currentPos, 15, 20);
  fill(150, 100, 250);
  noStroke();
  box(50,20,20);*/

  for (let i = 0; i < boxes.length; i++) {
    let boxData = boxes[i];
    let elapsedTime = millis() - boxData.startTime;
    let t = elapsedTime / boxData.duration;
    
    boxData.currentPos = lerp(boxData.startPos, boxData.endPos, t);
    
    if (elapsedTime > boxData.duration) {
      [boxData.startPos, boxData.endPos] = [boxData.endPos, boxData.startPos];
      boxData.startTime = millis();
    }
    
    push();
    translate(boxData.currentPos, 20, i * 15 - 850); 
    fill(boxData.color);
    noStroke();
    box(50,20,20);
    pop();
  }

  for (let i = 0; i < perpendicularBoxes.length; i++) {
      let boxData = perpendicularBoxes[i];
      let elapsedTime = millis() - boxData.startTime;
      let t = elapsedTime / boxData.duration;
      
      boxData.currentPos = lerp(boxData.startPos, boxData.endPos, t);
      
      if (elapsedTime > boxData.duration) {
        [boxData.startPos, boxData.endPos] = [boxData.endPos, boxData.startPos];
        boxData.startTime = millis();
      }
      
      push();
      translate(i * 15 -800, 20, boxData.currentPos); 
      fill(boxData.color);
      noStroke();
      box(20,20,50);
      pop();
    }
  }


  
  function drawTriangularPrism(s) {
    let h = (sqrt(3) / 2) * s; 
    let d = 70; 
  
    let frontA = createVector(-s / 2, h / 2, d / 2);
    let frontB = createVector(s / 2, h / 2, d / 2);
    let frontC = createVector(0, -h / 2, d / 2);
  
    let backA = createVector(-s / 2, h / 2, -d / 2);
    let backB = createVector(s / 2, h / 2, -d / 2);
    let backC = createVector(0, -h / 2, -d / 2);
  
    beginShape();
    vertex(frontA.x, frontA.y, frontA.z);
    vertex(frontB.x, frontB.y, frontB.z);
    vertex(frontC.x, frontC.y, frontC.z);
    endShape(CLOSE);
  
    beginShape();
    vertex(backA.x, backA.y, backA.z);
    vertex(backB.x, backB.y, backB.z);
    vertex(backC.x, backC.y, backC.z);
    endShape(CLOSE);
  
    beginShape();
    vertex(frontA.x, frontA.y, frontA.z);
    vertex(backA.x, backA.y, backA.z);
    vertex(backB.x, backB.y, backB.z);
    vertex(frontB.x, frontB.y, frontB.z);
    endShape(CLOSE);
  
    beginShape();
    vertex(frontB.x, frontB.y, frontB.z);
    vertex(backB.x, backB.y, backB.z);
    vertex(backC.x, backC.y, backC.z);
    vertex(frontC.x, frontC.y, frontC.z);
    endShape(CLOSE);
  
    beginShape();
    vertex(frontA.x, frontA.y, frontA.z);
    vertex(backA.x, backA.y, backA.z);
    vertex(backC.x, backC.y, backC.z);
    vertex(frontC.x, frontC.y, frontC.z);
    endShape(CLOSE);
  }

  function drawSkybox(size) {
    let s = size / 2;
  
    // Right Face
    beginShape();
    texture(textures.right);
    vertex(s, -s, -s, 0, 0);
    vertex(s, s, -s, 1, 0);
    vertex(s, s, s, 1, 1);
    vertex(s, -s, s, 0, 1);
    endShape(CLOSE);
  
    // Left Face
    beginShape();
    texture(textures.left);
    vertex(-s, -s, s, 0, 0);
    vertex(-s, s, s, 1, 0);
    vertex(-s, s, -s, 1, 1);
    vertex(-s, -s, -s, 0, 1);
    endShape(CLOSE);
  
    // Top Face
    beginShape();
    texture(textures.top);
    vertex(-s, -s, -s, 0, 0);
    vertex(s, -s, -s, 1, 0);
    vertex(s, -s, s, 1, 1);
    vertex(-s, -s, s, 0, 1);
    endShape(CLOSE);
  
    // Bottom Face
    beginShape();
    texture(textures.bottom);
    vertex(-s, s, s, 0, 0);
    vertex(s, s, s, 1, 0);
    vertex(s, s, -s, 1, 1);
    vertex(-s, s, -s, 0, 1);
    endShape(CLOSE);
  
    // Front Face
    beginShape();
    texture(textures.front);
    vertex(-s, -s, s, 0, 0);
    vertex(s, -s, s, 1, 0);
    vertex(s, s, s, 1, 1);
    vertex(-s, s, s, 0, 1);
    endShape(CLOSE);
  
    // Back Face
    beginShape();
    texture(textures.back);
    vertex(s, -s, -s, 0, 0);
    vertex(-s, -s, -s, 1, 0);
    vertex(-s, s, -s, 1, 1);
    vertex(s, s, -s, 0, 1);
    endShape(CLOSE);
  }

  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }
  
  function doubleClicked() {
    topDownView = !topDownView;
    showText = false;
  }

  function updateSpeed(box, currentTime) {
    if (currentTime >= box.nextSpeedChange) {
      box.speedMultiplier = random(0.5, 1.5); 
      box.nextSpeedChange = currentTime + random(5000, 10000);
    }
  }
  




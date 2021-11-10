let txt = 'ZIG ZAG';
let txt2 = 'whatever you want';
let font;
let font2;
let zigzag = false;

function preload() {
  font = loadFont('Vonique64.ttf');
  font2 = loadFont('Ubuntu-Italic.ttf');
  frameRate(20);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pnts = font.textToPoints(txt, 30, 20, 100, {sampleFactor:0.2});
  pnts2 = font2.textToPoints(txt2, -60, 100, 50, {sampleFactor:0.2});
}

function draw() {
  background('pink');
  
  push();
  for (let i=0; i<height; i+=30) {
    strokeWeight(7);
    strokeCap(SQUARE);
    stroke(200, 150);
    line(0, i, width, i);
    
    if (zigzag) {
      rotate((PI/3)*random(-1, 1));
    }
  }
  pop();
  
  translate(180, 200);
  rotate(PI/8.0);
  if (pnts.length>0) {
    strokeWeight(3);
    stroke(0);
    beginShape(POINTS);
    var prevX = 0; prevY = 0;
    for (let i=0; i<pnts.length; i++) {
      var d = dist(prevX, prevY, pnts[i].x, pnts[i].y);
      if (d>10) {
        endShape();
        beginShape();
      }
      rect(pnts[i].x, pnts[i].y, 5, 10);
      vertex(pnts[i].x, pnts[i].y);
      prevX = pnts[i].x;
      prevY = pnts[i].y;
    }
    endShape();
  }
  
    push();
    noStroke();
    fill('blue');
    push();
    translate(60, -22);
    if (mouseIsPressed) {
      rotate((PI/12)*random(-1, 1));
    }
    rect(-20, -3, 40, 6);
    pop();
    push();
    translate(230, -22);
  if (mouseIsPressed) {
      rotate((PI/12)*random(-1, 1));
    }
    rect(-20, -3, 40, 6);
    pop();
    push();
    translate(293, -22);
  if (mouseIsPressed) {
      rotate((PI/12)*random(-1, 1));
    }
    rect(-20, -3, 50, 6);
    pop();
    pop();

  
  if (pnts2.length>0) {
    push();
    noStroke();
    fill('yellow');
    scale(1.5);
    for (let i=0; i<pnts2.length; i++) {
      rect(pnts2[i].x, pnts2[i].y, 7, 2);
    }
    if (mouseIsPressed) {
      for (let i=0; i<pnts2.length; i++) {
        pnts2[i].x += random(-1, 1);
        pnts2[i].y += random(-2, 2);
      }
    }
    pop();
  }
}

function keyPressed() {
  if (key == 'z' || key == 'Z' || key == ' ') {
    zigzag = !zigzag;
  }
}
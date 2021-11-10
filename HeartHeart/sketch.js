let particles = [];
var stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  cursor(CROSS);
  for (var i = 0; i < 100; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background(0);

  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

  translate(width / 2, height / 2);
  for (let i = 0; i < 3; i++) {
    let p = new Particle();
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

  if (mouseIsPressed) {
    textFont('Arial');
    textSize(random(60, 70));
    textAlign(CENTER);
    text('THEREFORE I AM', 0, 0);
  }
}

class Particle {
  constructor() {
    let a = windowHeight / 4;
    let interval = 0.05;
    this.x = a * pow(sin(frameCount * interval), 3) * 1.3;
    this.y =
      (-a *
        (13 * cos(frameCount * interval) -
          5 * cos(2 * frameCount * interval) -
          2 * cos(3 * frameCount * interval) -
          cos(4 * frameCount * interval))) /
      13;

    this.vx = random(-0.1, 0.1);
    this.vy = random(-0.1, 0.1);

    this.radius = random(10, 25);
    this.col = color(255, 200, 200, random(100, 200));
  }
  show() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.radius);
  }
  finished() {
    return this.radius < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.radius > 0) {
      this.radius -= 0.1;
    }
  }
}

class Star {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.size = random(0.25, 3);
    this.t = random(TAU);
  }

  draw() {
    this.t += 0.1;
    var scale = this.size + sin(this.t) * 2;
    fill(255);
    noStroke();
    ellipse(this.x, this.y, scale, scale);
  }
}

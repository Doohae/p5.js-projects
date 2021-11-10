//Declare arrays, variables.
let flock;
let sound;
let amplitude, fft;
let yoff = 0.0;

//Load sound.
function preload() {
  sound = loadSound('wave_sound.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  sound.loop();
  amplitude = new p5.Amplitude(0.98);
  fft = new p5.FFT(0.99)

  //Make an array.
  flock = new Flock();
  //Make particle objects and store it to flock.
  // flock 개수 100개로 임시 수정
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(10, 100, 200, 150);
  
  let spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length; i++) {
    var thisLevel = map(spectrum[i], 0, 255, 0, 1);
  }
  
  flock.run();
  
  fill(220, 200, 100, 100);
  // 파형의 점들을 이용한 다각형 그리기
  beginShape();

  let xoff = 0; // 2D 노이즈

  // 가로 픽셀들에 반복
  for (let x = 0; x <= width; x += 10) {
    // y값을 노이즈에 따라 계산, 다음에 매핑(map)하기

    // 2D 노이즈
    let y = map(noise(xoff, yoff), 0, 1, thisLevel, 300);

    // 버텍스 설정하기
    vertex(x, y);
    vertex(width-x, height-y);
    
    // 노이즈의 x차원 증가하기
    xoff += 0.02;
  }
  // 노이즈의 y차원 증가하기
  yoff += 0.02;
  vertex(width/2, height/2);
  // vertex(0, 0);
  endShape(CLOSE);
}



  // An array for all boids
  function Flock() {
    this.boids = []; // Initialize the array
  }

  Flock.prototype.run = function() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
    }
  }

  Flock.prototype.addBoid = function(b) {
    this.boids.push(b);
  }



  //Class Boid, constructor function.
  function Boid(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxforce = 0.05;
    
    let volume = amplitude.getLevel();
    let speed = map(volume,0,1,2,10);
    this.maxspeed = 2 * speed; // amplitude랑 연결. 
  }

  Boid.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
  }

// We accumulate a new acceleration each time based on three rules
  Boid.prototype.flock = function(boids) {
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohesion(boids);
   
    // sound에 반응해서 가중되게끔 연결.
    // 파도 소리가 커지면 objects가 멀리 퍼지게: seperate force 증가
    // 파도 소리가 작아지면 objects끼리 응집되게: seperation force 
    let volume = amplitude.getLevel();
    let f = map(volume, 0, 1, 0, 50);
    sep.mult(1.2 * f);
    ali.mult(0.5);
    coh.mult(1.0);
    
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  // Make movement
  Boid.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // STEER = DESIRED - VELOCITY
  Boid.prototype.seek = function(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  Boid.prototype.render = function() {
    fill(100, 150, 255, 160);
    noStroke();
    let volume = amplitude.getLevel();
    let size = map(volume, 0, 1, 0, 30);
    ellipse(this.position.x, this.position.y, size * 15, size * 15);
  }

  Boid.prototype.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  //Seperation
  Boid.prototype.separate = function(boids) {
    let desiredseparation = 30.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
     // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  //Alignment
  Boid.prototype.align = function(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  //Cohesion
  Boid.prototype.cohesion = function(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
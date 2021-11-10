let img;
let cnv;
let heart = [];
let bgm;

function preload() {
  img = loadImage('klimt2.jpg');
  bgm = loadSound('focus.mp3')
}

function setup() {
  cnv = createCanvas(img.width, img.height);
  let cnvX = (windowWidth - img.width)/2;
  let cnvY = (windowHeight - img.height)/2;
  cnv.position(cnvX, cnvY);
  img.loadPixels();
  frameRate(7);
  bgm.loop();
}

function draw() {
  background(255);
// Image manipulation between push and pop
  push();
  for (let posY=0; posY<img.height; posY+=7) {
    for (let posX=0; posX<img.width; posX+=7) {
      let alphaX = map(mouseX, 0, width, 120, 220);
      let strokeY = map(mouseY, 0, height, 12, 8);
      let id = (posX + img.width*posY)*4;
      let red = img.pixels[id];
      let green = img.pixels[id+1];
      let blue = img.pixels[id+2];
      let alpha = alphaX;
      let c = color(red, green, blue, alpha);
      stroke(c);
      strokeWeight(strokeY+random(-1.5, 1.5));
      point(posX, posY);
    }
  }
  pop();
  
// Heart shape generated below
  for(let i = heart.length -1; i>= 0; i--){
   	heart[i].move();
    heart[i].show();
    heart[i].shrink();
    if(heart[i].radius <= 0 ){
      heart.splice(i, 1);
    }
  }
    let x = img.width*3/5 + random(-30, 30);
    let y = img.height/2 + random(-10, 30);
    let radius = random(20,40);
    let b = new Heart(x, y, radius);
    heart.push(b);
}


class Heart {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.radius = tempR;
    this.color = color(255, 100, 100, 70);
  }

  show() {
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.radius / 2, this.y - this.radius / 2, this.x - this.radius, this.y + this.radius / 3, this.x, this.y + this.radius);
    bezierVertex(this.x + this.radius, this.y + this.radius / 3, this.x + this.radius / 2, this.y - this.radius / 2, this.x, this.y);
    endShape(CLOSE);
  }

  move() {
    this.x += random(-30, 30);
    this.y -= random(3, 5);
  }
  
  shrink(){    
   this.radius-=0.4;
  }
}
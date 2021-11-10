let distribution = new Array(360);
let sel;
let selColor;
let thickness;
let colorHair;

function setup() {
   createCanvas(windowWidth, windowHeight);
   cursor(CROSS);
   
   textAlign(CENTER);
   sel = createSelect()
   sel.position(20, 20);
   sel.option('Thin');
   sel.option('Basic');
   sel.option('Thick');
   sel.selected('Basic');
   sel.changed(selectLen);
  
   selColor = createSelect();
   selColor.position(20, 40);
   selColor.option('Green');
   selColor.option('Reddish');
   selColor.option('Ocean Blue');
   selColor.option('Yellow')
   selColor.selected('Green');
   selColor.changed(selectColor);
   
   for (let i = 0; i < distribution.length; i++) {
     distribution[i] = floor(randomGaussian(10,14));
   }
 }

function draw() {
  if (mouseIsPressed && mouseButton==LEFT) {
  translate(mouseX, mouseY);
    
  if (colorHair==1) {
    for (let i = 0; i < distribution.length; i++) {
     rotate(TWO_PI / distribution.length);
     strokeWeight(random(1, 4));
     stroke(10, random(120,240), random(50, 90), random(20, 35));
     let dist = abs(distribution[i]);
     let distOpt = getDist(dist);
     line(0, 0, distOpt, 0);
   }
  } 
    else if (colorHair==2) {
    for (let i = 0; i < distribution.length; i++) {
     rotate(TWO_PI / distribution.length);
     strokeWeight(random(1, 4));
     stroke(random(120, 200), 20, random(20, 70), random(20, 35));
     let dist = abs(distribution[i]);
     let distOpt = getDist(dist);
     line(0, 0, distOpt, 0);
    }
  }
    else if (colorHair==3) {
    for (let i = 0; i < distribution.length; i++) {
     rotate(TWO_PI / distribution.length);
     strokeWeight(random(1, 4));
     stroke(random(20, 190), 180, random(200, 250), random(20, 35));
     let dist = abs(distribution[i]);
     let distOpt = getDist(dist);
     line(0, 0, distOpt, 0);
     }
  }
    else if (colorHair==4) {
    for (let i = 0; i < distribution.length; i++) {
     rotate(TWO_PI / distribution.length);
     strokeWeight(random(1, 4));
     stroke(random(220, 250), random(220, 250), random(10, 60), random(20, 35));
     let dist = abs(distribution[i]);
     let distOpt = getDist(dist);
     line(0, 0, distOpt, 0);
      }
    }
  }
}

function keyPressed() {
  if (keyCode==DELETE || keyCode==BACKSPACE) background(255);
}


function getDist(dist) {
  if (thickness==1) return dist*0.5;
  else if (thickness==2) return dist;
  else if (thickness==3) return dist*1.3;
}

function selectLen() {
  let item = sel.value();
  if (item=='Thin') thickness = 1;
  else if (item=='Basic') thickness = 2;
  else if (item=='Thick') thickness = 3;
}

function selectColor() {
  let hue = selColor.value();
  
  if (hue=='Green') colorHair = 1;
  else if (hue=='Reddish') colorHair = 2;
  else if (hue=='Ocean Blue') colorHair=3;
  else if (hue=='Yellow') colorHair=4;
}
let slider;
let sel;
let selTxt;
let selTxtVal;
let checkbox;
let colorNike;
let colorText;
let buttonReset;

function setup() {
  createCanvas(720, 720);
  background(255);
  
  textAlign(CENTER);
  colorMode(HSB, 360, 50, 0);
  slider = createSlider(40, 320, 30, 3);
  slider.position(10, 10);
  text("LOGO COLOR", 140, 25);
  slider.style('width', '80px');
  
  sel = createSelect();
  sel.position(10, 30);
  sel.style('width', '80px');
  sel.option('Single');
  sel.option('Multi Straight');
  sel.option('Multi Diagonal');
  sel.option('Random');
  text("LOGO MODE", 140, 45);
  sel.changed(mySelectLogo);
  
  checkbox = createCheckbox('Change Text', false);
  checkbox.position(600, 10);
  checkbox.changed(myCheckedTxt);
  
  selTxt = createSelect();
  selTxt.position(600, 30);
  selTxt.style('width', '80px');
  selTxt.option('Helvetica');
  selTxt.option('Georgia');
  selTxt.option('Courier');
  selTxt.option('Coiny');
  
  buttonReset = createButton('RESET');
  buttonReset.position(10, 54);
  buttonReset.mousePressed(reDesign);
}

function reDesign() {
  background(255);
}

function NikeBasic(x, y, c, sz=1) {
  noStroke();
  fill(c, 100, 20);
  beginShape();
  vertex(sz*(650+x), sz*(200+y));
  bezierVertex(sz*(200+x), sz*(500+y), sz*(-90+x), sz*(500+y), sz*(150+x), sz*(200+y));
  bezierVertex(sz*(130+x), sz*(250+y), sz*(-50+x), sz*(500+y), sz*(650+x), sz*(200+y));
  endShape();
  console.log(c);
}

function myText(x=0, y=0, c=120) {
  selTxtVal = selTxt.value();
  textSize(180);
  textFont(selTxtVal);
  textStyle(BOLDITALIC);
  fill(c, 100, 50);
  text('Nike', 330+x, 280+y);
}

function mySelectLogo() {
  let item = sel.value();
  colorNike = slider.value();
  
  if (item == 'Single') {
    background(255);
    NikeBasic(0, 0, colorNike);
  }
  else if (item == 'Multi Straight') {
    background(255);
    NikeBasic(0, 250, colorNike);
    NikeBasic(0, 20, colorNike + random(-40, 40));
    NikeBasic(0, -210, colorNike + random(-40, 40));
  }
  else if (item == 'Multi Diagonal') {
    background(255);
    NikeBasic(-30, 50, colorNike + random(-40, 40));
    NikeBasic(0, 0, colorNike + random(-40, 40));
    NikeBasic(30, -50, colorNike + random(-40, 40));
  }
  else if (item == 'Random') {
    background(255);
    let randomInt = random(10, 20);
    for (let i=0; i<randomInt; i++) {
      NikeBasic(random(-100, 600), random(-300, 650), colorNike + random(-40, 40), random(30, 90)/100);
    }
    NikeBasic(0, 0, colorNike);
  }
}

function myCheckedTxt() {
  colorText = slider.value();
  if (this.checked) {
    myText(0, 480, colorText + random(-40, 40));
    myText(0, 250, colorText + random(-40, 40));
    myText(0, 20, colorText + random(-40, 40));
    myText(0, -210, colorText + random(-40, 40));
  }
}
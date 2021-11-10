var weatherData = null;
let radius = 200;
var filePath = "WeatherInSeoul2020.json";
var fonts;
var maxTemp = 35;
var minTemp = -13;

var nDist;
var angStep;
var weatherAng;

var snowy = true;
var sunny = true;
var foggy = true;
var rainy = true;
var cloudy = true;

function preload() {
  fonts = loadFont("Quicksand-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(40);
  loadJSON(filePath, onWeather);
  noStroke();

  angleMode(RADIANS);
  nDist = 366;
  angStep = (TWO_PI - PI / 4) / nDist;
  weatherAng = PI / 4 / 5;
}

function draw() {
  background(40);
  if (weatherData == null) return;

  translate(width / 2, height / 2);
  if (mouseIsPressed) {
    display();
  }
  date();
  temp();
  weather();
}

function date() {
  for (var i = 0; i < nDist; i++) {
    push();
    rotate(-(angStep * i + PI / 8));
    noStroke();
    fill("#fae");
    textAlign(LEFT, CENTER);
    textFont(fonts);
    textSize(4);
    text(weatherData[i].Date, radius + 2, 0);
    pop();
  }
}

function temp() {
  for (var i = 0; i < nDist; i++) {
    push();
    rotate(-(angStep * i + PI / 8));
    stroke("#fae");
    strokeWeight(2);
    strokeCap(ROUND);
    line(
      map(weatherData[i].Lowest, minTemp, maxTemp, radius + 15, radius + 75),
      0,
      map(weatherData[i].Highest, minTemp, maxTemp, radius + 15, radius + 75),
      0
    );
    pop();
  }
}

function weather() {
  push();
  noStroke();
  rotate(-weatherAng * 2);
  textSize(15);
  textAlign(LEFT, CENTER);
  fill("skyblue");
  text("Foggy", radius + 2, 0);
  pop();

  push();
  rotate(-weatherAng);
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  fill("pink");
  text("Sunny", radius + 2, 0);
  pop();

  push();
  rotate(weatherAng * 2);
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  fill("white");
  text("Snowy", radius + 2, 0);
  pop();

  push();
  rotate(weatherAng);
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  fill("green");
  text("Rainy", radius + 2, 0);
  pop();

  push();
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  fill("grey");
  text("Cloudy", radius + 2, 0);
  pop();

  for (let i = 0; i < 365; i++) {
    var x = radius * cos(-(angStep * i + PI / 8));
    var y = radius * sin(-(angStep * i + PI / 8));
    if (weatherData[i].Weather == "Sunny" && sunny == true) {
      push();
      strokeWeight(0.2);
      stroke("pink");
      noFill();
      beginShape();
      curveVertex(radius - 2, radius * sin(-weatherAng));
      curveVertex(radius - 2, radius * sin(-weatherAng));
      curveVertex(x / 1.5, y / 1.5);
      curveVertex(x, y);
      curveVertex(x, y);
      endShape();
      pop();
    }
    if (weatherData[i].Weather == "Snowy" && snowy == true) {
      push();
      strokeWeight(0.2);
      noFill();
      stroke("white");
      beginShape();
      curveVertex(radius - 8, radius * sin(weatherAng * 2));
      curveVertex(radius - 8, radius * sin(weatherAng * 2));
      curveVertex(x / 1.5, y / 1.5);
      curveVertex(x, y);
      curveVertex(x, y);
      endShape();
      pop();
    }

    if (weatherData[i].Weather == "Foggy" && foggy == true) {
      push();
      strokeWeight(0.2);
      noFill();
      stroke("skyblue");
      beginShape();
      curveVertex(radius - 8, radius * sin(-weatherAng * 2));
      curveVertex(radius - 8, radius * sin(-weatherAng * 2));
      curveVertex(x / 1.5, y / 1.5);
      curveVertex(x, y);
      curveVertex(x, y);
      endShape();
      pop();
    }
    if (weatherData[i].Weather == "Rainy" && rainy == true) {
      push();
      strokeWeight(0.2);
      noFill();
      stroke("green");
      beginShape();
      curveVertex(radius - 2, radius * sin(weatherAng));
      curveVertex(radius - 2, radius * sin(weatherAng));
      curveVertex(x / 1.5, y / 1.5);
      curveVertex(x, y);
      curveVertex(x, y);
      endShape();
      pop();
    }
    if (weatherData[i].Weather == "Cloudy" && cloudy == true) {
      push();
      strokeWeight(0.2);
      noFill();
      stroke("grey");
      beginShape();
      curveVertex(radius - 2, 0);
      curveVertex(radius - 2, 0);
      curveVertex(x / 1.5, y / 1.5);
      curveVertex(x, y);
      curveVertex(x, y);
      endShape();
      pop();
    }
  }
}

function display() {
  push();
  textSize(15);
  if (
    mouseX > radius + width / 2 &&
    mouseX < (radius + textWidth("Foggy")) * cos(-2 * weatherAng) + width / 2 &&
    mouseY > height / 2 - (radius * sin(2 * weatherAng) + 15) &&
    mouseY < height / 2 - (radius * sin(2 * weatherAng) - 15 / 2) &&
    mouseIsPressed
  ) {
    snowy = false;
    sunny = false;
    foggy = true;
    rainy = false;
    cloudy = false;
  } else if (
    mouseX > radius + width / 2 &&
    mouseX < (radius + textWidth("Sunny")) * cos(weatherAng) + width / 2 &&
    mouseY > height / 2 - (radius * sin(weatherAng) + 15) &&
    mouseY < height / 2 - (radius * sin(weatherAng) - 15 / 2) &&
    mouseIsPressed
  ) {
    snowy = false;
    sunny = true;
    foggy = false;
    rainy = false;
    cloudy = false;
  } else if (
    mouseX > radius + width / 2 &&
    mouseX < radius + textWidth("Sunny") + width / 2 &&
    mouseY > height / 2 - 15 &&
    mouseY < height / 2 + 15 / 2 &&
    mouseIsPressed
  ) {
    snowy = false;
    sunny = false;
    foggy = false;
    rainy = false;
    cloudy = true;
  } else if (
    mouseX > radius + width / 2 &&
    mouseX < (radius + textWidth("Rainy")) * cos(weatherAng) + width / 2 &&
    mouseY > height / 2 - (radius * sin(-weatherAng) + 15 / 2) &&
    mouseY < height / 2 - (radius * sin(-weatherAng) - 15) &&
    mouseIsPressed
  ) {
    snowy = false;
    sunny = false;
    foggy = false;
    rainy = true;
    cloudy = false;
  } else if (
    mouseX > radius + width / 2 &&
    mouseX < (radius + textWidth("Snowy")) * cos(weatherAng) + width / 2 &&
    mouseY > height / 2 - (radius * sin(-2 * weatherAng) + 15 / 2) &&
    mouseY < height / 2 - (radius * sin(-2 * weatherAng) - 15) &&
    mouseIsPressed
  ) {
    snowy = true;
    sunny = false;
    foggy = false;
    rainy = false;
    cloudy = false;
  } else {
    snowy = true;
    sunny = true;
    foggy = true;
    rainy = true;
    cloudy = true;
  }
  pop();
}

function onWeather(data) {
  weatherData = data.WeatherInSeoul2020;
}


let song;
let fft;
let backgroundImage;

function preload() {
  song = loadSound("audio/sample-visualisation.mp3");
  backgroundImage = loadImage("assets/light.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  song.play();
  fft = new p5.FFT();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  translate(width / 2, height / 2);

  let wave = fft.waveform();
  let spectralCentroid = fft.getCentroid();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 150, 350);
      let x = r * sin(i) * t;
      let y = r * cos(i);

      
      let colorValue = map(spectralCentroid, 0, width, 0, 255);
      let fillColor = color(255);

    
      fill(fillColor);
      ellipse(x, y, 10, 10);
    }
    endShape();
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}
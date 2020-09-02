function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);

  socket = io.connect('http://localhost:5000');

  socket.on('mouse', newDrawing);
}
function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 20, 20);
}

function mouseDragged() {
  console.log(mouseX, mouseY);

  var data = {
    x: mouseX,
    y: mouseY,
  };

  socket.emit('mouse', data);
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
}
function mousePressed() {
  console.log(mouseX, mouseY);

  var data = {
    x: mouseX,
    y: mouseY,
  };

  socket.emit('mouse', data);
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {}

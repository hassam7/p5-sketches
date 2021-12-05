let x;
let y;
function setup() {
  createCanvas(400, 400);
  x = 200;
  y = 200;

  background(51);
  stroke(255);
  strokeWeight(2);
  point(x, y);

}

function draw() {

  const randomNo = floor(random(4));
  switch (randomNo) {
    case 0:
      x = x + 3;
      break;
    case 1:
      x = x - 3;
      break;
    case 2:
      y = y + 3;
      break;
    case 3:
      y = y - 3;
      break
    default:
      break;
  }
  x = constrain(x, 0, 400);
  y = constrain(y, 0, 400);
  point(x, y);

}

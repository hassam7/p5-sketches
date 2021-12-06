let randomWalkers = [];
const createWalkers = (width, height) => {
  randomWalkers.push(
    new RandomWalker({
      initialPosition: createVector(0, 0),
      width,
      height,
      color: "red",
    })
  );
  randomWalkers.push(
    new RandomWalker({
      initialPosition: createVector(width, height),
      width,
      height,
      color: "orange",
    })
  );
  randomWalkers.push(
    new RandomWalker({
      initialPosition: createVector(width, 0),
      width,
      height,
      color: "indigo",
    })
  );
  randomWalkers.push(
    new RandomWalker({
      initialPosition: createVector(0, height),
      width,
      height,
      color: "maroon",
    })
  );
  randomWalkers.push(
    new RandomWalker({
      initialPosition: createVector(width / 2, height / 2),
      width,
      height,
      color: "black",
    })
  );
};
function setup() {
  const width = windowWidth;
  const height = windowHeight;
  createCanvas(width, height);
  background(255);
  stroke(0);
  strokeWeight(1);
  createWalkers(width, height);
}

function draw() {
  background(255);
  randomWalkers.forEach((randomWalker) => randomWalker.walk());
}

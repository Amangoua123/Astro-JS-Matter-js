import Matter from "matter-js";
import matterWrap from "matter-wrap";

const select = (e) => document.querySelector(e);

const sectionTag = select("section.shapes");

// Install plugin
Matter.use("matter-wrap");

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  MouseConstraint,
  Composites,
  World,
} = Matter;

const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const render = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    width: w,
    height: h,
    background: "#000000",
    wireframes: false,
    pixelRatio: window.devicePixelRatio,
  },
});

const createShape = function (x, y) {
  return Bodies.rectangle(x, y, 25, 33, {
    render: {
      sprite: { texture: "hello.png", xScale: 0.2, yScale: 0.3 },
    },
    plugin: {
      wrap: {
        min: { x: 0, y: 0 },
        max: { x: w, y: h },
      },
    },
  });
};

// create two boxes and a ground
let wallOptions = {
  isStatic: true,
  render: { fillStyle: "#fff" },
};

let ground = Bodies.rectangle(w / 2, h + 25, w + 100, 50, wallOptions);
let ceiling = Bodies.rectangle(w / 2, -25, w + 100, 50, wallOptions);
let leftWall = Bodies.rectangle(-25, h / 2, 50, h + 100, wallOptions);
let rightWall = Bodies.rectangle(w + 25, h / 2, 50, h + 100, wallOptions);
let bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), {
  isStatic: true,
  render: { fillStyle: "#fff" },
});

let mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: { visible: false },
  },
});

let initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return createShape(x, y);
});

Composite.add(engine.world, [
  bigBall,
  ground,
  ceiling,
  // leftWall,
  // rightWall,
  mouseControl,
  initialShapes,
]);

// When click page add new shape
document.addEventListener("click", function (e) {
  const shape = createShape(e.pageX, e.pageY);
  Composite.add(engine.world, shape);
});

// // Collision event

// document.addEventListener("mousemove", (e) => {
//   const vector = { x: e.pageX, y: e.pageY };
//   const hoverShapes = Query.point(initialShapes.bodies, vector);

//   hoverShapes.forEach((shape) => {
//     shape.render.sprite = null;
//     shape.render.fillStyle = "red";
//   });
// });

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// let time = 0;
// const changeGravity = function () {
//   time = time + 0.01;
//   engine.world.gravity.x = Math.sin(time);
//   engine.world.gravity.y = Math.cos(time);
//   requestAnimationFrame(changeGravity);
// };

// changeGravity();

window.addEventListener("deviceorientation", function (event) {
  World.gravity.x = event.gamma / 30;
  World.gravity.y = event.beta / 30;
});

import Matter from "matter-js";

const select = (e) => document.querySelector(e);

const sectionTag = select("section.shapes");

const { Engine, Runner, Render, Bodies, World } = Matter;

const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const renderer = Render.create({
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
  return Bodies.circle(x, y, 20 + 20 * Math.random());
};

// When click page add new shape

document.addEventListener("click", function (e) {
  const shape = createShape(e.pageX, e.pageY);
  World.add(engine.world, shape);
});

Runner.run(engine);
Render.run(renderer);

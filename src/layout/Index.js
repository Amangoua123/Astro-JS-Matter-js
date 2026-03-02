import Matter from "matter-js";

const select = (e) => document.querySelector(e);

const sectionTag = select("section.shapes");

const { Engine, Render } = Matter;

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

Matter.Runner.run(engine);
Matter.Render.run(renderer);

import {
	Engine,
	Runner,
	Render,
	Bodies,
	World,
	Composites,
	Mouse,
	MouseConstraint,
} from "matter-js";

const panelWidth = 800;
const panelHeight = 600;
const wallWidth = 40;

const engine = Engine.create();
const render = Render.create({
	element: document.getElementById("sim-container"),
	engine: engine,
	options: {
		width: panelWidth,
		height: panelHeight,
		wireframes: false,
	},
});

const ground = Bodies.rectangle(
	panelWidth / 2,
	panelHeight,
	panelWidth,
	wallWidth,
	{ isStatic: true }
);
const leftWall = Bodies.rectangle(0, panelHeight / 2, wallWidth, panelHeight, {
	isStatic: true,
});
const rightWall = Bodies.rectangle(
	panelWidth,
	panelHeight / 2,
	wallWidth,
	panelHeight,
	{ isStatic: true }
);
const ceiling = Bodies.rectangle(panelWidth / 2, 0, panelWidth, wallWidth, {
	isStatic: true,
});

World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

const rectangleOptions = {
	restitution: 0.3,
};

let rows = 8;
let cols = 4;
for (let y = 0; y < rows; y++) {
	for (let x = 0; x < cols + ((y + 1) % 2); x++) {
		let block;
		if (y % 2 === 0) {
			block = Bodies.rectangle(
				260 + 80 * x,
				560 - 40 * y,
				80,
				40,
				rectangleOptions
			);
		} else {
			block = Bodies.rectangle(
				300 + 80 * x,
				560 - 40 * y,
				80,
				40,
				rectangleOptions
			);
		}
		World.add(engine.world, block);
	}
}

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false },
	},
});
World.add(engine.world, mouseConstraint);

render.mouse = mouse;

Runner.run(engine);
Render.run(render);

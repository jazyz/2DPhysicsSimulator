import { Engine, Runner, Render, Bodies, World } from "matter-js";

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

Runner.run(engine);

Render.run(render);

let dir = "down";
const circleRadius = 15;

setInterval(() => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	const circleOptions = {
		restitution: 0.8,
		render: {
			fillStyle: `rgb(${r}, ${g}, ${b})`,
		},
	};

	let ball;
	if (dir == "down") {
		ball = Bodies.circle(
			Math.random() * panelWidth,
			wallWidth,
			circleRadius,
			circleOptions
		);
	} else if (dir == "up") {
		ball = Bodies.circle(
			Math.random() * panelWidth,
			panelHeight - wallWidth,
			circleRadius,
			circleOptions
		);
	} else if (dir == "left") {
		ball = Bodies.circle(
			panelWidth - wallWidth,
			Math.random() * panelHeight,
			circleRadius,
			circleOptions
		);
	} else if (dir == "right") {
		ball = Bodies.circle(
			wallWidth,
			Math.random() * panelHeight,
			circleRadius,
			circleOptions
		);
	} else {
		console.log("Error");
	}
	World.add(engine.world, ball);
}, 50);

document.addEventListener("keydown", (event) => {
	if (event.key == "ArrowUp") {
		engine.gravity.x = 0;
		engine.gravity.y = -1;
		dir = "up";
	} else if (event.key == "ArrowDown") {
		engine.gravity.x = 0;
		engine.gravity.y = 1;
		dir = "down";
	} else if (event.key == "ArrowLeft") {
		engine.gravity.x = -1;
		engine.gravity.y = 0;
		dir = "left";
	} else if (event.key == "ArrowRight") {
		engine.gravity.x = 1;
		engine.gravity.y = 0;
		dir = "right";
	}
});

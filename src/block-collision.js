import {
	Engine,
	Runner,
	Render,
	Bodies,
	World,
	Body,
	Events,
	Resolver,
} from "matter-js";

const panelWidth = 800;
const panelHeight = 600;
const wallWidth = 40;

const engine = Engine.create({
	gravity: { x: 0, y: 0 },
	friction: 0,
	frictionAir: 0,
	frictionStatic: 0,
	restitution: 1,
});
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
	{
		isStatic: true,
	}
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

const square1 = Bodies.rectangle(140, 530, 100, 100, {
	restitution: 1,
	mass: 1,
	frictionAir: 0,
});
const square2 = Bodies.rectangle(340, 530, 100, 100, {
	restitution: 1,
	mass: 100,
	frictionAir: 0,
});

World.add(engine.world, square1);
World.add(engine.world, square2);

const initialVelocity = -10;
Body.setVelocity(square2, {
	x: initialVelocity,
	y: 0,
});

let collisionCount = 0;

Events.on(engine, "collisionStart", (event) => {
	const pairs = event.pairs;

	if (
		pairs.some(
			(pair) =>
				(pair.bodyA === square1 && pair.bodyB === square2) ||
				(pair.bodyA === square2 && pair.bodyB === square1)
		)
	) {
		collisionCount++;
		// console.log(`Collisions: ${collisionCount}`);
	}
});

Resolver._restingThresh = 0.001;

// setInterval(() => {
// 	console.log(Math.abs(square2.velocity.x));
// }, 100);

Runner.run(engine);

Render.run(render);

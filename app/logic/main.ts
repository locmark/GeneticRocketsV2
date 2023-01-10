import { deg2rad } from './math';
import { drawRocket } from './painters/rocketPainter';
import { Rocket } from './rocket';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const scale = 5;

const rockets: Rocket[] = [];

export function load(_canvas: HTMLCanvasElement) {
    canvas = _canvas;
    ctx = canvas.getContext('2d')!;

    // createRockets
    for (let index = 0; index < 10; index++) {
        const rocket = new Rocket({
            x: Math.random() * 200,
            y: Math.random() * 100,
            yaw: Math.random() * Math.PI * 2,
            // yaw: 0,
        });
        rocket.engineThrust = 100 + Math.random() * 1000;
        rocket.engineAngle = (Math.random() * Math.PI * 2) / 50;
        // rocket.engineAngle = deg2rad(45);
        rockets.push(rocket);
    }

    // start the game loop
    setInterval(() => tick(0.01), 10);

    drawingLoop();
}

function drawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rockets.forEach((rocket) => {
        drawRocket(ctx, scale, rocket);
    });
    requestAnimationFrame(drawingLoop);
}

function tick(dt: number) {
    rockets.forEach((rocket) => {
        rocket.tick(dt);
    });
}

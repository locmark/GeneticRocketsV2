import type { Rocket } from '../rocket';

export function drawRocket(ctx: CanvasRenderingContext2D, scale: number, rocket: Rocket) {
    ctx.save();
    ctx.translate(rocket.position.x * scale, rocket.position.y * scale);
    ctx.rotate(rocket.position.yaw);

    // draw body
    ctx.fillStyle = 'red';
    ctx.fillRect(
        (-rocket.width / 2) * scale,
        (-rocket.height / 2) * scale,
        rocket.width * scale,
        rocket.height * scale,
    );

    // draw engine, as triangle under body
    const engineSize = rocket.engineThrust / 100;
    const engineAngle = rocket.engineAngle;
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, (rocket.height / 2) * scale);
    ctx.lineTo(
        Math.sin(engineAngle) * engineSize * scale,
        Math.cos(engineAngle) * engineSize * scale + (rocket.height / 2) * scale,
    );

    ctx.closePath();

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    ctx.restore();
}

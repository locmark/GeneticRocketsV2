import { deg2rad, Point } from './math';
import { PointWithYaw } from './math/pointWithYaw';

// engine is facing straight down

export class Rocket {
    public position: PointWithYaw;
    public velocity: PointWithYaw;

    public width = 5; // m
    public height = 20; // m

    public engineThrust = 0; // N
    public engineAngle = deg2rad(0); // rad (0 = straight down)

    public mass = 1000; // kg

    constructor(startPosition: PointWithYaw = new PointWithYaw()) {
        this.position = startPosition;
        this.velocity = new PointWithYaw();
    }

    public tick(dt: number) {
        this.applyEngineForce(dt);
        this.applyVelocity(dt);
    }

    private applyVelocity(dt: number) {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.position.yaw += this.velocity.yaw * dt;
    }

    private applyEngineForce(dt: number) {
        const engineForceX = Math.sin(this.engineAngle) * this.engineThrust;
        const engineForceY = Math.cos(this.engineAngle) * this.engineThrust;

        // force acting in the transverse axis makes the rocket spin
        const engineTorqueYaw = (engineForceX * this.height) / 2; // Nm
        const momentOfInertia = (this.mass * this.height ** 2) / 12; // kgm^2 (https://en.wikipedia.org/wiki/List_of_moments_of_inertia)

        // those calculations were made in rocket own coordinate system
        // now, we need to convert them to world coordinate system
        const engineForceWorldX = engineForceY * Math.sin(this.position.yaw);
        const engineForceWorldY = engineForceY * Math.cos(this.position.yaw);

        // apply forces to the rocket
        this.velocity.x += (engineForceWorldX / this.mass) * dt;
        this.velocity.y -= (engineForceWorldY / this.mass) * dt;
        this.velocity.yaw += (engineTorqueYaw / momentOfInertia) * dt;
    }
}

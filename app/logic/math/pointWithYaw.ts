import { Point } from './point';

export class PointWithYaw extends Point {
    public yaw: number;

    constructor(x = 0, y = 0, direction = 0) {
        super(x, y);
        this.yaw = direction;
    }
}

import Screen from "../screen/Screen";
import Entity from "../screen/Entity";
import { Color } from "p5";

interface State {
    color: Color;
    angle: number;
    radius: number;
    count: number;
    step: number;
    itemRadius: number;
}
interface ScreenState {}

export default class LoadingSpinner implements Entity {
    private screen: Screen<ScreenState>;
    private state: State;

    constructor(screen: Screen<ScreenState>, dotColor: Color) {
        this.screen = screen;

        const p = this.screen.renderer;

        const count = 10;
        this.state = {
            // clone the color as we are going to make the
            // alpha component dynamic
            color: p.color(dotColor.toString()),
            angle: 0,
            radius: 50,
            count: count,
            step: 360 / count,
            itemRadius: 15,
        };
    }

    update(): void {
        const p = this.screen.renderer;

        const elapsedTime = Math.floor(p.millis() / 90);
        const { step, count } = this.state;
        const activeItem = elapsedTime % count;
        this.state.angle = p.radians(step * activeItem);
    }

    draw(): void {
        const p = this.screen.renderer;

        p.push();

        p.translate(p.width / 2, p.height / 2);

        p.circle(0, 0, 10);
        p.noStroke();

        p.rotate(this.state.angle);

        const { radius, count, step, itemRadius } = this.state;

        for (let i = 0; i < count; i++) {
            const angle = p.radians(step * i);
            const alpha = 255 - i * 25;

            this.state.color.setAlpha(alpha);
            p.fill(this.state.color);
            p.circle(radius * p.sin(angle), radius * p.cos(angle), itemRadius);
        }

        p.pop();
    }

    destroy(): void {}
}

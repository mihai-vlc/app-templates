import Screen from "../screen/Screen";
import Entity from "../screen/Entity";
import { Color } from "p5";

interface State {
    color: Color;
}
interface ScreenState {}

export default class LoadingSpinner implements Entity {
    private screen: Screen<ScreenState>;
    private state: State;

    constructor(screen: Screen<ScreenState>, dotColor: Color) {
        this.screen = screen;

        const p = this.screen.renderer;
        this.state = {
            // clone the color as we are going to make the
            // alpha component dynamic
            color: p.color(dotColor.toString()),
        };
    }

    update(): void {}

    draw(): void {
        const p = this.screen.renderer;

        p.push();

        p.translate(p.width / 2, p.height / 2);

        p.circle(0, 0, 10);
        p.noStroke();

        const radius = 50;
        const count = 10;
        const step = 360 / count;
        const itemRadius = 15;

        const elapsedTime = Math.floor(p.millis() / 90);
        const activeItem = elapsedTime % count;

        p.rotate(p.radians(step * activeItem));

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

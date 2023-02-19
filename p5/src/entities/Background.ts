import Screen from "../screen/Screen";
import Entity from "../screen/Entity";
import p5, { Color } from "p5";

interface State {
    color: Color;
}
interface ScreenState {
    backgroundColor: p5.Color;
}

export default class Background implements Entity {
    private screen: Screen<ScreenState>;
    private state: State;

    constructor(screen: Screen<ScreenState>) {
        this.screen = screen;
        this.state = {
            color: screen.renderer.color(50),
        };
    }

    update(): void {
        const color = this.screen.getStateValue("backgroundColor");

        if (color) {
            this.state.color = color;
        }
    }

    draw(): void {
        const p = this.screen.renderer;

        p.background(this.state.color);
    }

    destroy(): void {}
}

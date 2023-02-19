import Screen from "../screen/Screen";
import Entity from "../screen/Entity";
import { Color } from "p5";

interface State {
    color: Color;
}

export default class Background implements Entity {
    private screen: Screen;
    private state: State;

    constructor(screen: Screen) {
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

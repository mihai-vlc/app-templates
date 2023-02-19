import Screen from "../screen/Screen";
import Entity from "../screen/Entity";

interface State {
    time: string;
}

export default class DateTime implements Entity {
    private screen: Screen;
    private state: State;

    constructor(screen: Screen) {
        this.screen = screen;
        this.state = {
            time: "",
        };
    }

    update(): void {
        this.state.time = new Date().toISOString();
    }

    draw(): void {
        const p = this.screen.renderer;

        p.fill(255, 255, 255);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(25);
        p.text(this.state.time, 0, 0);
    }

    destroy(): void {}
}

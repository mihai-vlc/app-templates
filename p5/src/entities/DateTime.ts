import Screen from "../screen/Screen";
import Entity from "../screen/Entity";

interface State {
    time: string;
    elapsedTime: number;
}

export default class DateTime implements Entity {
    private screen: Screen;
    private state: State;

    constructor(screen: Screen) {
        this.screen = screen;
        this.state = {
            time: "",
            elapsedTime: 0,
        };

        this.updateBackground = this.updateBackground.bind(this);
    }

    updateBackground(prevState: any) {
        const p = this.screen.renderer;
        prevState.backgroundColor = p.color(p.random(0, 100));
    }

    update(): void {
        const p = this.screen.renderer;

        this.state.time = new Date().toISOString();

        const time = Math.floor(p.millis() / 1000);

        if (time != this.state.elapsedTime) {
            this.state.elapsedTime = time;
            this.screen.changeState(this.updateBackground);
        }
    }

    draw(): void {
        const p = this.screen.renderer;

        p.fill(255, 255, 255);
        const center = p.createVector(p.width / 2, p.height / 2);

        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(25);
        p.text(this.state.time, center.x, center.y - 15);

        const lifetime = this.state.elapsedTime;
        p.text(
            `Elapsed time: ${lifetime.toFixed()} seconds`,
            center.x,
            center.y + 15
        );
    }

    destroy(): void {}
}

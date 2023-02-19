import Screen from "../screen/Screen";
import Entity from "../screen/Entity";

export default class Background implements Entity {
    private screen: Screen;

    constructor(screen: Screen) {
        this.screen = screen;
    }

    update(): void {}

    draw(): void {
        const p = this.screen.renderer;
        p.background(50);
    }

    destroy(): void {}
}

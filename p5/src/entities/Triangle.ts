import Screen from "../screen/Screen";
import Entity from "../screen/Entity";

export default class Triangle implements Entity {
    private screen: Screen;

    constructor(screen: Screen) {
        this.screen = screen;
    }

    update(): void {}

    draw(): void {
        const p = this.screen.renderer;
        p.triangle(p.width / 2, 0, p.width, p.height / 2, 0, p.height / 2);
    }

    destroy(): void {}
}

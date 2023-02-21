import Screen from "../screen/Screen";
import Entity from "../screen/Entity";

interface ScreenState {}

export default class FPSCounter implements Entity {
    private screen: Screen<ScreenState>;

    constructor(screen: Screen<ScreenState>) {
        this.screen = screen;
    }

    update(): void {}

    draw(): void {
        const p = this.screen.renderer;

        p.push();
        p.fill(255, 255, 0, 128);

        const fps = Math.round(p.frameRate());
        const label = `FPS: ${fps}`;
        const textSize = 15;
        const padding = 10;

        p.textAlign(p.RIGHT, p.TOP);
        p.textSize(textSize);
        p.text(label, p.width - padding, padding);
        p.pop();
    }

    destroy(): void {}
}

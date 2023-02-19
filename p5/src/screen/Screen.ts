import p5 from "p5";
import Entity from "./Entity";

export default class Screen {
    private state = {};
    private entities: Entity[] = [];
    public readonly renderer: p5;

    constructor(p5Instance: p5) {
        this.renderer = p5Instance;
    }

    addEntity(element: Entity) {
        this.entities.push(element);
    }

    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }
}

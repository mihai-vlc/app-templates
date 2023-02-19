import produce from "immer";
import p5 from "p5";
import Entity from "./Entity";

export default class Screen<S = {}> {
    private state: S;
    private entities: Entity[] = [];
    public readonly renderer: p5;

    constructor(p5Instance: p5) {
        this.renderer = p5Instance;
        this.state = {} as S;
    }

    addEntity(element: Entity) {
        this.entities.push(element);
    }

    changeState(cb: (prevState: S) => void) {
        this.state = produce(this.state, cb);
    }

    getStateValue(key: string): any {
        return this.state[key as keyof S];
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

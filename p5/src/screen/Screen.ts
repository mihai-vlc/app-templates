import { produce, Immutable, Draft } from "immer";
import p5 from "p5";
import Entity from "./Entity";

interface Action {
    type: string;
}

type Recipe<S> = (state: Draft<S>, action: Action) => void;

export default class Screen<S = {}> {
    private state: Immutable<S>;
    private entities: Entity[] = [];
    private reducer: (base: any, a: Action) => Immutable<S>;

    public readonly renderer: p5;

    constructor(p5Instance: p5, state: Immutable<S>) {
        this.renderer = p5Instance;
        this.state = state;
        this.reducer = produce((s, a) => {});
    }

    addEntity(element: Entity) {
        this.entities.push(element);
    }

    setReducer(reducer: Recipe<S>) {
        this.reducer = produce(reducer);
    }

    dispatch(action: Action) {
        this.state = this.reducer(this.state, action);
    }

    getStateValue<Key extends keyof Immutable<S>>(key: Key): Immutable<S>[Key] {
        return this.state[key];
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

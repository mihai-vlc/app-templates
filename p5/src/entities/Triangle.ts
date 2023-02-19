import Screen from "../screen/Screen";
import Entity from "../screen/Entity";
import p5 from "p5";

interface State {
    angle: number;
    radius: number;
    targetRadius: number;
    points: {
        p1: p5.Vector;
        p2: p5.Vector;
        p3: p5.Vector;
    };
}

export default class Triangle implements Entity {
    private screen: Screen;
    private state: State;

    constructor(screen: Screen) {
        this.screen = screen;

        const p = this.screen.renderer;
        this.state = {
            angle: 0,
            radius: 50,
            targetRadius: 100,
            points: {
                p1: p.createVector(),
                p2: p.createVector(),
                p3: p.createVector(),
            },
        };
    }

    update(): void {
        const p = this.screen.renderer;
        const dt = p.deltaTime * 0.001;

        this.state.angle += 0.5 * dt;

        // used formulas form here
        // http://www.treenshop.com/Treenshop/ArticlesPages/FiguresOfInterest_Article/The%20Equilateral%20Triangle.htm
        let { radius, targetRadius } = this.state;

        radius = p.lerp(radius, targetRadius, 1 - p.pow(0.5, dt));

        this.state.radius = radius;

        const R = 2 * radius;
        const a = R * p.sqrt(3);

        this.state.points.p1.set(0, -R);
        this.state.points.p2.set(a / 2, radius);
        this.state.points.p3.set(-a / 2, radius);

        if (radius > 99) {
            this.state.targetRadius = 50;
        }

        if (radius < 51) {
            this.state.targetRadius = 100;
        }
    }

    draw(): void {
        const p = this.screen.renderer;

        p.push();

        p.translate(p.width / 2, p.height / 2);
        p.rotate(this.state.angle);

        const { p1, p2, p3 } = this.state.points;
        p.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

        p.circle(0, 0, 10);

        p.pop();
    }

    destroy(): void {}
}

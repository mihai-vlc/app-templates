import p5 from "p5";
import Background from "../entities/Background";
import FPSCounter from "../entities/FPSCounter";
import Triangle from "../entities/Triangle";
import Screen from "../screen/Screen";

export default function triangleSketch(p5Instance: p5) {
    const screen = new Screen(p5Instance, {
        backgroundColor: p5Instance.color(100),
    });

    screen.addEntity(new Background(screen));
    screen.addEntity(new FPSCounter(screen));
    screen.addEntity(new Triangle(screen));

    p5Instance.preload = function () {};

    p5Instance.setup = function () {
        p5Instance.createCanvas(740, 400);
    };

    p5Instance.draw = function () {
        screen.update();
        screen.draw();
    };
}

import p5 from "p5";
import Background from "../entities/Background";
import FPSCounter from "../entities/FPSCounter";
import LoadingSpinner from "../entities/LoadingSpinner";
import Screen from "../screen/Screen";

export default function loadingSketch(p5Instance: p5) {
    const screen = new Screen(p5Instance, {
        backgroundColor: p5Instance.color(100, 100, 100),
    });
    const dotColor = p5Instance.color(255, 255, 0);

    screen.addEntity(new Background(screen));
    screen.addEntity(new LoadingSpinner(screen, dotColor));
    screen.addEntity(new FPSCounter(screen));

    p5Instance.preload = function () {};

    p5Instance.setup = function () {
        p5Instance.createCanvas(740, 400);
    };

    p5Instance.draw = function () {
        screen.update();
        screen.draw();
    };
}

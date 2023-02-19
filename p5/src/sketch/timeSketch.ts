import p5 from "p5";
import Background from "../entities/Background";
import DateTime from "../entities/DateTime";
import Screen from "../screen/Screen";

export default function timeSketch(p5Instance: p5) {
    const screen = new Screen(p5Instance);

    screen.addEntity(new Background(screen));
    screen.addEntity(new DateTime(screen));

    p5Instance.preload = function () {};

    p5Instance.setup = function () {
        p5Instance.createCanvas(740, 400);
        p5Instance.noLoop();
        setInterval(() => p5Instance.redraw(), 1000);
    };

    p5Instance.draw = function () {
        screen.update();
        screen.draw();
    };
}

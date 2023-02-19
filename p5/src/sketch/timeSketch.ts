import p5 from "p5";
import Background from "../entities/Background";
import DateTime from "../entities/DateTime";
import Screen from "../screen/Screen";

interface SketchState {
    backgroundColor: p5.Color;
}

export default function timeSketch(p5Instance: p5) {
    const screen = new Screen<SketchState>(p5Instance, {
        backgroundColor: p5Instance.color(0),
    });

    screen.addEntity(new Background(screen));
    screen.addEntity(new DateTime(screen));

    screen.setReducer((state, action) => {
        switch (action.type) {
            case "DATETIME_TICK":
                const randomColor = p5Instance.random(0, 100);
                state.backgroundColor = p5Instance.color(randomColor);
                break;
        }
    });

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

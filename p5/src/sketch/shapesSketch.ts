import p5 from "p5";
import Background from "../entities/Background";
import FPSCounter from "../entities/FPSCounter";
import Screen from "../screen/Screen";

export default function shapesSketch(p5Instance: p5) {
    const screen = new Screen(p5Instance, {
        backgroundColor: p5Instance.color(100, 100, 100),
    });

    screen.addEntity(new Background(screen));
    screen.addEntity(new FPSCounter(screen));

    p5Instance.preload = function () {};

    p5Instance.setup = function () {
        p5Instance.createCanvas(740, 400);
    };

    p5Instance.draw = function () {
        screen.update();
        screen.draw();

        const p = p5Instance;
        const shapeStart = 130;

        p.noStroke();
        p.fill(255);
        p.textAlign(p.LEFT, p.CENTER);

        withTranslate(p, 10, 10, () => {
            p.text("Line", 0, 0);
            p.rect(shapeStart, 0, 400, 1);
        });

        withTranslate(p, 10, 50, () => {
            p.text("Rectangle", 0, 10);
            p.rect(shapeStart, 0, 400, 10);
        });

        withTranslate(p, 10, 100, () => {
            p.text("Rectangle + stroke", 0, 5);
            p.stroke(255, 255, 0);
            p.fill(0, 0);
            p.rect(shapeStart, 0, 400, 10);
        });

        withTranslate(p, 10, 150, () => {
            p.text("Quad", 10, 20);
            p.stroke(0, 255, 0);
            p.fill(0, 130, 0);

            const v2 = p.createVector;

            const p1 = v2(shapeStart, 0);
            const p2 = v2(shapeStart + 55, 20);
            const p3 = v2(shapeStart, 40);
            const p4 = v2(shapeStart + 20, 20);
            p.quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

            const shapeStart2 = shapeStart + 100;
            const p11 = v2(shapeStart2 + 55, 0);
            const p12 = v2(shapeStart2, 20);
            const p13 = v2(shapeStart2 + 55, 40);
            const p14 = v2(shapeStart2 + 35, 20);
            p.quad(p11.x, p11.y, p12.x, p12.y, p13.x, p13.y, p14.x, p14.y);
        });

        withTranslate(p, 10, 250, () => {
            p.text("Arc", 10, 10);

            p.stroke(0, 0, 0);
            p.fill(0, 0, 170);
            p.arc(shapeStart + 50, 50, 100, 100, p.radians(0), p.radians(-90));
            p.arc(shapeStart + 200, 50, 100, 100, p.radians(45), p.radians(315));

            p.arc(shapeStart + 350, 50, 100, 100, p.TAU, -p.TAU / 4);
            p.arc(shapeStart + 500, 50, 100, 100, p.TAU / 8, -p.TAU / 8);

            p.stroke(0, 0, 0);
            p.fill(255, 255, 0);
            p.circle(shapeStart + 25, 25, 10);
            p.circle(shapeStart + 175, 25, 10);
            p.circle(shapeStart + 325, 25, 10);
            p.circle(shapeStart + 475, 25, 10);
        });
    };

    function withTranslate(p: p5, x: number, y: number, cb: () => void) {
        p.push();
        p.translate(x, y);
        cb();
        p.pop();
    }
}

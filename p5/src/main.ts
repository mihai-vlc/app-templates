import "./style.css";
import p5 from "p5";
import timeSketch from "./sketch/timeSketch";
import triangleSketch from "./sketch/triangleSketch";
import loadingSketch from "./sketch/loadingSketch";

let activeCanvas: p5;

interface SketchOptions {
    [key: string]: (p: p5) => void;
}

const sketchMap: SketchOptions = {
    time: timeSketch,
    triangle: triangleSketch,
    loading: loadingSketch,
};

initializeActiveSketchSelect();
createCanvas();

function initializeActiveSketchSelect() {
    const activeSketchElement =
        document.querySelector<HTMLSelectElement>(".js-active-sketch")!;

    activeSketchElement.addEventListener("change", function () {
        const value = this.value;
        localStorage.setItem("activeSketch", value);

        createCanvas();
    });

    const savedSketch = localStorage.getItem("activeSketch");

    Object.keys(sketchMap).map((key) => {
        activeSketchElement.add(
            new Option(key, key, false, savedSketch == key)
        );
    });
}

function getActiveSketch() {
    const activeSketch = localStorage.getItem("activeSketch") || "time";

    return sketchMap[activeSketch];
}

function createCanvas() {
    if (activeCanvas) {
        activeCanvas.remove();
    }

    activeCanvas = new p5(
        getActiveSketch(),
        document.querySelector<HTMLElement>("#app")!
    );
}

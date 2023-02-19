import "./style.css";
import p5 from "p5";
import timeSketch from "./sketch/timeSketch";

new p5(timeSketch, document.querySelector<HTMLElement>("#app")!);

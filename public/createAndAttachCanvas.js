import { COMPLETE } from "/constants.js";

const canvasStatus = document.querySelector("#canvas-status");
const status = document.querySelector("#status");

export function createAndAttachCanvas() {
  const { height: bodyHeight, width: bodyWidth } =
    document.body.getBoundingClientRect();
  const remainingHeight = innerHeight - bodyHeight - 32;
  const canvas = document.createElement("canvas");
  canvas.style.border = "1px solid black";
  canvas.height = remainingHeight < 300 ? 300 : remainingHeight;
  canvas.width = bodyWidth;
  document.body.appendChild(canvas);
  canvasStatus.textContent = COMPLETE;
}

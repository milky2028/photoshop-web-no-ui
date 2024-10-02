import { loadScript } from "/loadScript.js";
import { COMPLETE } from "/constants.js";

const status = document.querySelector("#status");
const glueStatus = document.querySelector("#glue-status");

export async function loadGlueCode() {
  const result = await loadScript("/apollo_web.CxKogY9t.js");
  status.textContent += result;
  glueStatus.textContent = COMPLETE;
}

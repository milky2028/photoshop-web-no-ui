import { loadScript } from "/loadScript.js";
import { COMPLETE, LOADING } from "/constants.js";

const status = document.querySelector("#status");
const glueStatus = document.querySelector("#glue-status");

export async function loadGlueCode() {
  glueStatus.textContent = LOADING;
  const result = await loadScript("/apollo_web.CxKogY9t.js");
  status.textContent += result;
  glueStatus.textContent = COMPLETE;
}

import { COMPLETE, LOADING } from "/constants.js";

let wasmRequest = undefined;
const { promise: wasmShouldBeLoaded, resolve: doWasmLoad } =
  Promise.withResolvers();

const originalFetch = fetch;
window.fetch = async (...args) => {
  if (typeof args[0] === "string" && args[0].includes(".wasm")) {
    await wasmShouldBeLoaded;
    wasmRequest = originalFetch(...args);
    return wasmRequest;
  }

  return originalFetch(...args);
};

const status = document.querySelector("#status");
const wasmStatus = document.querySelector("#wasm-status");

export async function loadWASM() {
  wasmStatus.textContent = LOADING;

  const { promise, resolve } = Promise.withResolvers();
  window.Module.onRuntimeInitialized = () => {
    status.textContent += " WASM loaded ✅";
    wasmStatus.textContent = COMPLETE;
    resolve();
  };

  doWasmLoad();
  await wasmRequest;

  return promise;
}

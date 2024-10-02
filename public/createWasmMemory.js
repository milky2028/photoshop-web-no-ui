import {
  ONE_GIBIBYTE,
  WASM_BLOCK_SIZE,
  COMPLETE,
  LOADING,
} from "/constants.js";

const status = document.querySelector("#status");
const memoryStatus = document.querySelector("#memory-status");

export function createWasmMemory(value) {
  memoryStatus.textContent = LOADING;
  const memory = new WebAssembly.Memory({
    initial: (value * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    maximum: (4 * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    shared: true,
  });

  globalThis.Module = globalThis.Module || {};
  globalThis.Module.wasmMemory = memory;

  status.textContent = "";
  status.textContent += "WASM memory created ✅";
  memoryStatus.textContent = COMPLETE;
}

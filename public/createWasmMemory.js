import { ONE_GIBIBYTE, WASM_BLOCK_SIZE, COMPLETE } from "/constants.js";

const status = document.querySelector("#status");
const memoryStatus = document.querySelector("#memory-status");

export function createWasmMemory(value) {
  const memory = new WebAssembly.Memory({
    initial: (value * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    maximum: (4 * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
    shared: true,
  });

  globalThis.Module = globalThis.Module || {};
  globalThis.Module.wasmMemory = memory;

  status.textContent = "";
  status.textContent += "WebAssemblyMemory created ✅";
  memoryStatus.textContent = COMPLETE;
}

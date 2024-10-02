const DEFAULT_AUTOBOOT_CONFIG = {
  "auto-memory": false,
  "auto-glue": false,
  "auto-wasm": false,
  "auto-canvas": false,
  "auto-file": false,
  "auto-stroke": false,
  "auto-memory-amount": 2,
};

const AUTOBOOT_KEY = "autoboot";
const storedAutobootConfig = localStorage.getItem(AUTOBOOT_KEY);
export const autobootConfig = storedAutobootConfig
  ? JSON.parse(storedAutobootConfig)
  : { ...DEFAULT_AUTOBOOT_CONFIG };

import { COMPLETE, LOADING } from "/constants.js";

const canvasStatus = document.querySelector("#canvas-status");
const status = document.querySelector("#status");

export function createAndAttachCanvas() {
  canvasStatus.textContent = LOADING;
  const { height: bodyHeight, width: bodyWidth } =
    document.body.getBoundingClientRect();
  const remainingHeight = innerHeight - bodyHeight - 32;

  const canvas = document.createElement("canvas");
  canvas.style.border = "2px solid blueviolet";
  canvas.height = remainingHeight < 300 ? 300 : remainingHeight;
  canvas.width = bodyWidth;
  document.body.appendChild(canvas);

  const apolloFeatureFlags = {
    genfill_use_clio3_model: false,
    genimage_use_clio3_model: false,
    web_use_acp_shim: false,
    coediting: false,
    coediting_disable_guardrails: false,
    coediting_disable_auto_connect: false,
  };

  const coreSettings = {
    _presets_root_path: "/",
    _settings_root_path: "/",
    _zstring_dictionary_path: "",
    _xmp_creator_tool: "PS web UI-less app",
    _analytics_app_name: "",
    _analytics_app_version: "",
    _analytics_api_key: "",
    _analytics_session_id: "1",
    _analytics_config_guid: "",
    _analytics_env: 0,
    _analytics_offline: "false",
    _analytics_language: "en",
    _analytics_user_agent: navigator.userAgent,
    _analytics_author: "",
    _analytics_user_type: "",
    _signing_app_name: "",
    _signing_app_version: "",
    _feature_state: apolloFeatureFlags,
  };

  const app = new window.Module.Application(coreSettings);
  app.connect_exception_handler(console.log);
  app.connect_notification_handler(console.log);

  app.init();
  window.app = app;

  const ctx = canvas.getContext("2d");
  const doc = app.documents().client_target().value();
  doc.make_renderer(
    1,
    (...args) => {
      console.log(...args);
    },
    1,
    0
  );

  canvasStatus.textContent = COMPLETE;
  status.textContent += " Canvas created and renderer attached ✅";
  return doc;
}

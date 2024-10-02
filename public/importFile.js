import { COMPLETE } from "/constants.js";

const fileStatus = document.querySelector("#file-status");
const status = document.querySelector("#status");

export function importFile(options = {}) {
  return new Promise((resolve) => {
    if (options.initiatedByAutoboot) {
      console.log("from autoboot");
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.height = 0;
      input.width = 0;

      input.addEventListener("change", (event) => {
        const worker = new Worker("/writeWorker.js");
        worker.addEventListener("message", ({ data }) => {
          if (data === "complete") {
            const doc = window.app.documents().unopened("dummy-doc");
            window.app
              .documents()
              .open(
                doc,
                "/persistent/imported-file.png",
                "",
                false,
                false,
                console.log
              );

            // window.app
            //   .tools()
            //   .place_tool()
            //   .place_new("/persistent/imported-file.any");

            fileStatus.textContent = COMPLETE;
            status.textContent += " File imported ✅";

            input.remove();
            worker.terminate();
            resolve();
          }
        });

        worker.postMessage({ file: event.target.files[0] });
      });

      document.body.appendChild(input);
      input.click();
    }
  });
}

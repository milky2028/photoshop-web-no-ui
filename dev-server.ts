import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const port = 8080;

async function handler(req: Request): Promise<Response> {
  const path = new URL(req.url).pathname;
  const ok = { status: 200 };
  const js = { "Content-Type": "text/javascript" };
  const isolated = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  };

  if (path.includes("favicon")) {
    return (
      new Response(await Deno.readFile("./public/favicon.ico")),
      {
        ...ok,
        "Content-Type": "image/png",
      }
    );
  }

  if (path.includes("index") || path === "/") {
    return new Response(await Deno.readFile("./public/index.html"), {
      ...ok,
      headers: { ...isolated },
    });
  }

  // if (path.includes("worker")) {
  //   return new Response(await Deno.readFile("./public/lib.worker.js"), {
  //     ...ok,
  //     headers: { ...isolated, ...js },
  //   });
  // }

  // if (path.includes(".map")) {
  //   return new Response(await Deno.readFile("./public/lib.wasm.map"), ok);
  // }

  if (path.includes("wasm")) {
    const wasm = { ...ok, headers: { "Content-Type": "application/wasm" } };
    return new Response(await Deno.readFile("./public/apollo_web.wasm"), wasm);
  }

  if (path.includes(".js")) {
    let file = undefined;
    if (path.includes("apollo")) {
      file = await Deno.readFile("./public/apollo_web.js");
    } else {
      file = await Deno.readFile(`./public${path}`);
    }

    return new Response(file, {
      ...ok,
      headers: { ...js, ...isolated },
    });
  }

  if (path.includes(".data")) {
    return new Response(
      await Deno.readFile("./public/apollo_web_required.data"),
      { ...ok }
    );
  }

  console.log(path);
  return new Response("Path not found", { status: 404 });
}

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });

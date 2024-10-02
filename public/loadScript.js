export function loadScript(url) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.onload = () => resolve(" JS glue code initialized ✅");
    script.onerror = () => resolve(" Failed to load JS glue code ❌");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
  });
}

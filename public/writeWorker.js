self.addEventListener("message", async ({ data: { file } }) => {
  const root = await navigator.storage.getDirectory();
  const handle = await root.getFileHandle("imported-file.any", {
    create: true,
  });

  const syncHandle = await handle.createSyncAccessHandle();
  let position = 0;

  const syncWriter = new WritableStream({
    write(chunk) {
      syncHandle.write(chunk, { at: position });
      position += chunk.byteLength;
    },
    async close() {
      await syncHandle.close();
    },
  });

  await file.stream().pipeTo(syncWriter);
  self.postMessage("complete");
});

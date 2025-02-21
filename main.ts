import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
    // Attempt to serve a file from the "dist" directory.
    const response = await serveDir(req, {
        fsRoot: ".",
        index: "index.html",
    });
    // If no file was found (status 404), serve the index file as fallback.
    if (response.status === 404) {
        return await serveFile(req, "./index.html");
    }
    return response;
});

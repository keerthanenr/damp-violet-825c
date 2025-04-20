import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/status", (c) => {
  return c.json({ status: "ok" });
});

// Serve JavaScript modules with correct MIME type
app.get("*.js", async (c) => {
  //@ts-ignore
  const response = await c.env.ASSETS.fetch(c.req.raw);
  return new Response(response.body, {
    headers: {
      ...Object.fromEntries(response.headers),
      "Content-Type": "application/javascript; charset=utf-8",
    },
    status: response.status,
    statusText: response.statusText,
  });
});

// Handle all other routes
app.get("*", (c) => {
  //@ts-ignore
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;

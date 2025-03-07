import { Hono } from "hono";

export { DataFetcher } from "./data-fetcher";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: `now: ${new Date().toISOString()}` });
});

export default app;

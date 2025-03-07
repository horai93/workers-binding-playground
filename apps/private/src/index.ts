import { Hono } from "hono";

const app = new Hono().get("/private", (c) => {
  return c.text("Hello from private api!");
});

export default app;

export type AppType = typeof app;

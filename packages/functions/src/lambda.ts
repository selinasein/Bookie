import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

const route = app.get("/", (c) => {
  return c.json({ message: "Hello, World!", language: "typescript" });
});

export type RouteType = typeof route;

export const handler = handle(app);

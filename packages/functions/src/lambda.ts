import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

const route = app.get("/", (c) => {
  //@ts-ignore
  const userId = c.env.event.requestContext.authorizer.jwt.claims.sub;
  return c.json({ message: "Hello, World!", language: "typescript", userId });
});

export type RouteType = typeof route;

export const handler = handle(app);

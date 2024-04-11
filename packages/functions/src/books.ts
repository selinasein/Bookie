import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/books/top", async (c) => {
  const res = await fetch(
    "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=BhB8WK2k4oLH1gPKfKg7s3hrPg4IPm0m"
  );

  const books = await res.json();
  return c.json({ books });
});

export const handler = handle(app);

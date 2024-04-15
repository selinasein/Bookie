import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { notes as notesTable } from "../../core/src/db/schema/notes";
import { db } from "../../core/src/db";
import { sum } from "drizzle-orm";

const app = new Hono();

app.get("/notes", async (c) => {
  const notes = await db.select().from(notesTable);
  return c.json({ notes });
});

app.post("/notes", async (c) => {
  const body = await c.req.json();
  const note = body.note;
  const newNote = await db.insert(notesTable).values(note).returning();
  return c.json({ note: newNote });
});

export const handler = handle(app);

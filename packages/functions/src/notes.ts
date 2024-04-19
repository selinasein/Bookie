import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";

import { db } from "../../core/src/db";
import { notes as notesTable } from "../../core/src/db/schema/notes";
import { likes as likesTable } from "../../core/src/db/schema/likes";
import { and, eq, desc } from "drizzle-orm";

import { sesClient, createSendEmailCommand } from "../../core/src/aws-ses";
import { authMiddleware } from "../../core/src/auth";

const app = new Hono();

app.use("/note/*", cors());

app.get("/note", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId))
    .orderBy(desc(notesTable.createdAt));

  return c.json({ notes });
});

app.post("/note", authMiddleware, async (c) => {
  const { title, content, bookId, bookImage, bookTitle, bookAuthor, username } =
    await c.req.json();
  const userId = c.var.userId;
  const note = {
    userId,
    username,
    title,
    content,
    bookId,
    bookImage,
    bookTitle,
    bookAuthor,
  };
  try {
    const newNote = await db.insert(notesTable).values(note).returning();
    const sendEmailCommand = createSendEmailCommand("neulmisscj@gmail.com");
    await sesClient.send(sendEmailCommand);
    return c.json({ note: newNote, userId });
  } catch (error) {
    c.json({ error: error });
  }
});

app.delete("/note/:id", authMiddleware, async (c) => {
  const id = parseInt(c.req.param("id"));
  const deletedNote = await db
    .delete(notesTable)
    .where(eq(notesTable.id, id))
    .returning();
  return c.json({ deletedNote });
});

app.post("/note/:id/likes", authMiddleware, async (c) => {
  const noteId = parseInt(c.req.param("id"));
  const userId = c.var.userId;

  const like = {
    userId,
    noteId,
  };

  const newLike = await db.insert(likesTable).values(like).returning();
  return c.json({ like: newLike });
});

app.delete("/note/:id/likes", authMiddleware, async (c) => {
  const noteId = parseInt(c.req.param("id"));
  const userId = c.var.userId;

  const deletedLike = await db
    .delete(likesTable)
    .where(and(eq(likesTable.noteId, noteId), eq(likesTable.userId, userId)))
    .returning();

  return c.json({ deletedLike });
});

export const handler = handle(app);

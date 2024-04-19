import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { notes as notesTable } from "../../core/src/db/schema/notes";
import { likes as likesTable } from "../../core/src/db/schema/likes";
import { db } from "../../core/src/db";
import { eq, and, sql } from "drizzle-orm";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/books/single/*", cors());

app.get("/books/single/:bookTitle/:author", async (c) => {
  const bookTitle = c.req.param("bookTitle").toLowerCase();
  const author = c.req.param("author").toLowerCase();

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}+inauthor:${author}key=AIzaSyBpVAklwNZinTXRczWCb9ZrPjLr7kzW7Sk`
  );
  const data = await res.json();

  const notes = await db
    .select()
    .from(notesTable)
    .where(
      and(
        eq(notesTable.bookTitle, bookTitle),
        eq(notesTable.bookAuthor, author)
      )
    );

  const likesPromises = notes.map(async (note) => {
    const likes = await db
      .select()
      .from(likesTable)
      .where(eq(likesTable.noteId, note.id));
    return {
      ...note,
      likes,
    };
  });

  const notesWithLikes = await Promise.all(likesPromises);

  return c.json({ data, notes: notesWithLikes });
});

export const handler = handle(app);

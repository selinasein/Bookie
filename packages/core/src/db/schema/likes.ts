import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { notes } from "./notes";

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  noteId: serial("note_id")
    .references(() => notes.id, { onDelete: "cascade" })
    .notNull(),
});

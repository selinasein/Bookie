import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { notes } from "./notes";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  noteId: serial("note_id")
    .references(() => notes.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

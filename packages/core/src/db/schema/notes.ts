import {
  numeric,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { number } from "zod";

export const notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    username: varchar("username", { length: 100 }).notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    content: varchar("content", { length: 500 }).notNull(),
    bookId: text("book_id").notNull(),
    bookImage: text("book_image").notNull(),
    bookTitle: varchar("book_title", { length: 100 }).notNull(),
    bookAuthor: varchar("book_author", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return { nameIdx: index("userId_idx").on(table.userId) };
  }
);

// export const noteRelations = relations(notes,({one})=>({
//   user: one(users, {fields: [notes.userId], })
// }) )

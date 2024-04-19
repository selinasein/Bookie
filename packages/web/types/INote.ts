export interface INote {
  id: number;
  userId: string;
  username: string;
  title: string;
  content: string;
  bookId: string;
  bookImage: string;
  bookTitle: string;
  bookAuthor: string;
  createdAt: string;
  updatedAt: string;
  likes: Like[];
}

export interface Like {
  id: number;
  userId: string;
  noteId: number;
}

// @ts-nocheck
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import NoteForm from "../components/note-form";
import StickyNote from "../components/sticky-note";
import NoData from "../components/no-data";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export async function getBook({ params }: any) {
  const bookId = params.bookTitle;
  const author = params.author;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/books/single/${bookId}/${author}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch best seller books");
    }
    const json = await response.json();
    const data = json.data.items[0];
    const notes = json.notes;

    return { data, notes };
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

export function SingleBook() {
  const foundBook = useLoaderData().data;
  const notes = useLoaderData().notes;
  const { user } = useKindeAuth();
  const userId = user?.id;
  const [showNoteForm, setShowNoteForm] = useState(false);

  return (
    <>
      <div className="bg-gray-50 text-black/50 p-10 grid grid-rows-3 grid-flow-col gap-4">
        <div className="col-span-2">
          <h3 className="text-6xl font-bold font-serif">
            {foundBook.volumeInfo.title}
          </h3>
          <p>{foundBook.volumeInfo.authors}</p>
          <div className="gap-3 flex m-2">
            <div className="badge badge-neutral text-xs">
              {foundBook.volumeInfo.categories}
            </div>
            <div className="badge badge-neutral text-xs">
              {foundBook.volumeInfo.language}
            </div>
            <div className="badge badge-neutral text-xs">
              {foundBook.volumeInfo.maturityRating}
            </div>
            {foundBook.volumeInfo.subtitle && (
              <div className="badge badge-neutral text-xs">
                {foundBook.volumeInfo.subtitle}
              </div>
            )}
          </div>
        </div>
        <div className="row-span-2 col-span-2 flex flex-col h-fit md:flex-row bg-white rounded-lg">
          <img
            src={foundBook.volumeInfo.imageLinks.thumbnail}
            alt={foundBook.volumeInfo.title}
            className="md:w-96 md:h-96 lg:w-auto lg:h-auto"
          />

          <div className="w-96 text-sm flex-1 p-5">
            <p>{foundBook.volumeInfo.description}</p>
          </div>
        </div>
        <div className="row-span-3">
          <NoteForm
            bookId={foundBook.id}
            bookImage={foundBook.volumeInfo.imageLinks.thumbnail}
            bookTitle={foundBook.volumeInfo.title.toLowerCase()}
            bookAuthor={foundBook.volumeInfo.authors[0].toLowerCase()}
          />
        </div>
      </div>

      <div className=" text-black/50 flex justify-center items-center flex-col p-10">
        <h3 className="text-4xl font-serif text-black/50 font-semibold">
          <span className="text-black">Readers.</span> Review
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 p-5">
          {notes.length > 0 ? (
            notes.map((note, i) => (
              <StickyNote
                note={note}
                i={i}
                liked={note.likes.some((item) => item.userId === userId)}
              />
            ))
          ) : (
            <NoData message="No notes found" />
          )}
        </div>
      </div>
    </>
  );
}

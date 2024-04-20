import { Link } from "react-router-dom";
import { INote } from "../../types/INote";
import { capitalizeWords, getFormattedDate } from "../utils/functions";
import loadingbutton from "/animation/LoadingButton.gif";
import { useState } from "react";

export const NoteCard: React.FC<{
  key: number;
  note: INote;
  i: number;
  deleteFunction: (id: number) => void;
  loading: boolean;
}> = ({ i, key, note, deleteFunction, loading }) => {
  const [noteToLoad, setNoteToLoad] = useState(-1);
  return (
    <div className="flex flex-col p-10 gap-3 md:m-4 w-full" key={key}>
      <div className="flex gap-3">
        <div className="flex-none">
          <Link to={`/book/single/${note.bookTitle}/${note.bookAuthor}`}>
            <img src={note.bookImage} alt={note.bookTitle} />
          </Link>
        </div>
        <div className="flex-grow">
          <div className="mb-2">
            <p className="font-serif text-md font-semibold">{note.title}</p>
            <p className="text-sm">
              {capitalizeWords(note.bookTitle)} by{" "}
              {capitalizeWords(note.bookAuthor)}
            </p>
          </div>
          <div>{note.content}</div>
        </div>
        <div className="mt-auto text-right">
          <div className="flex flex-row gap-3">
            <div className="text-xs ">{getFormattedDate(note.createdAt)}</div>
            <div>
              {loading && noteToLoad == i ? (
                <button onClick={() => deleteFunction(note.id)} value={note.id}>
                  <img
                    src={loadingbutton}
                    alt="loading"
                    className="w-5 h-5 p-1 items-center justify-center"
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setNoteToLoad(i);
                    deleteFunction(note.id);
                  }}
                  value={note.id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 hover:text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

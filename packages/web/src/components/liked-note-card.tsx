import { Link } from "react-router-dom";
import { INote } from "../../types/INote";
import { capitalizeWords, getFormattedDate } from "../utils/functions";
import loadingbuttonGif from "/animation/LoadingButton.gif";

export const LikedNoteCard: React.FC<{
  key: number;
  note: INote;
  deleteFunction: (id: number) => void;
  loading: boolean;
}> = ({ key, note, deleteFunction, loading }) => {
  return (
    <div className="flex flex-col p-10 gap-3 md:m-4 w-full" key={key}>
      <div className="flex-none">
        <Link to={`/book/single/${note.bookTitle}/${note.bookAuthor}`}>
          <img src={note.bookImage} alt={note.bookTitle} />
        </Link>
      </div>
      <div className="grow">
        <div className="mb-2">
          <p className="font-serif text-md font-semibold">{note.title}</p>
          <p className="text-sm">
            {capitalizeWords(note.bookTitle)} by{" "}
            {capitalizeWords(note.bookAuthor)}
          </p>
          <p className="text-sm">Note Owner: {note.username}</p>
        </div>
        <div>{note.content}</div>
        <div className="text-right">
          {getFormattedDate(note.createdAt)}
          {loading ? (
            <button onClick={() => deleteFunction(note.id)} value={note.id}>
              <img
                src={loadingbuttonGif}
                alt="loading"
                className="w-5 h-5 p-1 items-center justify-center"
              />
            </button>
          ) : (
            <button onClick={() => deleteFunction(note.id)} value={note.id}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

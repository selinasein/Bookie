import { useEffect, useState } from "react";
import { INote } from "../../types/INote";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useRevalidator } from "react-router-dom";
import { getFormattedDate } from "../utils/functions";
import loadingbutton from "/animation/LoadingButton.gif";

export default function StickyNote({
  note,
  i,
  liked,
}: {
  note: INote;
  i: number;
  liked: boolean;
}) {
  const { getToken, user } = useKindeAuth();
  const [token, setToken] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  let revalidator = useRevalidator();

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);

  const toggleLike = async (noteId: number) => {
    if (liked) {
      deleteLike(noteId);
    }

    if (!liked) {
      addLike(noteId);
    }
  };

  const addLike = async (noteId: number) => {
    setLikeLoading(true);
    const token = await getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/note/${noteId}/likes`,
        {
          method: "post",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to like note:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const deleteLike = async (noteId: number) => {
    setDeleteLoading(true);
    const token = await getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/note/${noteId}/likes`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to delete like:", error);
    }
  };

  const deleteNote = async (noteId: number) => {
    const token = await getToken();

    setDeleteLoading(true);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/note/${noteId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      alert("Note deleted successfully!");
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
    setDeleteLoading(false);
  };

  return (
    <div
      className="flew flew-row w-96 md:w-72 h-96 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black/70 bg-slate-300 p-3 flex flex-col justify-between"
      key={i}
    >
      <div className="flex-grow">
        <p className="font-semibold text-sm">{note.title}</p>
        <div className="text-xs flex flex-row gap-1 flex-none">
          <p>{note.username}</p>
          <p>{getFormattedDate(note.createdAt)}</p>
        </div>
        <div className="divider m-0 mb-2" />
        <div className="text-xs overflow-y-auto">{note.content}</div>
      </div>
      {token !== "" && (
        <div className="flex-none">
          <div className="flex items-end justify-end gap-1 mb-3">
            <button onClick={() => toggleLike(note.id)} value={note.id}>
              {likeLoading ? (
                <img
                  src={loadingbutton}
                  alt="loading"
                  className="w-5 h-5 items-center justify-center"
                />
              ) : liked ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
              )}
            </button>

            {user?.given_name === note.username ? (
              <button onClick={() => deleteNote(note.id)} value={note.id}>
                {deleteLoading ? (
                  <img
                    src={loadingbutton}
                    alt="loading"
                    className="w-5 h-5 items-center justify-center"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                )}
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

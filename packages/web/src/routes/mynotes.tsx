import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { INote } from "../../types/INote";
import { NoteCard } from "../components/note-card";
import NoData from "../components/no-data";
import readGif from "/animation/Reading.gif";
import loadGif from "/animation/Loading.gif";

const deleteLike = async (noteId: number) => {
  const { getToken } = useKindeAuth();
  const token = await getToken();

  const headers: HeadersInit = new Headers({
    "Content-Type": "application/json",
  });

  if (token) {
    headers.set("Authorization", `${token}`);
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
    console.log("Like deleted successfully");
  } catch (error) {
    console.error("Failed to delete like:", error);
  }
};

export function MyNotes() {
  const { getToken } = useKindeAuth();
  const { user } = useKindeAuth();
  const [notes, setNotes] = useState<INote[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = await getToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/note`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="text-black/50 flex justify-center items-center flex-col pb-10">
      <div className="grid md:grid-cols-2 lg:mx-32 gap-3">
        <div className="flex flex-col text-center justify-center content-center gap-3 m-4">
          <h2 className="text-5xl font-serif">
            {user?.given_name}, Here are your notes
          </h2>
          <p>
            "Books are the plane, and the train, and the road. They are the
            destination, and the journey. They are home."{" "}
          </p>
          <p className="text-right">- Anna Quindlen</p>
        </div>
        <div>
          <img src={readGif} alt="Bookie" className="w-auto" />
        </div>
      </div>
      <div className="divider" />
      {notes ? (
        notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={() => deleteLike(note.id)}
            />
          ))
        ) : (
          <NoData message="There is currently no notes to show" />
        )
      ) : (
        <div>
          <img src={loadGif} alt="Loading" className="w-96" />
        </div>
      )}
    </div>
  );
}

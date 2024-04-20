import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { INote } from "../../types/INote";
import { NoteCard } from "../components/note-card";
import NoData from "../components/no-data";
import readGif from "/animation/Reading.gif";
import loadGif from "/animation/Loading.gif";
import { useNavigate, useRevalidator } from "react-router-dom";

export function MyNotes() {
  const { getToken } = useKindeAuth();
  const { user, isAuthenticated } = useKindeAuth();
  const [notes, setNotes] = useState<INote[] | null>(null);
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/note`, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const deleteNote = async (noteId: number) => {
    const token = await getToken();

    setLoading(true);

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
      await fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="text-black/50 flex justify-center items-center flex-col pb-10 m-3">
      <div className="grid md:grid-cols-2 lg:mx-32 gap-3">
        <div className="flex flex-col text-center justify-center content-center md:gap-3 m-4">
          <h2 className="text-2xl md:text-5xl font-serif">
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
          notes.map((note, i) => (
            <NoteCard
              key={note.id}
              i={i}
              note={note}
              deleteFunction={() => deleteNote(note.id)}
              loading={loading}
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

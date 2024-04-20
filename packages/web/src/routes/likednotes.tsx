// @ts-nocheck
import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { INote } from "../../types/INote";
import { NoteCard } from "../components/note-card";
import NoData from "../components/no-data";
import likeGif from "/animation/Like.gif";
import loadGif from "/animation/Loading.gif";
import { useRevalidator, Navigate, useNavigate } from "react-router-dom";
import { LikedNoteCard } from "../components/liked-note-card";

export default function LikedNotes() {
  const { getToken } = useKindeAuth();
  const { user, isAuthenticated } = useKindeAuth();
  const [notes, setNotes] = useState<INote[] | null>(null);
  const [loading, setLoading] = useState(false);
  let revalidator = useRevalidator();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const fetchNotes = async () => {
    const token = await getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/note/liked`,
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
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, []);

  const deleteLike = async (noteId: number) => {
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
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete like:", error);
    }
  };

  return (
    <div className="text-black/50 flex justify-center items-center flex-col pb-10">
      <div className="grid md:grid-cols-2 lg:mx-32 gap-3">
        <div className="flex flex-col text-center justify-center content-center md:gap-3 m-4">
          <h2 className="text-2xl md:text-4xl font-serif">
            {user?.given_name}, Here are what you liked
          </h2>
          <p>
            "I do believe something very magical can happen when you read a good
            book."{" "}
          </p>
          <p className="text-right">- J.K. Rowling</p>
        </div>
        <div>
          <img src={likeGif} alt="Bookie" className="w-auto" />
        </div>
      </div>
      <div className="divider" />
      {notes ? (
        notes.length > 0 ? (
          notes.map((note) => (
            <LikedNoteCard
              key={note.id}
              note={note}
              deleteFunction={() => deleteLike(note.id)}
              loading={loading}
            />
          ))
        ) : (
          <NoData message="There is currently no notes you liked" />
        )
      ) : (
        <div>
          <img src={loadGif} alt="Loading" className="w-96" />
        </div>
      )}
    </div>
  );
}

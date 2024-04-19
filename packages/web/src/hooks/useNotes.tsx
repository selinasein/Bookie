import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { INote } from "../../types/INote";

export const useNotes = () => {
  const { getToken } = useKindeAuth();
  const [notes, setNotes] = useState<INote[] | null>(null);

  useEffect(() => {
    const getNotesForUser = async () => {
      const token = await getToken();

      const headers = {
        "Content-Type": "application/json",
        Authorization: token ? `${token}` : "",
      };

      console.log(headers);

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
        const json = await response.json();
        console.log(json);
        setNotes(json);
      } catch (error) {
        console.error("Error fetching notes:", error);
        //@ts-ignore
        console.log("Response status:", error.response?.status);
        //@ts-ignore
        console.log("Response body:", error.response?.data);
        throw new Error("Failed to fetch notes");
      }
    };

    getNotesForUser();
  }, []);
  return notes;
};

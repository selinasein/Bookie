import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState, ChangeEvent } from "react";
import { useRevalidator } from "react-router-dom";

type NoteFormProps = {
  bookId: string;
  bookImage: string;
  bookTitle: string;
  bookAuthor: string;
};

export default function NoteForm({
  bookId,
  bookImage,
  bookTitle,
  bookAuthor,
}: NoteFormProps) {
  const { getToken } = useKindeAuth();
  const { user } = useKindeAuth();

  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState({ content: false, title: false });
  const [characterCount, setCharacterCount] = useState(0);

  let revalidator = useRevalidator();

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTitle = e.target.value;

    if (currentTitle.length > 100) {
      setIsError({ ...isError, title: true });
    } else {
      setIsError({ ...isError, title: false });
    }

    setTitle(currentTitle);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentContent = e.target.value;

    if (currentContent.length > 500) {
      setIsError({ ...isError, content: true });
    } else {
      setIsError({ ...isError, content: false });
    }
    setContent(currentContent.slice(0, 500));
    setCharacterCount(currentContent.slice(0, 500).length);
  };

  const errorMessage = ({
    target,
    limit,
  }: {
    target: string;
    limit: number;
  }) => {
    return (
      <div className="text-red-500 text-xs italic text-right">
        {target} cannot exceed {limit} characters.
      </div>
    );
  };

  const addNoteHandler = async (e: any) => {
    e.preventDefault();

    try {
      const token = await getToken();

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/note`, {
        method: "post",
        body: JSON.stringify({
          title,
          content,
          username: user?.given_name,
          bookId,
          bookImage,
          bookTitle,
          bookAuthor,
        }),
        headers: headers,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      alert("Note added successfully!");
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("Failed to add the note. Please try again.");
    } finally {
      setTitle("");
      setContent("");
      setCharacterCount(0);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 h-full">
      <form onSubmit={addNoteHandler} className="p-2">
        <h2 className="text-lg font-bold p-1">
          What do you think about this book?
        </h2>
        <div className="flex flex-col gap-2 p-2">
          <label
            htmlFor="title"
            className="bg-green-200 w-24 p-1 rounded-xl text-center font-semibold"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Summarize your thought in one line here ..."
            className="input input-ghost w-full text-sm text-black"
            value={title}
            onChange={(e) => handleTitleChange(e)}
            required
          />
          <label
            htmlFor="content"
            className="bg-amber-200 w-24 p-1 rounded-xl text-center font-semibold"
          >
            Content
          </label>
          <textarea
            className="textarea textarea-ghost h-52 text-sm text-black"
            name="content"
            placeholder="Write your thoughts here ..."
            value={content}
            onChange={(e) => handleContentChange(e)}
            required
          ></textarea>
          <div className="w-full h-10 overflow-hidden ">
            {isError.title && errorMessage({ target: "Title", limit: 100 })}
            {isError.content && errorMessage({ target: "Content", limit: 400 })}
          </div>
        </div>
        <button
          disabled={token === ""}
          className="bg-purple-200 hover:bg-purple-300 w-24 p-1 rounded-xl text-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Note
        </button>
        <div className="text-right text-xs text-gray-500">
          Characters: {characterCount}
        </div>
        {token === "" && (
          <p className="text-sm mt-1 p-1">Log in to add a note</p>
        )}
      </form>
    </div>
  );
}

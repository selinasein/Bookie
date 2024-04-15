import { IBestSeller } from "../../types/IBestSellers";
import bookGif from "/assets/Book.gif";
import { FormEvent, useEffect, useState } from "react";

async function getBestSellerBooks() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/books/best`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch best seller books");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export default function Dashboard({}) {
  const [bestSellers, setBestSellers] = useState<IBestSeller | null>(null);
  const date = bestSellers?.bestsellers_date;
  const books = bestSellers?.lists[0].books;

  const [bookTitle, setBookTitle] = useState<string>("");
  const [booksByTitle, setBooksByTitle] = useState<any[] | null>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParam = encodeURIComponent(bookTitle);

    async function getBooksByTitle() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/books/${queryParam}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books by title");
        }
        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching books by title:", error);
        throw error;
      }
    }

    getBooksByTitle()
      .then((data) => setBooksByTitle(data.items))
      .then(() => console.log(booksByTitle))
      .catch((error) => console.error("Failed to load books by title:", error));
  };

  useEffect(() => {
    getBestSellerBooks()
      .then((data) => setBestSellers(data))
      .catch((error) => console.error("Failed to load books:", error));
  }, []);

  return (
    <>
      <div className="bg-gray-50 text-black/50 flex justify-center items-center flex-col mb-6 py-5">
        <div className="grid md:grid-cols-2 mt-10 md:mx-32 md:my-4 ">
          <div className="bg-gray-50 text-black/50 col-span-1 items-center justify-center flex">
            <img src={bookGif} alt="Bookie" className="w-auto" />
          </div>
          <div className="flex flex-col text-center justify-center content-center mt-10">
            <h2 className="text-7xl font-serif leading-snug">
              Welcome to{" "}
              <span className="block font-bold text-blue-400">Bookie.</span>
            </h2>
            <p className="text-justify mx-14 p-2">
              Here, you can search for your next favorite book, record your
              thoughts after an enjoyable read, and even share your insights
              with other book enthusiasts.{" "}
              <span className="font-semibold">
                Engage in stimulating discussions as others interact with your
                reflections.
              </span>
            </p>
            <form className="mt-6 flex justify-center" onSubmit={submitHandler}>
              <label className="input md:input-lg input-bordered flex	items-center gap-2">
                <input
                  type="text"
                  value={bookTitle}
                  placeholder="Search by title..."
                  onChange={(e) => {
                    setBookTitle(e.target.value);
                  }}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-3 px-10 flex flex-col">
        <pre></pre>
        <div>
          <h3 className="text-lg font-semibold place-items-start">
            Latest Best Sellers
          </h3>
          <span className="badge">Date: {date}</span>
        </div>
        <div>
          {books?.map((book: any) => (
            <p>{book.title}</p>
          ))}
        </div>
      </div>
    </>
  );
}

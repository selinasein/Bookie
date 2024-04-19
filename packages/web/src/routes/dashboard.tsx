import { Link } from "react-router-dom";
import { ISearchedBook } from "../../types/ISearchedBook";
import { IBestBook } from "../../types/IBestSellers";
import { useBooks } from "../hooks/useBooks";
import bookGif from "/animation/Book.gif";
import { useEffect, useState } from "react";
import NoData from "../components/no-data";
import { cutTitle } from "../utils/functions";

export default function Dashboard({}) {
  const bestsResult = useBooks();
  const [bookTitle, setBookTitle] = useState("");
  const [checked, setChecked] = useState(true);
  const [searchedBooks, setSearchedBooks] = useState<ISearchedBook[] | null>(
    null
  );

  useEffect(() => {
    if (searchedBooks && searchedBooks.length > 0) {
      setChecked(false);
    }
    if (bestsResult && bestsResult.length > 0) {
      setChecked(true);
    }
  }, [searchedBooks]);

  let bestSellers;
  if (typeof bestsResult === "string") {
    bestSellers = JSON.parse(bestsResult);
  } else {
    bestSellers = bestsResult;
  }

  const toggleChecked = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const getBooksByTitle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedBooks(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/books/${bookTitle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books by title");
      }
      const json = await response.json();
      const data = JSON.parse(json);
      console.log(data, "data");
      setSearchedBooks(data);
    } catch (error) {
      console.error("Error fetching books by title:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-50 text-black/50 flex justify-center items-center flex-col pb-10">
        <div className="grid md:grid-cols-2 lg:mx-32">
          <div>
            <img src={bookGif} alt="Bookie" className="w-auto" />
          </div>
          <div className="flex flex-col text-center justify-center content-center">
            <h2 className="text-7xl font-serif">
              Welcome to{" "}
              <span className="block font-bold text-blue-400">Bookie.</span>
            </h2>
            <p className="text-justify mx-14 p-2 text-sm">
              Here, you can search for your next favorite book, record your
              thoughts after an enjoyable read, and even share your insights
              with other book enthusiasts.{" "}
            </p>
            <form
              className="mt-6 flex justify-center"
              onSubmit={(e) => {
                getBooksByTitle(e);
              }}
            >
              <label className="input input-bordered flex items-center gap-2 w-96">
                <input
                  type="text"
                  value={bookTitle}
                  placeholder="Search by title..."
                  onChange={(e) => {
                    setBookTitle(e.target.value);
                  }}
                  className="w-full"
                />
                <button className="flex-shrink-0">
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
      <div className="md:px-20">
        <div role="tablist" className="tabs tabs-bordered mt-3">
          <input
            type="radio"
            name="Best"
            role="tab"
            className="tab"
            aria-label="Best"
            checked={checked}
            onClick={toggleChecked}
          />
          <div role="tabpanel" className="tab-content p-7 mt-24 md:mt-5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-32 md:gap-12">
              {bestSellers
                ? bestSellers.map((b: IBestBook, i: number) => (
                    <div
                      className="bg-blue-100 h-56 md:h-56 w-full rounded-3xl grid grid-cols-2 md:mt-11 md:gap-1"
                      key={i}
                    >
                      <div className="relative m-10 md:m-4">
                        <div className="absolute bottom-1 w-40">
                          <img
                            src={b.book_image}
                            alt={b.title}
                            width={b.book_image_width}
                            height={b.book_image_height}
                          />
                        </div>
                      </div>
                      <div className="m-2 mr-5">
                        <p className="font-bold text-lg">{cutTitle(b.title)}</p>
                        <p className="text-gray-500">{b.author}</p>
                        <div className="h-20 md:h-16 text-wrap overflow-hidden mb-3">
                          <p className="text-sm">{b.description}</p>
                        </div>
                        <Link to={`/book/single/${b.title}/${b.author}`}>
                          <button className="btn btn-neutral w-full">
                            See More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                : NoData({
                    message:
                      "There is no best seller at the moment! Find your own book!",
                  })}
            </div>
          </div>

          <input
            type="radio"
            name="Search"
            role="tab"
            className="tab"
            aria-label="Search"
            checked={!checked}
            onClick={toggleChecked}
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-32 md:gap-12">
              {searchedBooks
                ? searchedBooks.map((b: ISearchedBook, i: number) => (
                    <div
                      className="bg-blue-100 h-56 md:h-56 w-full rounded-3xl grid grid-cols-2 md:mt-11 md:gap-1"
                      key={i}
                    >
                      <div className="relative m-10 md:m-4">
                        <div className="absolute bottom-1 w-40">
                          <img
                            src={
                              b.volumeInfo.imageLinks?.thumbnail ||
                              b.volumeInfo.imageLinks?.smallThumbnail ||
                              "/images/default-thumbnail.png"
                            }
                            alt={b.volumeInfo.title}
                          />
                        </div>
                      </div>
                      <div className="m-2 mr-5">
                        <p className="font-bold text-lg">
                          {cutTitle(b.volumeInfo.title)}
                        </p>
                        <p className="text-gray-500">
                          {b.volumeInfo.authors?.[0] || "Unknown Author"}
                        </p>
                        <div className="h-20 md:h-16 text-wrap overflow-hidden mb-3">
                          <p className="text-sm">
                            {b.searchInfo?.textSnippet ||
                              "No description available."}
                          </p>
                        </div>
                        <Link
                          to={`/book/single/${b.volumeInfo.title}/${b.volumeInfo.authors[0]}`}
                        >
                          <button className="btn btn-neutral w-full">
                            See More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                : NoData({
                    message:
                      "There is no book with the title you searched for! Try another title.",
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

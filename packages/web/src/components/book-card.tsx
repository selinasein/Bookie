// @ts-nocheck
import { Link } from "react-router-dom";
import { cutTitle } from "../utils/functions";

export default function BookCard({ book }: any) {
  const getImageSrc = () => {
    if ("book_image" in book) {
      return book.book_image;
    } else if (book.volumeInfo?.imageLinks?.thumbnail) {
      return book.volumeInfo.imageLinks.thumbnail;
    }
    return ""; // Default image or handling if no image available
  };

  return (
    <div className="bg-blue-100 h-56 md:h-56 w-full rounded-3xl grid grid-cols-2 md:mt-11 md:gap-1">
      <div className="relative m-10 md:m-4">
        <div className="absolute bottom-1 w-40">
          <img
            src={book.book_image || book.volumeInfo.imageLinks.thumbnail}
            alt={book.title}
            width={book.book_image_width}
            height={book.book_image_height}
          />
        </div>
      </div>
      <div className="m-2 mr-5">
        <p className="font-bold text-lg">{cutTitle(book.title)}</p>
        <p className="text-gray-500">{book.author}</p>
        <div className="h-20 md:h-16 text-wrap overflow-hidden mb-3">
          <p className="text-sm">{book.description}</p>
        </div>
        <Link to={`/book/single/${book.title}/${book.author}`}>
          <button className="btn btn-neutral w-full">See More</button>
        </Link>
      </div>
    </div>
  );
}

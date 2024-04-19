import { useState, useEffect } from "react";
import { IBestBook } from "../../types/IBestSellers";

export const useBooks = () => {
  const [bestSellers, setBestSellers] = useState<IBestBook[] | null>(null);

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/books/best`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch best seller books");
        }
        const data = await response.json();
        setBestSellers(data);
        localStorage.setItem("books", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const cachedBooks = localStorage.getItem("books");
    if (!cachedBooks) {
      getBestSellers();
    } else {
      setBestSellers(JSON.parse(cachedBooks));
    }

    const intervalId = setInterval(() => {
      localStorage.removeItem("books");
      getBestSellers();
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  return bestSellers;
};

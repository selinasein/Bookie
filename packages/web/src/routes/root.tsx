import { useEffect } from "react";
import Booklist from "../components/booklist";
import { Link } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Root({}) {
  const { isAuthenticated } = useKindeAuth();
  const { login } = useKindeAuth();
  // const isAuthenticated = true;

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        //@ts-ignore
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        //@ts-ignore
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          //@ts-ignore
          duplicatedItem.setAttribute("aria-hidden", true);
          //@ts-ignore
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className="bg-gray-50 h-100 flex flex-col text-black/50 dark:bg-black dark:text-white/50 justify-center items-center">
      <div className="scroller items-center justify-center flex absolute top-0 opacity-20">
        <Booklist />
      </div>
      <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
        <div className="relative w-full max-w-2xl lg:max-w-7xl">
          <header className="grid md:grid-cols-2 items-center lg:grid-cols-3">
            <div className="flex flex-col lg:justify-center lg:col-start-2 text-center">
              <h1 className="text-8xl font-serif">Bookie.</h1>
              <p>Share your thoughts on books with others.</p>
            </div>
          </header>
          <nav className="-mx-3 flex flex-1 justify-end ">
            {isAuthenticated ? (
              <Link
                to={"/dashboard"}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-black/50"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to={"/dashboard"}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-black/50"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    login();
                  }}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-black/50"
                >
                  Log in
                </button>
              </>
            )}
          </nav>

          <main className="mt-6"></main>
        </div>
      </div>
      <div
        className="scroller items-center justify-center flex absolute bottom-0 opacity-20"
        data-direction="right"
      >
        <Booklist />
      </div>
    </div>
  );
}

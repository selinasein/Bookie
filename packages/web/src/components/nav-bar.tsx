import { Link, Outlet } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function NavBar({}: {}) {
  const { isAuthenticated, logout, login, user } = useKindeAuth();

  const auth = {
    user: user?.given_name,
    email: user?.email,
    avatar: user?.picture || "/images/default-user.png",
  };

  return (
    <>
      <div className="navbar bg-gray-50 md:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                {isAuthenticated ? <Link to="/mynotes">My Notes</Link> : null}
              </li>
              <li>
                {isAuthenticated ? (
                  <Link to="/likednotes">Liked Notes</Link>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/">
            <h1 className="text-3xl font-serif text-black/50">Bookie.</h1>
          </Link>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={auth?.avatar}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 items-start"
                >
                  <li className="ml-3"> Hi, {auth.user}</li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 text-black/50 navbar top-0 px-10 py-5 hidden md:flex">
        <div className="navbar-start">
          <Link to="/" className="ml-3">
            <h1 className="text-4xl font-serif">Bookie.</h1>
          </Link>
        </div>
        <div className="navbar-center md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              {isAuthenticated ? <Link to="/mynotes">My Notes</Link> : null}
            </li>
            <li>
              {isAuthenticated ? (
                <Link to="/likednotes">Liked Notes</Link>
              ) : null}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={auth?.avatar}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 items-start"
                >
                  <li className="ml-3"> Hi, {auth.user}</li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

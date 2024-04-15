import { Link, Outlet } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
// import Login from "../routes/authenticated";

export default function NavBar({}: {}) {
  // const { isAuthenticated }= useKindeAuth();
  const isAuthenticated = true;
  const { logout } = useKindeAuth();

  const auth = {
    user: "selinapark",
    email: "selinapark@gmail.com",
    avatar:
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  };

  return (
    <>
      <div className="bg-gray-50 text-black/50 navbar absolute top-0 px-10 py-5 bg-transparent">
        <div className="navbar-start">
          <Link to="/" className="ml-3">
            <h1 className="text-4xl font-serif">Bookie.</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <details>
                <summary>Feed</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/notes">Notes</Link>
                  </li>
                  <li>
                    <Link to="pictures">Pictures</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>{isAuthenticated ? <Link to="/liked">Liked</Link> : null}</li>
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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="setting">Settings</Link>
                  </li>
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
            <Link to="login">Log In</Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

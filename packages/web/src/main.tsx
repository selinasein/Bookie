import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Dashboard from "./routes/dashboard";

import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import NavBar from "./components/nav-bar";
import { getBook, SingleBook } from "./routes/singlebook";
import { MyNotes } from "./routes/mynotes";
import LikedNotes from "./routes/likednotes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />} path="/" errorElement={<ErrorPage />} />
      <Route element={<NavBar />} errorElement={<ErrorPage />}>
        <Route element={<Dashboard />} path="/dashboard" />
        <Route
          loader={getBook}
          element={<SingleBook />}
          path="/book/single/:bookTitle/:author"
        />
        <Route element={<MyNotes />} path="/mynotes" />
        <Route element={<LikedNotes />} path="/likednotes" />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      audience={import.meta.env.VITE_APP_KINDE_AUDIENCE}
      clientId="ef30895abe074f6c8be6334a0795e1cd"
      domain="https://bookie.kinde.com"
      logoutUri={window.location.origin}
      redirectUri={window.location.origin}
    >
      <RouterProvider router={router} />
    </KindeProvider>
  </React.StrictMode>
);

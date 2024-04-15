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
import Login from "./routes/authenticated";
import NavBar from "./components/nav-bar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />} path="/" errorElement={<ErrorPage />} />
      <Route element={<NavBar />} errorElement={<ErrorPage />}>
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Login />} path="/login" />
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
      {/* Later <QueryClinetProvider client={queryClient} */}
      <RouterProvider router={router} />
      {/* Later <QueryClinetProvider client={queryClient} */}
    </KindeProvider>
  </React.StrictMode>
);
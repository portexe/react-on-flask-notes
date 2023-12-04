import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home, Note } from "./v2/pages";
import { Login, NewNote, Register } from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/note", element: <Note /> },
  { path: "/note/:id", element: <Note /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

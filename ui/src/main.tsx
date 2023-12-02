import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./v2/pages/Home";
import { Login, NewNote, Note, Register } from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/new", element: <NewNote /> },
  { path: "/note/:id", element: <Note /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

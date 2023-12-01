import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./v2/pages/Home";
import { App, Login, NewNote, Note, Register } from "./components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { App, Login, NewNote, Note, Register } from "./components/pages";

// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   { path: "/new", element: <NewNote /> },
//   { path: "/note/:id", element: <Note /> },
// ]);

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

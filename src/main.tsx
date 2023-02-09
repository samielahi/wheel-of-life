import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { enableMapSet } from "immer";
import { getAnimationByIdx } from "./state/idb";
import Home from "./routes/home";
import Menu from "./routes/menu";
import Editor from "./routes/editor";
import Zoetrope from "./routes/zoetrope";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/zoetrope",
    element: <Zoetrope />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/animations",
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/animation-editor",
    errorElement: <ErrorPage />,
    loader: () => redirect("/animations"),
  },
  {
    path: "/animation-editor/:name",
    element: <Editor />,
    loader: async ({ params }) => {
      const animation = await getAnimationByIdx(params.name!);
      if (!animation) {
        return redirect("/animations");
      }

      return null;
    },
    errorElement: <ErrorPage />,
  },
]);

enableMapSet();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

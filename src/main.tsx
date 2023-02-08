import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import AnimationMenu from "./components/AnimationMenu/AnimationMenu";
import "./global.css";
import ErrorPage from "./error-page";
import AnimationEditor from "./components/AnimationEditor/AnimationEditor";
import { enableMapSet } from "immer";
import { getAnimationByIdx } from "./state/idb";
import Scene from "./components/Zoetrope/Scene";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/zoetrope",
    element: <Scene />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/animations",
    element: <AnimationMenu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/animation-editor",
    errorElement: <ErrorPage />,
    loader: () => redirect("/animations"),
  },
  {
    path: "/animation-editor/:name",
    element: <AnimationEditor />,
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

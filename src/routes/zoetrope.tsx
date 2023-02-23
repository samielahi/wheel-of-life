import { lazy } from "react";
import LoadingSpinner from "../core/LoadingSpinner";
import { Suspense } from "react";

const Scene = lazy(() => import("../components/Zoetrope/Scene"));

export default function Zoetrope() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Scene />
      </Suspense>
    </>
  );
}

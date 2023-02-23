import { lazy } from "react";
import { artificialDelay } from "../utils";
import LoadingSpinner from "../core/LoadingSpinner";
import { Suspense } from "react";

const Scene = lazy(() => artificialDelay(import("../components/Zoetrope/Scene")));

export default function Zoetrope() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Scene />
      </Suspense>
    </>
  );
}

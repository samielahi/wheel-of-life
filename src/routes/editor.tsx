import { lazy } from "react";
import { artificialDelay } from "../utils";
import LoadingSpinner from "../core/LoadingSpinner";
import { Suspense } from "react";

const AnimationEditor = lazy(() =>
  artificialDelay(import("../components/AnimationEditor/AnimationEditor"))
);

export default function Editor() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimationEditor />
      </Suspense>
    </>
  );
}

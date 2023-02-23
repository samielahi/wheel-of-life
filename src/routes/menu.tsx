import { lazy } from "react";
import { artificialDelay } from "../utils";
import LoadingSpinner from "../core/LoadingSpinner";
import { Suspense } from "react";

const AnimationMenu = lazy(() =>
  artificialDelay(import("../components/AnimationMenu/AnimationMenu"))
);

export default function Menu() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimationMenu />
      </Suspense>
    </>
  );
}

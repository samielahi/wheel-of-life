import { setFrame, setAnimation } from "../../state/idb";
import { useContext } from "react";
import { AnimationMenuDispatchContext } from "../../state/context";
import { Frame } from "../../types";
import Button from "../../core/Button";
import { v4 as uuid } from "uuid";
import { constants } from "../../utils";

export default function AddAnimation() {
  const dispatchMenuAction = useContext(AnimationMenuDispatchContext)!;

  function setupAnimation() {
    const animationId = uuid();
    const animation = {
      id: animationId,
      name: "Untitled",
      isBuilt: false,
      build: undefined,
      lastBuildTime: undefined,
    };
    for (let i = 0; i < constants.NUM_FRAMES; i++) {
      const frame: Frame = {
        id: i + 1,
        assetId: undefined,
        animationId: animationId,
      };
      setFrame(frame);
    }
    setAnimation(animation);

    dispatchMenuAction({
      type: "NEW_ANIMATION",
      animation: animation,
    });
  }

  return (
    <>
      <Button onClick={setupAnimation}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        create strip
      </Button>
    </>
  );
}

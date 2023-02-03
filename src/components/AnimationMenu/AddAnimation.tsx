import { setFrame, setAnimation } from "../../state/idb";
import { Frame } from "../../types";
import IconButton from "../../core/IconButton";
import { v4 as uuid } from "uuid";
import { constants } from "../../utils";

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
    setAnimation(animation);
  }
}

export default function AddAnimation() {
  return (
    <>
      <IconButton onClick={setupAnimation} tooltip="add">
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
      </IconButton>
    </>
  );
}

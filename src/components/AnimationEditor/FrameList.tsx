import { useContext } from "react";
import { AnimationContext } from "../../state/context";
import Frame from "./Frame";

// Renders a horizontally scrollable section of the current Frames in the animation
export default function FrameList() {
  const animation = useContext(AnimationContext);
  return (
    <>
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full w-max">
          {animation.frames?.map((frame, i) => (
            <Frame key={i} id={frame.id} assetId={frame.assetId} />
          ))}
        </div>
      </div>
    </>
  );
}

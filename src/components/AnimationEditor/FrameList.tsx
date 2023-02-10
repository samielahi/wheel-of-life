import { useContext } from "react";
import { AnimationEditorContext } from "../../state/context";
import Frame from "./Frame";

// Renders a horizontally scrollable section of the current Frames in the animation
export default function FrameList() {
  const animation = useContext(AnimationEditorContext);
  return (
    <>
      <div
        style={{ scrollbarColor: "#FFB565 whitesmoke" }}
        className="scrollbar h-max w-full overflow-x-auto bg-lightViolet p-4"
      >
        <div className="flex h-max w-max gap-6">
          {animation!.frames?.map((frame, i) => (
            <Frame key={i} id={frame.id} assetId={frame.assetId} />
          ))}
        </div>
      </div>
    </>
  );
}

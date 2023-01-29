import ImageFrame from "./Frame";
import { useContext } from "react";
import { AnimationContext } from "../../state/context";

export default function ImageFrameList() {
  const animation = useContext(AnimationContext);
  return (
    <>
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full w-max">
          {animation.frames?.map((frame, i) => (
            <ImageFrame key={i} id={frame.id} assetId={frame.assetId} />
          ))}
        </div>
      </div>
    </>
  );
}

import ImageFrame from "./ImageFrame";
import { useContext } from "react";
import { AnimationContext } from "../../../state/context";

export default function ImageFrameList() {
  const animation = useContext(AnimationContext);
  return (
    <>
      <div className="overflow-x-auto h-full overflow-y-hidden">
        <div className="w-max flex">
          {animation.frames?.map((frame, i) => (
            <ImageFrame key={i} id={frame.id} assetId={frame.assetId} />
          ))}
        </div>
      </div>
    </>
  );
}

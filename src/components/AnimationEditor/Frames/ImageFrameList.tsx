import ImageFrame from "./ImageFrame";
import { useContext } from "react";
import { AnimationContext } from "../../../state/context";

export default function ImageFrameList() {
  const animation = useContext(AnimationContext);
  return (
    <>
      <div className="w-full flex overflow-x-auto overflow-y-hidden flex-col border-smoke border-b-[3px]">
        <div className="w-max flex">
          {animation.frames?.map((frame, i) => (
            <ImageFrame key={i} id={frame.id} assetId={frame.assetId} />
          ))}
        </div>
      </div>
    </>
  );
}

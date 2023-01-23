import DropFrame from "./DropFrame";
import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../state/context";

export default function DropFrames() {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext(AnimationDispatchContext);
  return (
    <>
      <div className="w-full flex overflow-x-auto overflow-y-hidden flex-col border-smoke border-b-[3px]">
        <div className="w-max flex">
          {animation.frames?.map((frame, i) => (
            <DropFrame key={i} id={frame.id} data={frame.data} />
          ))}
        </div>
      </div>
    </>
  );
}

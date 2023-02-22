import { useContext, useMemo } from "react";
import { AnimationEditorContext, ToolsDispatchContext } from "../../../state/context";
import { constants } from "../../../utils";
import { buildStrip } from "./utils";
import Button from "../../../core/Button";

export default function Build(props: { isIdle?: boolean }) {
  const animation = useContext(AnimationEditorContext)!;
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;
  const numfilledFrames = animation.filledFrames?.size;
  const isBuildable = useMemo(
    () => numfilledFrames === constants.NUM_FRAMES,
    [animation.filledFrames]
  );

  function build() {
    dispatchToolsAction({
      type: "STATUS_CHANGE",
      newStatus: "building",
    });
    buildStrip(animation.id, animation.name!);
  }

  return (
    <>
      <Button onClick={build} disabled={!isBuildable}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isBuildable ? "#9B86F3" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
          <path d="M17.64 15 22 10.64"></path>
          <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
        </svg>
        <span style={isBuildable ? { color: "#9B86F3" } : {}}>
          {numfilledFrames} / 16
        </span>
      </Button>
    </>
  );
}

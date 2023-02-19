import { useContext } from "react";
import { AnimationEditorContext, ToolsContext } from "../../state/context";
import { ToolsStatus } from "../../types";

function determineStatusMessage(
  status: ToolsStatus,
  numSelectedElements: number,
  numFilledFrames: number
) {
  switch (status) {
    case "selecting":
      if (numSelectedElements) {
        return `Click a frame to assign with selected image(s). ${numFilledFrames}/16 frames filled`;
      } else {
        return "Click an image below to select it.";
      }

    default:
      return "";
  }
}

export default function StatusMessage() {
  const animation = useContext(AnimationEditorContext)!;
  const tools = useContext(ToolsContext)!;
  const numSelectedElements = animation.selectedAssets?.length!;
  const numFilledFrames = animation.filledFrames?.size!;
  const status = tools.status!;
  const message = determineStatusMessage(status, numSelectedElements, numFilledFrames);

  return (
    <>
      <div className="hidden rounded bg-smoke italic md:block">
        {message !== "" ? <p className="px-4 py-2">{message}</p> : null}
      </div>
    </>
  );
}

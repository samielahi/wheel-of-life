import { useContext } from "react";
import { AnimationEditorContext, ToolsContext } from "../../state/context";
import { ToolsStatus } from "../../types";

function determineStatusMessage(status: ToolsStatus, numSelectedElements: number) {
  switch (status) {
    case "selecting":
      if (numSelectedElements) {
        return `Click a frame to assign/replace with selected image(s).`;
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
  const status = tools.status!;
  const message = determineStatusMessage(status, numSelectedElements);

  return (
    <>
      <div className="hidden rounded bg-smoke md:block">
        {message !== "" ? <p className="px-4 py-2">{message}</p> : null}
      </div>
    </>
  );
}

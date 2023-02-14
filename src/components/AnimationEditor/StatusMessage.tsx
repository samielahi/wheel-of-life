import { useContext } from "react";
import { AnimationEditorContext, ToolbarContext } from "../../state/context";
import { ToolbarStatus } from "../../types";

function determineStatusMessage(status: ToolbarStatus, numSelectedElements: number) {
  switch (status) {
    case "selecting":
      if (numSelectedElements) {
        return `${numSelectedElements} images selected: click a frame to assign/replace with selected images.`;
      } else {
        return "Selecting : click an image below to select it.";
      }

    default:
      return "";
  }
}

export default function StatusMessage() {
  const animation = useContext(AnimationEditorContext)!;
  const toolbar = useContext(ToolbarContext)!;
  const numSelectedElements = animation.selectedAssets?.length!;
  const status = toolbar.status!;
  const message = determineStatusMessage(status, numSelectedElements);

  return (
    <>
      <div className="hidden rounded bg-smoke md:block">
        {message !== "" ? <p className="px-4 py-2">{message}</p> : null}
      </div>
    </>
  );
}

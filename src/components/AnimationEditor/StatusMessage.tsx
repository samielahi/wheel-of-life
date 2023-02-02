import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";
import { ToolbarStatus } from "../../types";

function determineStatusMessage(status: ToolbarStatus, numSelectedElements: number) {
  switch (status) {
    case "selecting":
      if (numSelectedElements) {
        return "Click on a frame to assign/replace with selected image.";
      } else {
        return "Click an image below to select it.";
      }

    default:
      return "";
  }
}

export default function StatusMessage() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  const numSelectedElements = animation.selectedAssets?.length!;
  const status = toolbar.status!;
  const message = determineStatusMessage(status, numSelectedElements);

  return (
    <>
      <div className="hidden rounded  md:block">
        {message !== "" ? <p className="italic px-4 py-2">{message}</p> : null}
      </div>
    </>
  );
}

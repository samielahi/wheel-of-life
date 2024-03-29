import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import Button from "../../../core/Button";

interface ClearFramesProps {
  isIdle?: boolean;
  hasFilledFrames?: boolean;
}

export default function ClearFrames(props: ClearFramesProps) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function toggleClearFramesDialog() {
    if (props.isIdle) {
      dispatchToolsAction({
        type: "STATUS_CHANGE",
        newStatus: "clearing",
      });
    }
  }

  return (
    <>
      <Button
        onClick={toggleClearFramesDialog}
        disabled={!props.hasFilledFrames || !props.isIdle}
      >
        <span className="hidden 2xl:block">clear frames</span>
        <span className="block 2xl:hidden ">clear</span>
      </Button>
    </>
  );
}

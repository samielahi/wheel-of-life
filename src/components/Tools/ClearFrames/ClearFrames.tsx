import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import Button from "../../../core/Button";

interface ClearFramesProps {
  isIdle?: boolean;
  hasFilledFrames?: boolean;
}

export default function ClearFrames(props: ClearFramesProps) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function clearFrames() {
    if (props.isIdle) {
      dispatchToolsAction({
        type: "STATUS_CHANGE",
        newStatus: "clearing",
      });
    }
  }

  return (
    <>
      <Button onClick={clearFrames} disabled={!props.hasFilledFrames || !props.isIdle}>
        <span>clear frames</span>
      </Button>
    </>
  );
}

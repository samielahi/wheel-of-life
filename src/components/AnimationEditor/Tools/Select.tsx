import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarDispatchContext,
} from "../../../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../../../types";
import Button from "../../../core/Button";

export default function Select(props: {
  isIdle: boolean;
  isSelecting: boolean;
  hasAssets: boolean;
}) {
  const dispatchAnimationAction = useContext<AnimationDispatch>(AnimationDispatchContext);
  const dispatchToolbarAction = useContext<ToolbarDispatch>(ToolbarDispatchContext);

  function toggleSelection() {
    if (props.isIdle && props.hasAssets) {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "selecting",
      });
    } else {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "idle",
      });

      dispatchAnimationAction({
        type: "DESELECT_ALL",
      });
    }
  }

  return (
    <>
      <Button onClick={toggleSelection} disabled={props.hasAssets ? false : true}>
        {props.isSelecting && props.hasAssets ? (
          <span className="text-red">cancel</span>
        ) : (
          <span>select images</span>
        )}
      </Button>
    </>
  );
}

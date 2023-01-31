import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../../../state/context";
import { ToolbarDispatch } from "../../../../types";
import Button from "../../../../core/Button";

export default function AutoAssign(props: { isIdle: boolean; hasAssets: boolean }) {
  const dispatchToolbarAction = useContext<ToolbarDispatch>(ToolbarDispatchContext);

  function startAutoAssign() {
    if (props.isIdle && props.hasAssets) {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "auto-assigning",
      });
    }
  }

  return (
    <>
      <Button onClick={startAutoAssign} disabled={props.hasAssets ? false : true}>
        auto assign
      </Button>
    </>
  );
}

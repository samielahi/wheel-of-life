import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import Button from "../../../core/Button";

export default function AutoAssign(props: { isIdle: boolean; hasAssets: boolean }) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function toggleAutoAssignDialog() {
    if (props.isIdle && props.hasAssets) {
      dispatchToolsAction({
        type: "STATUS_CHANGE",
        newStatus: "auto-assigning",
      });
    }
  }

  return (
    <>
      <Button
        onClick={toggleAutoAssignDialog}
        disabled={!props.hasAssets || !props.isIdle ? true : false}
      >
        <span className="sm:hidden">auto</span>
        <span className="hidden sm:block">auto assign</span>
      </Button>
    </>
  );
}

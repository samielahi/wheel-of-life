import { useContext } from "react";
import { ToolbarDispatchContext } from "../../../../state/context";
import Button from "../../../../core/Button";

export default function AutoAssign(props: { isIdle: boolean; hasAssets: boolean }) {
  const dispatchToolbarAction = useContext(ToolbarDispatchContext)!;

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
      <Button
        onClick={startAutoAssign}
        disabled={!props.hasAssets || !props.isIdle ? true : false}
      >
        <span className="sm:hidden">auto</span>
        <span className="hidden sm:block">auto assign</span>
      </Button>
    </>
  );
}

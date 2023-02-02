import { useContext, memo } from "react";
import { AnimationDispatchContext, ToolbarDispatchContext } from "../../../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../../../types";
import IconButton from "../../../core/IconButton";

function Select(props: { isIdle: boolean; isSelecting: boolean; hasAssets: boolean }) {
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
      <IconButton
        onClick={toggleSelection}
        disabled={props.hasAssets ? false : true}
        tooltip={!props.isIdle && props.hasAssets ? "cancel" : "select"}
      >
        {!props.isIdle && props.hasAssets ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff3d00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
            <path d="m12 12 4 10 1.7-4.3L22 16Z"></path>
          </svg>
        )}
      </IconButton>
    </>
  );
}

export default memo(Select);

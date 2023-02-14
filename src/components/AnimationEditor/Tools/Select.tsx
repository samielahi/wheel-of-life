import { useContext, memo } from "react";
import {
  AnimationEditorDispatchContext,
  ToolbarDispatchContext,
} from "../../../state/context";
import IconButton from "../../../core/IconButton";

interface SelectProps {
  isSelecting: boolean;
  hasAssets: boolean;
}

function Select(props: SelectProps) {
  const dispatchAnimationAction = useContext(AnimationEditorDispatchContext)!;
  const dispatchToolbarAction = useContext(ToolbarDispatchContext)!;

  function toggleSelection() {
    if (!props.isSelecting && props.hasAssets) {
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
        disabled={!props.hasAssets}
        tooltip={props.isSelecting && props.hasAssets ? "cancel" : "select"}
      >
        {props.isSelecting && props.hasAssets ? (
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

import { useContext, memo } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import IconButton from "../../../core/IconButton";

function Delete(props: { isSelecting: boolean; hasSelectedAssets: boolean }) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function startDeletion() {
    if (props.isSelecting) {
      dispatchToolsAction({
        type: "STATUS_CHANGE",
        newStatus: "deleting",
      });
    }
  }

  return (
    <>
      <IconButton
        onClick={startDeletion}
        disabled={!props.hasSelectedAssets}
        tooltip="delete"
      >
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
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </IconButton>
    </>
  );
}

export default memo(Delete);

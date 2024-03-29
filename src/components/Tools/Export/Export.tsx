import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import IconButton from "../../../core/IconButton";

export default function Export(props: { isIdle?: boolean; isBuilt?: boolean }) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function toggleEsportDialog() {
    if (props.isIdle) {
      dispatchToolsAction({
        type: "STATUS_CHANGE",
        newStatus: "exporting",
      });
    }
  }

  return (
    <>
      <IconButton
        tooltip="export"
        onClick={toggleEsportDialog}
        // Disable if not idle and props not built
        disabled={!props.isIdle || !props.isBuilt}
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </IconButton>
    </>
  );
}

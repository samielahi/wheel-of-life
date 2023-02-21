import { useContext, useEffect } from "react";
import { ToolsDispatchContext, ToolsContext } from "../../../state/context";
import IconButton from "../../../core/IconButton";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function Help() {
  const tools = useContext(ToolsContext)!;
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;
  const [showDialog, setShowDialog] = useLocalStorage("showHelpDialog", true);
  const isIdle = tools.status === "idle";

  function toggleHelpDialog() {
    dispatchToolsAction({
      type: "STATUS_CHANGE",
      newStatus: "getting-help",
    });
  }

  useEffect(() => {
    if (showDialog) {
      toggleHelpDialog();
    }
  }, []);

  return (
    <>
      <IconButton tooltip="help" onClick={toggleHelpDialog} disabled={!isIdle}>
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
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </IconButton>
    </>
  );
}

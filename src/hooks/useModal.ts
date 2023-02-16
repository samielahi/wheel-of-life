import { useContext, useEffect } from "react";
import {
  AnimationEditorDispatchContext,
  ToolsContext,
  ToolsDispatchContext,
} from "../state/context";
import { ToolsStatus } from "../types";

export default function useModal(status: ToolsStatus) {
  const tools = useContext(ToolsContext);
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;
  const dispatchToolbarAction = useContext(ToolsDispatchContext)!;
  const isStatus = tools?.status === status;

  function closeModal() {
    if (status === "deleting") {
      dispatchEditorAction({
        type: "DESELECT_ALL",
      });
    }

    dispatchToolbarAction({
      type: "STATUS_CHANGE",
      newStatus: "idle",
    });
  }

  return [isStatus, closeModal];
}

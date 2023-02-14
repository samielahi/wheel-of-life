import { useContext } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../state/context";
import { ToolbarStatus } from "../types";

export default function useModal(status: ToolbarStatus) {
  const toolbar = useContext(ToolbarContext);
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;
  const dispatchToolbarAction = useContext(ToolbarDispatchContext)!;
  const isStatus = toolbar?.status === status;

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

import { useContext } from "react";
import {
  ToolbarContext,
  ToolbarDispatchContext,
  AnimationEditorDispatchContext,
} from "../../../../state/context";
import Modal from "../../../../core/Modal";
import Button from "../../../../core/Button";

export default function ClearFramesDialog() {
  const toolbar = useContext(ToolbarContext)!;
  const dispatchToolbarAction = useContext(ToolbarDispatchContext)!;
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;

  const isClearing = toolbar?.status === "clearing";

  function closeDialog() {
    dispatchToolbarAction({
      type: "STATUS_CHANGE",
      newStatus: "idle",
    });
  }

  function clearFrames() {
    dispatchEditorAction({
      type: "DEASSIGN_ALL",
    });

    dispatchToolbarAction({
      type: "STATUS_CHANGE",
      newStatus: "idle",
    });
  }

  return (
    <>
      {isClearing ? (
        <Modal closeModal={closeDialog}>
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h3 className="text-xl">Clear All Frames?</h3>
            <div className="flex gap-4">
              <Button onClick={clearFrames}>confirm</Button>
              <Button onClick={closeDialog}>cancel</Button>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

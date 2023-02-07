import { useContext } from "react";
import {
  AnimationEditorDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../../../state/context";
import Modal from "../../../../core/Modal";
import Button from "../../../../core/Button";

export default function AutoAssignDialog() {
  const toolbar = useContext(ToolbarContext)!;
  const dispatchToolbarAction = useContext(ToolbarDispatchContext)!;
  const dispatchAnimationAction = useContext(AnimationEditorDispatchContext)!;
  const isAssigning = toolbar.status === "auto-assigning";

  function closeDeleteDialog() {
    if (isAssigning) {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "idle",
      });
    }
  }

  function autoAssign() {
    if (isAssigning) {
      dispatchAnimationAction({
        type: "AUTO_ASSIGN",
      });

      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "idle",
      });
    }
  }

  return (
    <>
      {isAssigning ? (
        <Modal closeModal={closeDeleteDialog}>
          <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
            <span className="text-2xl">Auto assign images to frames?</span>
            <span className="italic">
              Images assigned until all frames are filled (in alphanumerical order by file
              name) and will replace images that are currently assigned.
            </span>
            <div className="flex gap-4">
              <Button onClick={autoAssign}>confirm</Button>
              <Button onClick={closeDeleteDialog}>cancel</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

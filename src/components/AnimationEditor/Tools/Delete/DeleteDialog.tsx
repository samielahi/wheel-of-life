import { useContext } from "react";
import {
  AnimationEditorDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../../../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../../../../types";
import Button from "../../../../core/Button";
import Modal from "../../../../core/Modal";

export default function DeleteDialog() {
  const toolbar = useContext(ToolbarContext);
  const dispatchToolbarAction = useContext<ToolbarDispatch>(ToolbarDispatchContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationEditorDispatchContext
  );
  const isDeleting = toolbar.status === "deleting";

  function closeDeleteDialog() {
    if (isDeleting) {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "selecting",
      });
    }
  }

  function deleteSelectedAssets() {
    if (isDeleting) {
      dispatchAnimationAction({
        type: "DELETE_ASSETS",
      });

      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "idle",
      });
    }
  }

  return (
    <>
      {isDeleting ? (
        <Modal closeModal={closeDeleteDialog}>
          <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
            <span className="text-2xl">Delete selected images?</span>
            <span className="italic">
              This will also remove the images from any assigned frames.
            </span>
            <div className="flex gap-4">
              <Button onClick={deleteSelectedAssets}>confirm</Button>
              <Button onClick={closeDeleteDialog}>cancel</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

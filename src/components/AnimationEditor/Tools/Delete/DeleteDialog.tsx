import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../../../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../../../../types";
import Modal from "../../../../core/Modal";
import Button from "../../../../core/Button";

export default function DeleteDialog() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  const dispatchToolbarAction = useContext<ToolbarDispatch>(ToolbarDispatchContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(AnimationDispatchContext);
  const isDeleting = toolbar.status === "deleting";

  function closeDeleteDialog() {
    console.log(toolbar.status!);
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
    }
  }

  // If there are no more assets left after deletion, end selection session
  const hasNoAssets = Object.values(animation.assets!).length === 0;

  if (hasNoAssets) {
    dispatchToolbarAction({
      type: "STATUS_CHANGE",
      newStatus: "idle",
    });
  }

  return (
    <>
      {isDeleting ? (
        <Modal closeModal={closeDeleteDialog}>
          <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
            <h3>Delete selected images?</h3>
            <div className="flex gap-4">
              <Button onClick={deleteSelectedAssets}>yes</Button>
              <Button onClick={closeDeleteDialog}>cancel</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

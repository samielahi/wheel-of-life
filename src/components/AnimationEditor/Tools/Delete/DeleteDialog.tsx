import { useContext } from "react";
import { AnimationEditorDispatchContext } from "../../../../state/context";
import Button from "../../../../core/Button";
import Modal from "../../../../core/Modal";
import useModal from "../../../../hooks/useModal";

export default function DeleteDialog() {
  const [isStatus, closeModal] = useModal("deleting");
  const dispatchAnimationAction = useContext(AnimationEditorDispatchContext)!;

  function deleteSelectedAssets() {
    if (isStatus) {
      dispatchAnimationAction({
        type: "DELETE_ASSETS",
      });
    }
    (closeModal as () => void)();
  }

  return (
    <>
      <Modal status="deleting">
        <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
          <span className="text-2xl">Delete selected images?</span>
          <span className="italic">
            This will also remove the images from any assigned frames.
          </span>
          <div className="flex gap-4">
            <Button onClick={deleteSelectedAssets}>confirm</Button>
            <Button onClick={closeModal as () => void}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

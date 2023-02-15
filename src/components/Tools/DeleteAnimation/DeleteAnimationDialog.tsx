import { useContext } from "react";
import { AnimationMenuDispatchContext, ToolsContext } from "../../../state/context";
import useModal from "../../../hooks/useModal";
import Modal from "../../../core/Modal";
import Button from "../../../core/Button";

export default function DeleteAnimationDialog() {
  const [isStatus, closeModal] = useModal("deletingAnimation");
  const tools = useContext(ToolsContext)!;
  const deleteTargetId = tools.animationId!;
  const dispatchMenuAction = useContext(AnimationMenuDispatchContext)!;

  function deleteAnimation() {
    if (isStatus) {
      dispatchMenuAction({
        type: "DELETE_ANIMATION",
        animationId: deleteTargetId,
      });
    }

    (closeModal as () => void)();
  }

  return (
    <>
      <Modal status="deletingAnimation">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h3>Delete Animation?</h3>
          <span className="italic">
            Note: this will delete all uploaded images and is irreversible.
          </span>
          <div className="flex gap-4">
            <Button onClick={deleteAnimation}>confirm</Button>
            <Button onClick={closeModal as () => void}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

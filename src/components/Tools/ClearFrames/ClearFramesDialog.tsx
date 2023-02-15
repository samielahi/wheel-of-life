import { useContext } from "react";
import { AnimationEditorDispatchContext } from "../../../state/context";
import Modal from "../../../core/Modal";
import Button from "../../../core/Button";
import useModal from "../../../hooks/useModal";

export default function ClearFramesDialog() {
  const [isStatus, closeModal] = useModal("clearing");
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;

  function clearFrames() {
    if (isStatus) {
      dispatchEditorAction({
        type: "DEASSIGN_ALL",
      });
    }

    (closeModal as () => void)();
  }

  return (
    <>
      <Modal status="clearing">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h3 className="text-xl">Clear All Frames?</h3>
          <div className="flex gap-4">
            <Button onClick={clearFrames}>confirm</Button>
            <Button onClick={closeModal as () => void}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

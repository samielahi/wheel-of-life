import { useContext } from "react";
import { AnimationEditorContext } from "../../../state/context";
import { getAnimation } from "../../../state/idb";
import Modal from "../../../core/Modal";
import Button from "../../../core/Button";
import { fileSave } from "browser-fs-access";
import useModal from "../../../hooks/useModal";

export default function ExportDialog() {
  const [isStatus, closeModal] = useModal("exporting");
  const animation = useContext(AnimationEditorContext)!;
  const animationId = animation.id!;
  const animationName = animation.name!;

  async function exportStrip(format: "png" | "jpg") {
    const animation = await getAnimation(animationId);
    const strip = animation?.build!;

    await fileSave(strip, {
      fileName: animationName,
      extensions: [`.${format}`],
    });
  }

  return (
    <>
      <Modal status="exporting">
        <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
          <h3 className="text-2xl text-orange">Export your strip as a:</h3>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                exportStrip("jpg");
                (closeModal as () => void)();
              }}
            >
              jpg
            </Button>
            <Button
              onClick={() => {
                exportStrip("png");
                (closeModal as () => void)();
              }}
            >
              png
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

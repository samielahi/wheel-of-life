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
import { getAnimation } from "../../../../state/idb";
import { fileSave } from "browser-fs-access";

export default function ExportDialog() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  const dispatchToolbarAction = useContext<ToolbarDispatch>(ToolbarDispatchContext);
  const isExporting = toolbar.status === "exporting";
  const animationId = animation.id!;
  const animationName = animation.name!;

  function closeExportDialog() {
    if (isExporting) {
      dispatchToolbarAction({
        type: "STATUS_CHANGE",
        newStatus: "idle",
      });
    }
  }

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
      {isExporting ? (
        <Modal closeModal={closeExportDialog}>
          <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
            <span className="text-2xl">Export your strip as a:</span>
            <div className="flex gap-4">
              <Button onClick={() => exportStrip("jpg")}>jpg</Button>
              <Button onClick={() => exportStrip("png")}>png</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

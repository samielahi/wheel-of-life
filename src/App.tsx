import { Frame } from "./types";
import Button from "./core/Button";
import { Suspense } from "react";
import { setFrame, setAnimation } from "./state/idb";
import Modal from "./core/Modal";
import AnimationEditor from "./components/AnimationEditor/AnimationEditor";

export default function App() {
  function setupAnimation() {
    // Setup the animation store
    const animation = {
      id: "test",
      name: "test",
      isBuilt: false,
      build: undefined,
    };
    setAnimation(animation);
    // Setup the frame store
    for (let i = 0; i < 16; i++) {
      const frame: Frame = {
        id: i + 1,
        assetId: undefined,
        animationId: "test",
      };

      setFrame(frame);
    }
  }

  return (
    <>
      {/* <Modal>
        <div className="flex justify-center p-4">
          <h3>Export</h3>
        </div>
      </Modal> */}
      <AnimationEditor animationId="test" name="test" />
      {/* <Button onClick={setupAnimation}>make</Button> */}
    </>
  );
}

import { Animation, ToolbarType, Frame } from "./types";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "./state/context";
import { useImmerReducer } from "use-immer";
import { AnimationReducer, ToolbarReducer } from "./state/reducers";
import Header from "./core/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import AssetLibrary from "./components/AssetLibrary/AssetLibrary";
import ImageFrameList from "./components/Frames/ImageFrameList";
import Button from "./core/Button";
import { initialAnimationState } from "./state/context";
import { getFrame, setFrame, getAllFrames, deleteFrames } from "./state/idb/db";

export default function App() {
  const [animation, dispatchAnimationAction] = useImmerReducer<Animation, any>(
    AnimationReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer<ToolbarType, any>(
    ToolbarReducer,
    { currentTool: "base", status: "idle" }
  );

  function setFrames() {
    for (let i = 0; i < 16; i++) {
      const frame: Frame = {
        id: i + 1,
        data: undefined,
        animationId: "test",
      };

      setFrame(frame);
    }
  }

  function getFrames() {
    const frames = getAllFrames("test");
    frames.then((res) => {
      console.log(res);
    });
  }

  return (
    <>
      <ToolbarContext.Provider value={toolbar}>
        <ToolbarDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationContext.Provider value={animation}>
            <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
              {/* <Header />
              <ImageFrameList />
              <Toolbar />
              <AssetLibrary /> */}
              <div className="wrapper flex items-start flex-col gap-8">
                <h3>IDB Functions Test</h3>
                <Button onClick={setFrames}>set frames</Button>
                <Button onClick={getFrames}>get all frames</Button>
                <Button onClick={() => deleteFrames("test")}>
                  delete frames
                </Button>
                {/* <Button>get asset</Button>
                <Button>set asset</Button>
                <Button>get all assets</Button>
                <Button>delete asset</Button>
                <Button>get asset</Button> */}
              </div>
            </AnimationDispatchContext.Provider>
          </AnimationContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

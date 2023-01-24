import { Animation, ToolbarType } from "./types";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "./state/context";
import { useImmerReducer } from "use-immer";
import { AnimationReducer, ToolbarReducer } from "./state/reducers";
import Header from "./core/Header";
import Toolbar from "./components/Toolbar";
import AssetLibrary from "./components/AssetLibrary/AssetLibrary";
import DropFrames from "./components/Frames/ImageFrameList";
import { initialAnimationState } from "./state/context";

export default function App() {
  const [animation, dispatchAnimationAction] = useImmerReducer<Animation, any>(
    AnimationReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer<ToolbarType, any>(
    ToolbarReducer,
    { currentTool: "base", status: "idle" }
  );

  return (
    <>
      <ToolbarContext.Provider value={toolbar}>
        <ToolbarDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationContext.Provider value={animation}>
            <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
              <div className="w-full">
                <Header></Header>
                <DropFrames></DropFrames>
                <Toolbar />
                <AssetLibrary />
              </div>
            </AnimationDispatchContext.Provider>
          </AnimationContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

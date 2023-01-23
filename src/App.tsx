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
import Library from "./components/Library/Library";
import DropFrames from "./components/DropFrame/DropFrames";
import { initialAnimationState } from "./state/context";

export default function App() {
  const [animation, dispatchAnimationAction] = useImmerReducer<Animation, any>(
    AnimationReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer<ToolbarType, any>(
    ToolbarReducer,
    { currentTool: "select", status: "idle" }
  );

  return (
    <>
      <ToolbarContext.Provider value={toolbar}>
        <ToolbarDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationContext.Provider value={animation}>
            <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
              <div className="w-full overflow-auto">
                <Header></Header>
                <DropFrames></DropFrames>
                <Toolbar />
                <Library />
              </div>
            </AnimationDispatchContext.Provider>
          </AnimationContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

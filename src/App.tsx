import { Animation } from "./types";
import { AnimationContext, AnimationDispatchContext } from "./state/context";
import { useImmerReducer } from "use-immer";
import AnimationReducer from "./state/reducers";
import Header from "./core/Header";
import Toolbar from "./components/Toolbar";
import AssetLibrary from "./components/AssetLibrary/AssetLibrary";

export default function App() {
  const [animation, dispatchAnimationAction] = useImmerReducer<Animation, any>(
    AnimationReducer,
    { id: "test", type: "image" }
  );

  return (
    <>
      <AnimationContext.Provider value={animation}>
        <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
          <div className="h-full w-full">
            <Header></Header>
            <Toolbar />
            <AssetLibrary />
          </div>
        </AnimationDispatchContext.Provider>
      </AnimationContext.Provider>
    </>
  );
}

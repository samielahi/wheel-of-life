import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AnimationMenuReducer, ToolsReducer } from "../../state/reducers";
import {
  AnimationMenuContext,
  AnimationMenuDispatchContext,
  ToolsContext,
  ToolsDispatchContext,
  initialToolsState,
} from "../../state/context";
import { getAllAnimations, getAllAssets } from "../../state/idb";
import { AnimationStateDB } from "../../types";
import Header from "../../core/Header";
import AddAnimation from "./AddAnimation";
import AnimationCards from "./AnimationCards";
import DeleteAnimationDialog from "../Tools/DeleteAnimation/DeleteAnimationDialog";
import HelpDialog from "../Tools/Help/HelpDialog";

function AnimationMenu() {
  const [tools, dispatchToolsAction] = useImmerReducer(ToolsReducer!, initialToolsState);
  const [animationMenu, dispatchAnimationMenuAction] = useImmerReducer(
    AnimationMenuReducer!,
    [] as AnimationStateDB[]
  );

  useEffect(() => {
    async function loadAnimations() {
      const animations = await getAllAnimations();

      // Resolve thumbnails
      for (let i = 0; i < animations.length; i++) {
        if (!animations[i].thumbnail) {
          const assets = await getAllAssets(animations[i].id);

          if (assets.length !== 0) {
            animations[i].thumbnail = assets[0].data;
            dispatchAnimationMenuAction({
              type: "SET_THUMBNAIL",
              animationId: animations[i].id,
              image: assets[0].data,
            });
          }
        }
      }

      dispatchAnimationMenuAction({
        type: "REHYDRATE",
        animations: animations,
      });
    }

    loadAnimations();
  }, []);

  return (
    <>
      <AnimationMenuContext.Provider value={animationMenu!}>
        <AnimationMenuDispatchContext.Provider value={dispatchAnimationMenuAction}>
          <ToolsContext.Provider value={tools}>
            <ToolsDispatchContext.Provider value={dispatchToolsAction}>
              <Header type="menu">
                <AddAnimation />
              </Header>
              <AnimationCards />
              <DeleteAnimationDialog />
              <HelpDialog />
            </ToolsDispatchContext.Provider>
          </ToolsContext.Provider>
        </AnimationMenuDispatchContext.Provider>
      </AnimationMenuContext.Provider>
    </>
  );
}

export default AnimationMenu;

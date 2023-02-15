import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AnimationMenuReducer } from "../../state/reducers";
import { AnimationMenuContext, AnimationMenuDispatchContext } from "../../state/context";
import { getAllAnimations, getAllAssets } from "../../state/idb";
import { AnimationStateDB } from "../../types";
import Header from "../../core/Header";
import AddAnimation from "./AddAnimation";
import AnimationCards from "./AnimationCards";

function AnimationMenu() {
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
          animations[i].thumbnail = assets[0].data;
          dispatchAnimationMenuAction({
            type: "SET_THUMBNAIL",
            animationId: animations[i].id,
            image: assets[0].data,
          });
        }
        continue;
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
          <Header type="menu">
            <AddAnimation />
          </Header>
          <AnimationCards />
        </AnimationMenuDispatchContext.Provider>
      </AnimationMenuContext.Provider>
    </>
  );
}

export default AnimationMenu;

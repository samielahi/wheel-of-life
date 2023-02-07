import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AnimationMenuReducer } from "../../state/reducers";
import { AnimationMenuContext, AnimationMenuDispatchContext } from "../../state/context";
import { getAllAnimations } from "../../state/idb";
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

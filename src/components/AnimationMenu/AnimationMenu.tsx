import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import Header from "../../core/Header";
import AnimationCards from "./AnimationCards";
import AddAnimation from "./AddAnimation";
import { AnimationMenuReducer } from "../../state/reducers";
import { AnimationMenuContext, AnimationMenuDispatchContext } from "../../state/context";
import { getAllAnimations } from "../../state/idb";

export default function AnimationMenu() {
  const [animationMenu, dispatchAnimationMenuAction] = useImmerReducer(
    // @ts-ignore
    AnimationMenuReducer!,
    []
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

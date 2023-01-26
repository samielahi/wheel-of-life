import { useImmerReducer } from "use-immer";
import { useEffect } from "react";
import { AnimationReducer, ToolbarReducer } from "../../state/reducers";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../state/context";
import { Animation, ToolbarType, Asset, Frame } from "../../types";
import Header from "../../core/Header";
import Toolbar from "./Toolbar/Toolbar";
import AssetLibrary from "./AssetLibrary/AssetLibrary";
import ImageFrameList from "./Frames/ImageFrameList";
import { getAllAssets, getAllFrames } from "../../state/idb";

export default function AnimationEditor(props: {
  animationId: string;
  name: string;
}) {
  const toolbarState: ToolbarType = { currentTool: "base", status: "idle" };
  let initialAnimationState: Animation = {
    id: props.animationId,
    name: props.name,
    type: "image",
    assets: {},
    frames: [],
    selectedAssets: [],
  };

  const [animation, dispatchAnimationAction] = useImmerReducer(
    AnimationReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer(
    ToolbarReducer,
    toolbarState
  );

  useEffect(() => {
    async function loadDataFromIdb() {
      const loadedAnimationState = { ...initialAnimationState };
      const assetList = await getAllAssets(props.animationId);
      const frames = await getAllFrames(props.animationId);
      const assets: Record<string, Asset> = {};

      assetList.forEach((asset) => {
        assets[asset.id] = asset;
      });

      loadedAnimationState.assets = assets;
      loadedAnimationState.frames = frames;

      dispatchAnimationAction({
        type: "rehydrate",
        animationState: loadedAnimationState,
      });
    }

    loadDataFromIdb();
  }, []);

  return (
    <>
      <ToolbarContext.Provider value={toolbar}>
        <ToolbarDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationContext.Provider value={animation}>
            <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
              <Header />
              <ImageFrameList />
              <Toolbar />
              <AssetLibrary />
            </AnimationDispatchContext.Provider>
          </AnimationContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

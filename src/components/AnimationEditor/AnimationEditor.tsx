import { useImmerReducer } from "use-immer";
import { useEffect } from "react";
import { AnimationReducer, ToolbarReducer } from "../../state/reducers";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../state/context";
import { AnimationState, ToolbarState, Asset, Frame } from "../../types";
import Header from "../../core/Header";
import Toolbar from "./Toolbar";
import AssetList from "./AssetList";
import FrameList from "./FrameList";
import DeleteDialog from "./Tools/Delete/DeleteDialog";
import ExportDialog from "./Tools/Export/ExportDialog";
import { getAllAssets, getAllFrames } from "../../state/idb";

export default function AnimationEditor(props: { animationId: string; name: string }) {
  const toolbarState: ToolbarState = { currentTool: "base", status: "idle" };
  let initialAnimationState: AnimationState = {
    id: props.animationId,
    name: props.name,
    assets: {},
    frames: [],
    selectedAssets: [],
    filledFrames: new Set<number>(),
    isBuilt: false,
  };

  const [animation, dispatchAnimationAction] = useImmerReducer(
    AnimationReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer(ToolbarReducer, toolbarState);

  useEffect(() => {
    async function loadAnimationFromIdb() {
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
        type: "REHYDRATE",
        animation: loadedAnimationState,
      });
    }

    loadAnimationFromIdb();
  }, []);

  return (
    <>
      <ToolbarContext.Provider value={toolbar}>
        <ToolbarDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationContext.Provider value={animation}>
            <AnimationDispatchContext.Provider value={dispatchAnimationAction}>
              <Header />
              <FrameList />
              <Toolbar />
              <AssetList />
              <ExportDialog />
              <DeleteDialog />
            </AnimationDispatchContext.Provider>
          </AnimationContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

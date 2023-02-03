import { useImmerReducer } from "use-immer";
import { useEffect } from "react";
import { AnimationEditorReducer, ToolbarReducer } from "../../state/reducers";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../state/context";
import { AnimationState, ToolbarState, Asset } from "../../types";
import Header from "../../core/Header";
import Toolbar from "./Toolbar";
import AssetList from "./AssetList";
import FrameList from "./FrameList";
import DeleteDialog from "./Tools/Delete/DeleteDialog";
import ExportDialog from "./Tools/Export/ExportDialog";
import AutoAssignDialog from "./Tools/AutoAssign/AutoAssignDialog";
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
    AnimationEditorReducer,
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
          <AnimationEditorContext.Provider value={animation}>
            <AnimationEditorDispatchContext.Provider value={dispatchAnimationAction}>
              <Header type="editor" />
              <FrameList />
              <Toolbar />
              <AssetList />
              <ExportDialog />
              <DeleteDialog />
              <AutoAssignDialog />
            </AnimationEditorDispatchContext.Provider>
          </AnimationEditorContext.Provider>
        </ToolbarDispatchContext.Provider>
      </ToolbarContext.Provider>
    </>
  );
}

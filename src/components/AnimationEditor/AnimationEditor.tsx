import { useImmerReducer } from "use-immer";
import { useEffect, useContext } from "react";
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
import { AnimationMenuDispatchContext } from "../../state/context";
import Button from "../../core/Button";

export default function AnimationEditor(props: { animationId: string; name: string }) {
  const dispatchMenuAction = useContext(AnimationMenuDispatchContext);
  const toolbarState: ToolbarState = { currentTool: "base", status: "idle" };
  // Replace with imported initialAnimationState from context and Object.assign with props
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
    // Async actions not allowed so we load in idb data and rehydrate as a side effect
    async function loadAnimationFromIdb() {
      const loadedAnimationState = { ...initialAnimationState };
      const assetList = await getAllAssets(props.animationId);
      console.log(assetList);
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
              <Header type="editor">
                <Button onClick={() => dispatchMenuAction({ type: "CLOSE_ANIMATION" })}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span className="hidden md:block">all strips</span>
                </Button>
              </Header>
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

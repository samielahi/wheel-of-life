import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { useParams, useLocation } from "react-router";
import { AnimationEditorReducer, ToolsReducer } from "../../state/reducers";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolsContext,
  ToolsDispatchContext,
} from "../../state/context";
import { initialToolsState } from "../../state/context";
import { AnimationState, ToolsState, Asset } from "../../types";
import Header from "../../core/Header";
import Toolbar from "./Toolbar";
import AssetList from "./AssetList";
import FrameList from "./FrameList";
import { getAllAssets, getAllFrames, getAnimation } from "../../state/idb";
import AutoAssignDialog from "../Tools/AutoAssign/AutoAssignDialog";
import DeleteDialog from "../Tools/DeleteImage/DeleteImageDialog";
import ExportDialog from "../Tools/Export/ExportDialog";
import ClearFramesDialog from "../Tools/ClearFrames/ClearFramesDialog";
import BuildDialog from "../Tools/Build/BuildDialog";
import StyledLink from "../../core/StyledLink";
import HelpDialog from "../Tools/Help/HelpDialog";

export default function AnimationEditor() {
  // Get the animation name from the url
  const params = useParams();
  // Get the animation id from state sent from link
  const location = useLocation();
  const name = params.name;
  const animationId = location.state.animationId;
  const toolbarState: ToolsState = initialToolsState;
  // Replace with imported initialAnimationState from context and Object.assign with props
  let initialAnimationState: AnimationState = {
    id: animationId,
    name: name,
    assets: {},
    frames: [],
    selectedAssets: [],
    filledFrames: new Set<number>(),
    isBuilt: false,
  };

  const [animation, dispatchEditorAction] = useImmerReducer(
    AnimationEditorReducer,
    initialAnimationState
  );
  const [toolbar, dispatchToolbarAction] = useImmerReducer(ToolsReducer, toolbarState);

  useEffect(() => {
    // Async actions not allowed so we load in idb data and rehydrate as a side effect
    async function loadAnimationFromIdb() {
      const loadedAnimationState = { ...initialAnimationState };
      const animation = await getAnimation(animationId);
      const assetList = await getAllAssets(animationId);
      const frames = await getAllFrames(animationId);
      const assets: Record<string, Asset> = {};

      assetList.forEach((asset) => {
        assets[asset.id] = asset;
      });

      loadedAnimationState.assets = assets;
      loadedAnimationState.frames = frames;
      loadedAnimationState.isBuilt = animation!.isBuilt;
      loadedAnimationState.lastBuildTime = animation!.lastBuildTime;
      loadedAnimationState.thumbnail = animation!.thumbnail;

      dispatchEditorAction({
        type: "REHYDRATE",
        animation: loadedAnimationState,
      });
    }

    loadAnimationFromIdb();
  }, []);

  return (
    <>
      <ToolsContext.Provider value={toolbar}>
        <ToolsDispatchContext.Provider value={dispatchToolbarAction}>
          <AnimationEditorContext.Provider value={animation}>
            <AnimationEditorDispatchContext.Provider value={dispatchEditorAction}>
              <Header type="editor">
                <StyledLink to="/animations">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9B86F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span className="hidden md:block">all strips</span>
                </StyledLink>
              </Header>
              <FrameList />
              <Toolbar />
              <AssetList />
              {/* Dialogs */}
              <AutoAssignDialog />
              <BuildDialog name={animation.name!} />
              <ClearFramesDialog />
              <DeleteDialog />
              <ExportDialog />
              <HelpDialog />
            </AnimationEditorDispatchContext.Provider>
          </AnimationEditorContext.Provider>
        </ToolsDispatchContext.Provider>
      </ToolsContext.Provider>
    </>
  );
}

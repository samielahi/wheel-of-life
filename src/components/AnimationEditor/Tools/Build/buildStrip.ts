import { getAllFrames, getAllAssets, setAnimation } from "../../../../state/idb";
import { AnimationStateDB, Asset, Frame, AnimationDispatch } from "../../../../types";
import { constants } from "../../../../utils";

const offscreenCanvas = new OffscreenCanvas(
  constants.STRIP_WIDTH,
  constants.STRIP_HEIGHT
);
const ctx = offscreenCanvas.getContext("2d");

async function loadAnimationData(animationId: string) {
  const assetList = await getAllAssets(animationId);
  const frames = await getAllFrames(animationId);
  const assets: Record<string, Asset> = {};

  assetList.forEach((asset) => {
    assets[asset.id] = asset;
  });

  return [frames, assets];
}

function drawImageOntoCanvas(imgBlob: Blob, x: number, y = 0) {
  const img = new Image();

  img.onload = () => {
    ctx?.drawImage(img, x, y);
  };

  img.src = URL.createObjectURL(imgBlob);
}

export function buildStrip(animationId: string, name: string) {
  loadAnimationData(animationId).then((data) => {
    const frames = data[0] as Frame[];
    const assets = data[1] as Record<string, Asset>;

    frames.forEach((frame) => {
      const frameId = frame.id!;
      const assetId = frame.assetId!;
      const imgBlob = assets[assetId].data!;
      drawImageOntoCanvas(imgBlob, constants.FRAME_WIDTH * frameId - 1);
    });

    offscreenCanvas.convertToBlob().then((blob) => {
      const strip: AnimationStateDB = {
        id: animationId,
        name: name,
        isBuilt: true,
        build: blob,
        lastBuildTime: new Date(),
      };

      setAnimation(strip);
    });
  });
}

import { getAllFrames, getAllAssets, setAnimation } from "./state/idb";
import { Asset, Frame } from "./types";

const FRAME_WIDTH = 300;
const NUM_FRAMES = 16;
const STRIP_HEIGHT = 400;
const STRIP_WIDTH = FRAME_WIDTH * NUM_FRAMES;

const offscreenCanvas = new OffscreenCanvas(STRIP_WIDTH, STRIP_HEIGHT);
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

function buildStrip(animationId: string, name: string) {
  loadAnimationData(animationId).then((data) => {
    const frames = data[0] as Frame[];
    const assets = data[1] as Record<string, Asset>;

    frames.forEach((frame) => {
      const frameId = frame.id!;
      const assetId = frame.assetId!;
      const imgBlob = assets[assetId].data!;
      drawImageOntoCanvas(imgBlob, FRAME_WIDTH * frameId - 1);
    });

    offscreenCanvas.convertToBlob().then((blob) =>
      setAnimation({
        id: animationId,
        name: name,
        isBuilt: true,
        build: blob,
      })
    );
  });
}

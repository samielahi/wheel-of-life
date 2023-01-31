import { getAllFrames, getAllAssets, setAnimation } from "../../../../state/idb";
import { AnimationStateDB, Asset, Frame, AnimationDispatch } from "../../../../types";
import { constants } from "../../../../utils";

const canvas = new OffscreenCanvas(constants.STRIP_WIDTH, constants.STRIP_HEIGHT);
const ctx = canvas.getContext("2d");

async function loadAnimationData(animationId: string) {
  const assetList = await getAllAssets(animationId);
  const frames = await getAllFrames(animationId);
  const assets: Record<string, Asset> = {};

  assetList.forEach((asset) => {
    assets[asset.id] = asset;
  });

  return [frames, assets];
}

function drawImageOntoCanvas(
  ctx: OffscreenCanvasRenderingContext2D,
  imgBlob: Blob | File,
  x: number
) {
  const img = new Image();

  img.onload = () => {
    ctx?.drawImage(img, x, 0);
  };

  img.src = URL.createObjectURL(imgBlob);
}

async function buildStrip(animationId: string): Promise<OffscreenCanvas> {
  const animation = await loadAnimationData(animationId);
  const frames = animation[0] as Frame[];
  const assets = animation[1] as Record<string, Asset>;

  frames.forEach((frame) => {
    const frameId = frame.id!;
    const assetId = frame.assetId!;
    const imgBlob = assets[assetId].data!;
    const x = constants.FRAME_WIDTH * (frameId - 1);
    drawImageOntoCanvas(ctx!, imgBlob, x);
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(canvas);
    }, 1000);
  });
}

export async function saveStrip(animationId: string, name: string) {
  const canvas = await buildStrip(animationId);

  canvas.convertToBlob().then((blob) => {
    console.log(blob);
    const strip: AnimationStateDB = {
      id: animationId,
      name: name,
      isBuilt: true,
      build: blob,
      lastBuildTime: new Date(),
    };

    setAnimation(strip);
  });
}

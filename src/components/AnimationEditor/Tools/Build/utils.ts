import { getAllFrames, getAllAssets, setAnimation } from "../../../../state/idb";
import { AnimationStateDB, Asset, Frame } from "../../../../types";
import { constants } from "../../../../utils";

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas}
 * Could possibly move all of this into a dedicated work, but tbqh it's an unecessary optimization
 *
 */
const canvas = new OffscreenCanvas(constants.STRIP_WIDTH, constants.STRIP_HEIGHT);
const ctx = canvas.getContext("2d");

/**
 * Loads animation with matching animationId from indexedDB store
 * @param  {string} animationId
 * @returns {Promise<Frame[] | Record<string, Asset>>}
 */
async function loadAnimationData(
  animationId: string
): Promise<(Frame[] | Record<string, Asset>)[]> {
  const assetList = await getAllAssets(animationId);
  const frames = await getAllFrames(animationId);
  const assets: Record<string, Asset> = {};

  assetList.forEach((asset) => {
    assets[asset.id] = asset;
  });

  return [frames, assets];
}

/**
 * Converts blob to objURL and draws it onto canvas at specified x coord
 * @param  {OffscreenCanvasRenderingContext2D} ctx
 * @param  {Blob|File} imgBlob
 * @param  {number} x
 */
function drawImageOntoCanvas(
  ctx: OffscreenCanvasRenderingContext2D,
  imgBlob: Blob | File,
  x: number
): void {
  const img = new Image();

  img.onload = () => {
    ctx?.drawImage(img, x, 0);
  };

  img.src = URL.createObjectURL(imgBlob);
}

/**
 * Loads frame and asset data from specified animation and draws onto canvas
 * @param  {string} animationId
 * @returns Promise<OffscreenCanvas>
 */
async function drawFrameDataOntoCanvas(animationId: string): Promise<OffscreenCanvas> {
  const animation = await loadAnimationData(animationId);
  const frames = animation[0] as Frame[];
  const assets = animation[1] as Record<string, Asset>;

  // Draw all frame data onto canvas
  frames.forEach((frame) => {
    const frameId = frame.id!;
    const assetId = frame.assetId!;
    const imgBlob = assets[assetId].data!;
    const x = constants.FRAME_WIDTH * (frameId - 1);
    drawImageOntoCanvas(ctx!, imgBlob, x);
  });

  /*
   Some timeout funny business to wait for frames to be drawn before returning canvas
   Also useful for triggering an artificial load state 
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(canvas);
    }, 1000);
  });
}
/**
 * Builds strip by converting canvas to a Blob and storing in indexedDb
 * @param  {string} animationId
 * @param  {string} name
 * @returns Promise
 */
export async function buildStrip(animationId: string, name: string): Promise<void> {
  const canvas = await drawFrameDataOntoCanvas(animationId);

  canvas.convertToBlob().then((blob) => {
    console.log(blob);
    const strip: AnimationStateDB = {
      id: animationId,
      name: name,
      isBuilt: true,
      build: blob,
      lastBuildTime: new Date(),
    };

    // Store in idb
    setAnimation(strip);
  });
}

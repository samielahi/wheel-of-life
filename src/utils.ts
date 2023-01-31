import { Asset } from "./types";

const FRAME_WIDTH = 300;
const NUM_FRAMES = 16;
const STRIP_HEIGHT = 400;
const STRIP_WIDTH = FRAME_WIDTH * NUM_FRAMES;

export const constants = {
  FRAME_WIDTH: FRAME_WIDTH,
  NUM_FRAMES: NUM_FRAMES,
  STRIP_HEIGHT: STRIP_HEIGHT,
  STRIP_WIDTH: STRIP_WIDTH,
};

export function sortAssetsAlphaNumerically(a: Asset, b: Asset) {
  const fileAName = a.data.name.toLocaleUpperCase();
  const fileBName = b.data.name.toLocaleUpperCase();
  return fileAName.localeCompare(fileBName, "en", { numeric: true });
}

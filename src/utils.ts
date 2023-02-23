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
/**
 * @param  {Asset} a
 * @param  {Asset} b
 * @returns number
 */
export function sortAssetsAlphaNumerically(a: Asset, b: Asset): number {
  const fileAName = a.data.name.toLocaleUpperCase();
  const fileBName = b.data.name.toLocaleUpperCase();
  return fileAName.localeCompare(fileBName, "en", { numeric: true });
}

/**
 * @param  {Blob|File} blob
 * @returns Promise<string>
 */
export function blobToDataURL(blob: Blob | File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(reader.result as string);
    reader.onerror = (e) => reject(reader.error);
    reader.onabort = (e) => reject(new Error("Read aborted"));
    reader.readAsDataURL(blob);
  });
}

export function artificialDelay(promise: Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  }).then(() => promise);
}

export function inputIsValid(text: string) {
  if (text.match(/^[0-9a-zA-Z]{1,16}$/)) {
    return true;
  }
  return false;
}

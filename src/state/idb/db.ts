import { openDB } from "idb";
import { AnimationSchema, Asset, Frame } from "../../types";

const animationDB = openDB<AnimationSchema>("animations", 1, {
  upgrade(db) {
    db.createObjectStore("animation");
    const compoundIdx = ["animationId", "id"];

    const assetStore = db.createObjectStore("assets", {
      keyPath: compoundIdx,
    });

    const frameStore = db.createObjectStore("frames", {
      keyPath: compoundIdx,
    });

    assetStore.createIndex("by-animationId", compoundIdx, { multiEntry: true });
    frameStore.createIndex("by-animationId", compoundIdx, { multiEntry: true });
  },
});

export async function getFrame(key: string | string[]) {
  // @ts-ignore
  return (await animationDB).get("frames", key);
}

export async function setFrame(val: Frame) {
  return (await animationDB).put("frames", val);
}

export async function getAllFrames(animationId: string) {
  return (await animationDB).getAll("frames", animationId);
}

export async function deleteFrame(key: string | string[]) {
  // @ts-ignore
  return (await animationDB).delete("frames", key);
}

export async function getAsset(key: string | string[]) {
  // @ts-ignore
  return (await animationDB).get("assets", key);
}

export async function setAsset(val: Asset) {
  return (await animationDB).put("assets", val);
}

export async function getAllAssets(animationId: string) {
  return (await animationDB).getAll("assets", animationId);
}

export async function deleteAsset(key: string | string[]) {
  // @ts-ignore
  return (await animationDB).delete("assets", key);
}

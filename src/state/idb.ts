import { openDB } from "idb";
import { AnimationSchema, Asset, Frame, AnimationStateDB } from "../types";

const animationDB = openDB<AnimationSchema>("animations", 1, {
  upgrade(db) {
    db.createObjectStore("animations", { keyPath: "id" });
    const compoundIdx = ["animationId", "id"];
    const assetStore = db.createObjectStore("assets", {
      keyPath: "id",
    });

    const frameStore = db.createObjectStore("frames", {
      keyPath: compoundIdx,
    });

    assetStore.createIndex("by-animationId", "animationId");
    frameStore.createIndex("by-animationId", "animationId");
  },
});

export async function getAnimation(key: string) {
  return (await animationDB).get("animations", key);
}

export async function getAllAnimations() {
  return (await animationDB).getAll("animations");
}

export async function setAnimation(animation: AnimationStateDB) {
  // const currentAnimation = await getAnimation(animation.id);
  // let newAnimation: AnimationStateDB;
  // newAnimation = Object.assign(animation, currentAnimation);

  return (await animationDB).put("animations", animation);
}

export async function deleteAnimation(key: string) {
  return (await animationDB).delete("animations", key);
}

export async function getFrame(key: string | any[]) {
  // @ts-ignore
  return (await animationDB).get("frames", key);
}

export async function setFrame(val: Frame) {
  return (await animationDB).put("frames", val);
}

export async function getAllFrames(animationId: string) {
  return (await animationDB).getAllFromIndex("frames", "by-animationId", animationId);
}

export async function deleteFrames(animationId: string) {
  const tx = (await animationDB).transaction("frames", "readwrite");
  const frameStore = tx.objectStore("frames");

  for (let i = 0; i < 16; i++) {
    // @ts-ignore
    frameStore.delete([animationId, i + 1]);
  }

  return await tx.done;
}

export async function getAsset(key: string | (string | number)[]) {
  // @ts-ignore
  return (await animationDB).get("assets", key);
}

export async function setAsset(val: Asset) {
  return (await animationDB).put("assets", val);
}

export async function getAllAssets(animationId: string) {
  return (await animationDB).getAllFromIndex("assets", "by-animationId", animationId);
}

export async function deleteAsset(key: string) {
  return (await animationDB).delete("assets", key);
}

export async function deleteAssets(key: string) {
  const idx = (await animationDB)
    .transaction("assets", "readwrite")
    .store.index("by-animationId");

  for await (const cursor of idx.iterate(key)) {
    cursor.delete();
  }
}

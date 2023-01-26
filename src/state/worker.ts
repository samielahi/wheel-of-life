import {
  setFrame,
  getAllFrames,
  deleteFrames,
  getAsset,
  setAsset,
  getAllAssets,
  deleteAsset,
} from "./idb";
import { WorkerAction } from "../types";

onconnect = (event) => {
  const port = event.ports[0];

  port.onmessage = async (event: MessageEvent) => {
    const data: WorkerAction = event.data;
    switch (data.type) {
      case "getAllFrames": {
        const frames = await getAllFrames(data.animationId!);
        port.postMessage(frames);
        break;
      }

      case "setFrame": {
        setFrame(data.frame!);
        break;
      }

      case "deleteFrame": {
        deleteFrames(data.animationId!);
        break;
      }

      case "getAsset": {
        const asset = await getAsset(data.key!);
        port.postMessage(asset);
        break;
      }

      case "setAsset": {
        setAsset(data.asset!);
        break;
      }

      case "getAllAssets": {
        const assets = await getAllAssets(data.animationId!);
        port.postMessage(assets);
        break;
      }

      case "deleteAsset": {
        deleteAsset(data.key!);
        break;
      }

      default: {
        throw Error("Unknown worker action: " + data.type);
      }
    }
  };
};

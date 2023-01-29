import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { FileWithHandle, fileOpen } from "browser-fs-access";
import { AnimationContext, AnimationDispatchContext } from "../../../state/context";
import { Asset } from "../../../types";
import IconButton from "../../../core/IconButton";

function createAsset(animationName: string, file: FileWithHandle): Asset {
  const assetId = uuid();
  const asset: Asset = {
    animationId: "test",
    id: assetId,
    data: file,
    isSelected: false,
    assignedFrames: [],
  };

  return asset;
}

export default function AssetUpload(props: { isIdle: boolean }) {
  const animation = useContext(AnimationContext);
  const animationName = animation.name!;
  const dispatchAnimationAction = useContext(AnimationDispatchContext);

  async function uploadAssets() {
    // Pick the file
    const images = await fileOpen({
      mimeTypes: ["image/*"],
      multiple: true,
    });

    // Create and store assets
    images.forEach((image) => {
      const asset = createAsset(animationName, image);
      dispatchAnimationAction({
        type: "UPLOAD_ASSET",
        asset: asset,
      });
    });
  }

  return (
    <>
      <IconButton onClick={uploadAssets} disabled={!props.isIdle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M12 12v6"></path>
          <path d="m15 15-3-3-3 3"></path>
        </svg>
      </IconButton>
    </>
  );
}

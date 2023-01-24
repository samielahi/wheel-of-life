import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { fileOpen } from "browser-fs-access";
import { AnimationDispatchContext } from "../../../state/context";
import { Asset } from "../../../types";
import IconButton from "../../../core/IconButton";

export default function AssetUpload(props: { isIdle: boolean }) {
  const dispatchAnimationAction = useContext(AnimationDispatchContext);
  
  async function uploadAsset() {
    // Pick the file
    const blob = await fileOpen({
      mimeTypes: ["image/*"],
      multiple: true,
    });
    // Create an asset
    const imgObjectURL = URL.createObjectURL(blob[0]);
    const assetId = uuid();
    const asset: Asset = {
      id: assetId,
      data: imgObjectURL,
      isSelected: false,
      assignedFrames: [],
    };

    dispatchAnimationAction({
      type: "uploadAsset",
      uploadedAsset: asset,
    });
  }

  return (
    <>
      <IconButton onClick={uploadAsset} disabled={!props.isIdle}>
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

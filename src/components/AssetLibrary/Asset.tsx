import { useContext, useState } from "react";
import { AnimationDispatchContext, ToolbarContext } from "../../state/context";
import { AnimationAction } from "../../types";

export default function Asset(props: { id: string }) {
  const dispatchAnimationAction = useContext<(action: AnimationAction) => void>(
    AnimationDispatchContext
  );
  const toolbar = useContext(ToolbarContext);

  const [isSelected, setIsSelected] = useState(false);

  function handleSelection() {
    if (toolbar.status === "selecting" && !isSelected) {
      dispatchAnimationAction({
        type: "selectAsset",
        assetId: props.id,
      });
      setIsSelected(true);
    } else if (toolbar.status === "selecting" && isSelected) {
      dispatchAnimationAction({
        type: "deselectAsset",
        assetId: props.id,
      });
      setIsSelected(false);
    }
  }

  return (
    <>
      <div onClick={handleSelection} className="cursor-pointer relative group">
        <img
          src="https://placekitten.com/150/200"
          alt="a cute kitten"
          style={isSelected ? { borderColor: "#ff3d00" } : {}}
          className="w-[150px] h-[200px] border-4 border-smoke rounded"
        />
      </div>
    </>
  );
}

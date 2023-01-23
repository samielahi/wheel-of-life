import Asset from "./Asset";
import { useContext } from "react";
import { ToolbarContext } from "../../state/context";

export default function AssetLibrary() {
  const toolbar = useContext(ToolbarContext);
  return (
    <>
      <div
        style={
          toolbar.status === "selecting" ? { backgroundColor: "#FCFBF4" } : {}
        }
        className="w-full flex overflow-auto h-full wrapper flex-col"
      >
        <div className="w-max flex gap-4 pt-8 pb-8">
          {/* <Asset id="1" />
          <Asset id="2" />
          <Asset id="3" />
          <Asset id="4" />
          <Asset id="5" />
          <Asset id="6" />
          <Asset id="7" />
          <Asset id="8" />
          <Asset id="9" />
          <Asset id="10" />
          <Asset id="11" />
          <Asset id="12" />
          <Asset id="13" />
          <Asset id="14" />
          <Asset id="15" />
          <Asset id="16" /> */}
        </div>
      </div>
    </>
  );
}

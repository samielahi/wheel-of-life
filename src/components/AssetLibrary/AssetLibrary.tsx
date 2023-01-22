import Asset from "./Asset";

export default function AssetLibrary() {
  return (
    <>
      <div className="w-full flex overflow-auto h-max wrapper flex-col gap-4 border-smoke border-b-[3px]">
        <div className="w-max flex gap-4">
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
          <Asset />
        </div>
      </div>
    </>
  );
}

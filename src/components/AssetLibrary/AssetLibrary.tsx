import Asset from "./Asset";
import Button from "../../core/Button";
import IconButton from "../../core/IconButton";

export default function AssetLibrary() {
  return (
    <>
      <div className="w-full flex overflow-auto h-max wrapper flex-col gap-4 border-smoke border-b-[3px]">
        {/* <h3 className="font-main text-xl z-10 absolute bg-smoke">
          Your Images
        </h3> */}
        {/* <div className="flex gap-4">
            <Button>select</Button>
            <IconButton>
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
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </IconButton>
          </div> */}
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
        </div>
      </div>
    </>
  );
}

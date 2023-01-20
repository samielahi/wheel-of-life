import LibraryImage from "./LibraryImage";
import Button from "./Button";
import IconButton from "./IconButton";

export default function Library() {
  return (
    <>
      <aside className="hidden lg:flex flex-1 overflow-auto h-full wrapper items-center flex-col gap-8 border-smoke border-r-[3px]">
        <div className="flex w-full items-center gap-4 flex-wrap justify-between">
          <h3 className="font-main text-xl">Your Images</h3>
          <div className="flex gap-4">
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
          </div>
        </div>

        <div className="pb-[180px] flex gap-8 flex-wrap">
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
        </div>
      </aside>
    </>
  );
}

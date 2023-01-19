import LibraryImage from "./LibraryImage";

export default function Library() {
  return (
    <>
      <aside className="overflow-auto flex-1 h-full w-1/4 wrapper flex flex-col items-center gap-4 border-smoke border-r-[3px]">
        <h3 className="font-main text-xl">Your Images</h3>
        <div className="pb-[180px] min-h-min flex gap-8 items-center justify-center flex-wrap">
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
          <LibraryImage></LibraryImage>
        </div>
      </aside>
    </>
  );
}

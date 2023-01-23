export default function DropFrame(props: any) {
  return (
    <>
      <div className="-mt-[3px] -mb-[3px] -ml-[3px] w-[300px] h-[400px] relative border-[3px] border-smoke hover:bg-active">
        <span className="absolute bg-smoke p-2 rounded h-fit left-[42%] top-4 z-10">{props.id}</span>
        <span></span>
      </div>
    </>
  );
}

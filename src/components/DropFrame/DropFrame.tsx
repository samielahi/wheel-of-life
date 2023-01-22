export default function DropFrame(props: any) {
  return (
    <>
      <div className="-mt-[3px] -mb-[3px] -ml-[3px] w-[300px] h-[400px] wrapper flex justify-center border-[3px] border-smoke">
        <span className="bg-smoke p-2 rounded h-fit">{props.id}</span>
      </div>
    </>
  );
}

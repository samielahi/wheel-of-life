export default function StatusMessage(props: {
  isSelecting: boolean;
  message: string;
}) {
  return (
    <>
      <div className="hidden md:block bg-smoke rounded">
        {props.isSelecting ? (
          <p className="px-4 py-2">{props.message}</p>
        ) : null}
      </div>
    </>
  );
}

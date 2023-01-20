export interface DropCardProps {
  id: string;
}

export default function DropCard(props: DropCardProps) {
  return (
    <>
      <div className="wrapper border-[3px] border-smoke flex w-[300px] h-[400px] justify-center">
        <span className="bg-smoke rounded z-10 p-2 flex h-fit">
          {props.id}
        </span>
      </div>
    </>
  );
}

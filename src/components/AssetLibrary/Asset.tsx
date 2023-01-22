export default function Asset() {
  return (
    <>
      <div className="cursor-pointer relative group" draggable>
        <img
          src="https://placekitten.com/150/200"
          alt="a cute kitten"
          className="w-[150px] h-[200px] border-4 border-smoke rounded"
        />
      </div>
    </>
  );
}

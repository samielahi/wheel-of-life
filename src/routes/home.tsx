import prax from "../assets/images/prax.png";
import smile from "../assets/images/smile.png";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden bg-bg">
        {/* Description */}
        <div className="absolute top-[7%] left-[5%] w-[375px] text-2xl">
          A group exhibition featuring new works created for{" "}
          <i className="underline">zoetropes</i>.
        </div>
        {/* Logo + Location */}
        <div className="flex h-full flex-col items-center justify-center gap-4 pb-16">
          <h1 className="text-8xl text-red">Wheel Of Life</h1>
          <span className="text-5xl font-medium">@ Hyde Park Art Center</span>
        </div>

        {/* Run Length + Gallery */}
        <div className="absolute top-[7%] left-[calc(95%_-_375px)] w-[375px] text-2xl">
          <div className="flex flex-col items-end">
            <span>March 19 - July 2</span>
            <span>Kanter-McCormick Gallery</span>
          </div>
        </div>

        <div className="absolute top-[calc(80%_-_200px)] left-[calc(50%_-_250px)] h-[400px] w-[500px] drop-shadow-lg">
          <img src={prax} alt="A praxinoscope" />
        </div>
      </div>
    </>
  );
}

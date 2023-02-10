import prax from "../assets/images/prax.png";
import light from "../assets/images/light.png";
import image from "../assets/example_assets/1.png";
import Asset from "../components/AnimationEditor/Asset";

const Heading = () => (
  <>
    <div className="flex h-full flex-col items-center justify-center gap-2 2xl:pb-10">
      <h1 className="text-6xl text-red 2xl:text-8xl">Wheel Of Life</h1>
      <span className="text-2xl font-medium 2xl:text-5xl">@ Hyde Park Art Center</span>
    </div>
  </>
);

const Description = () => (
  <>
    <div className="absolute top-[7%] left-[5%] w-[375px] text-xl 2xl:text-2xl">
      A group exhibition featuring new works created for{" "}
      <i className="underline">zoetropes</i>.
    </div>

    <div className="absolute top-[7%] left-[calc(95%_-_375px)] w-[375px] text-xl 2xl:text-2xl">
      <div className="flex flex-col items-end">
        <span>March 19 - July 2, 2022</span>
        <span>Kanter-McCormick Gallery</span>
      </div>
    </div>
  </>
);

const Images = () => (
  <>
    <div className="absolute left-[calc(50%_-_175px)] top-[calc(80%_-_150px)] h-[350px] w-[350px] cursor-pointer drop-shadow-lg transition-opacity hover:opacity-70 2xl:top-[calc(80%_-_200px)] 2xl:left-[calc(50%_-_250px)] 2xl:h-[400px] 2xl:w-[500px]">
      <img src={prax} alt="A praxinoscope" />
    </div>

    <div className="absolute -top-[8%] left-[calc(46%_-_225px)] w-[450px] drop-shadow-lg 2xl:-top-[16%] 2xl:left-[calc(45%_-_350px)] 2xl:w-[700px]">
      <img src={light} alt="A clamp light" />
    </div>
  </>
);

export default function Home() {
  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden bg-bg">
        <Heading />
        <Description />
        <Images />
      </div>
    </>
  );
}

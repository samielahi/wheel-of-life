import prax from "../assets/images/prax.png";
import light from "../assets/images/light.png";
import smile from "../assets/images/smile.png";
import asset from "../assets/images/1.png";
import Footer from "../core/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="flex h-full flex-col items-center justify-evenly text-center md:items-end md:pr-[3rem] md:text-end lg:pr-[5rem] xl:pr-[8rem]">
        <p className="hidden md:block lg:text-lg xl:text-2xl">
          A group exhibition featuring new works
          <br />
          works created for <i className="underline">zoetropes</i>
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl text-red sm:text-5xl lg:text-5xl xl:text-7xl">
            Wheel Of Life
          </h1>
          <span className="text-3xl font-bold xl:text-5xl">@ Hyde Park Center</span>
          <span className="lg:text-lg xl:text-2xl">Kanter-McCormick Gallery</span>
        </div>
        <Link to="/animations" className="w-fit">
          <span className="rounded-full bg-[#FFE1C1] p-6 text-center font-bold  text-red hover:underline hover:underline-offset-4 lg:text-lg xl:text-2xl">
            learn more
          </span>
        </Link>
      </section>

      <Footer />
    </>
  );
}

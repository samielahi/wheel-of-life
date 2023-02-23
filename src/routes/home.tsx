import Footer from "../core/Footer";
import StyledLink from "../core/StyledLink";
import BurgerMenu from "../core/BurgerMenu";
import LoadingSpinner from "../core/LoadingSpinner";
import { Suspense } from "react";

const Links = () => (
  <>
    <StyledLink to="https://www.hydeparkart.org/wp-content/uploads/2022/05/Wheel-of-life-Brochure.pdf">
      <span className="font-bold text-red xl:text-2xl">Learn More</span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff3d00"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </span>
    </StyledLink>
    <StyledLink to="/zoetrope">
      <span className="font-bold text-orange xl:text-2xl">3D Zoetrope</span>
    </StyledLink>
    <StyledLink to="/animations">
      <span className="font-bold text-violet xl:text-2xl">Create An Animation</span>
    </StyledLink>
  </>
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <BurgerMenu>
          <Links />
        </BurgerMenu>
        <section className="absolute left-[7%] xl:left-[5%] 2xl:left-[15%]">
          <div className="z-0 hidden flex-col gap-[20rem] md:flex lg:gap-20">
            <img
              src="/images/light.png"
              className="w-[350px] drop-shadow-2xl xl:w-[400px] 2xl:w-[420px]"
              alt="A clip light used in the exhibition."
            />
            <img
              src="/images/prax.png"
              className="w-[350px] drop-shadow-2xl xl:w-[400px] 2xl:w-[500px]"
              alt="A praxinoscope featuring artwork by participating artist Georgina Valverde."
            />
          </div>
        </section>
        <section className="flex h-full flex-col items-center justify-evenly text-center md:items-end md:pr-[3rem] md:text-end lg:pr-[5rem] 2xl:pr-[8rem]">
          <img
            src="/images/light.png"
            alt="A clip light used to light the zoetropes in the show."
            className="w-[250px] -translate-y-10 sm:-translate-y-20 md:hidden"
          />

          <p className="hidden md:block lg:text-lg xl:text-2xl">
            A group exhibition featuring new works
            <br />
            works created for <i className="underline">zoetropes</i>
          </p>

          <div className="flex flex-col sm:gap-2 md:gap-4">
            <h1 className="text-4xl text-red sm:text-5xl lg:text-5xl xl:text-7xl">
              Wheel Of Life
            </h1>
            <span className="text-3xl font-bold xl:text-5xl">@ Hyde Park Center</span>
            <span className="lg:text-lg xl:text-2xl">Kanter-McCormick Gallery</span>
          </div>

          <div className="hidden w-1/2 flex-wrap justify-end gap-4 md:flex xl:flex-none xl:gap-8">
            <Links />
          </div>

          <img
            src="/images/prax.png"
            className="w-[300px] md:hidden"
            alt="A praxinoscope featuring artwork by participating artist Georgina Valverde."
          />
        </section>
        <Footer />
      </Suspense>
    </>
  );
}

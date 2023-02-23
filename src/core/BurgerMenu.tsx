import { useEffect, useState } from "react";
import useViewportWidth from "../hooks/useViewportWidth";

export default function BurgerMenu(props: { children?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentWidth = useViewportWidth();
  const breakpoint = 768; // TailwindCSS 'md' breakpoint width

  // Close an open menu once 'md' width breakpoint is crossed
  useEffect(() => {
    if (currentWidth > breakpoint && isOpen) {
      setIsOpen(false);
    }
  }, [currentWidth]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-[calc(100%_-_5rem)] top-[3rem] z-50 outline-offset-2 outline-violet focus:outline-4 md:hidden"
      >
        <div className="flex cursor-pointer flex-col gap-1 ">
          <span
            style={
              isOpen
                ? {
                    transform: "rotate(45deg) translate(-0.1rem, -0.6rem)",
                  }
                : {}
            }
            className="h-[6px] w-10 origin-top-left rounded-sm bg-red transition-transform duration-300"
          ></span>
          <span
            style={isOpen ? { opacity: "0" } : { opacity: "100" }}
            className="h-[6px] w-10 rounded-sm bg-orange transition-opacity duration-300"
          ></span>
          <span
            style={isOpen ? { transform: "rotate(-45deg)" } : {}}
            className="h-[6px] w-10 origin-top-left rounded-sm bg-violet transition-all duration-300"
          ></span>
        </div>
      </button>

      {isOpen ? (
        <div className="fadeIn fixed z-30 h-full w-full bg-white/70 pt-10 pl-8 backdrop-blur-lg">
          <h3 className="mb-8 text-3xl text-red">Wheel Of Life</h3>
          <div className="flex flex-col gap-8">{props.children}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

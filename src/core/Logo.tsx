import { Link } from "react-router-dom";

export interface LogoProps {
  showSubtitle?: boolean;
  subtitle?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <>
      <Link
        to="/"
        className="focus:outline-2 focus:outline-offset-4 focus:outline-orange"
      >
        <div className="flex w-fit flex-col items-center justify-center">
          <h2 className="text-heading text-md text-red sm:text-2xl lg:text-4xl">
            Wheel Of Life
          </h2>
          {props.showSubtitle ? (
            <span className="text-sm md:text-lg italic text-violet block">
              {props.subtitle}
            </span>
          ) : null}
        </div>
      </Link>
    </>
  );
}

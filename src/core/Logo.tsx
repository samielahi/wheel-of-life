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
          <h2 className="text-heading text-lg text-red lg:text-4xl">
            Wheel Of Life
          </h2>
          {props.showSubtitle ? (
            <span className="hidden text-lg italic text-violet sm:block">
              {props.subtitle}
            </span>
          ) : null}
        </div>
      </Link>
    </>
  );
}

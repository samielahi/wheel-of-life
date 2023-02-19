import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  children?: any;
}

export default function StyledLink(props: LinkProps) {
  return (
    <>
      <Link
        to={props.to}
        className="flex w-fit items-center justify-center gap-2 rounded-md border-2 border-silver bg-white px-2 py-1 text-sm text-black drop-shadow-sm backdrop-blur-lg hover:border-orange hover:bg-smoke/10 focus:outline-2 focus:outline-offset-4 focus:outline-orange sm:px-4 sm:py-2 lg:h-[50px] lg:text-lg"
      >
        {props.children}
      </Link>
    </>
  );
}

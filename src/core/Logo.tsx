export interface LogoProps {
  showSubtitle?: boolean;
  subtitle?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <>
      <div className="w-fit flex flex-col justify-center items-center">
        <h2 className="text-red text-xl lg:text-3xl">Wheel Of Life</h2>
        {props.showSubtitle ? (
          <span className="text-violet italic lg:text-lg">
            {props.subtitle}
          </span>
        ) : null}
      </div>
    </>
  );
}
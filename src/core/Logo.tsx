export interface LogoProps {
  showSubtitle?: boolean;
  subtitle?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <>
      <div className="flex w-fit flex-col items-center justify-center">
        <h2 className="text-red text-md lg:text-4xl">Wheel Of Life</h2>
        {props.showSubtitle ? (
          <span className="hidden text-lg italic text-violet sm:block">
            {props.subtitle}
          </span>
        ) : null}
      </div>
    </>
  );
}

import StyledLink from "./StyledLink";
import Logo from "./Logo";
import Help from "../components/Tools/Help/Help";
import BurgerMenu from "./BurgerMenu";
import Controls from "../components/Zoetrope/Controls";

const AnimationMenuHeader = (props: { children?: any }) => (
  <>
    <header className="flex items-center justify-between bg-bg/40 py-6 px-8  backdrop-blur">
      <div className="w-1/4 md:w-1/3">{props.children}</div>

      <Logo showSubtitle subtitle="select strip" />

      <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
        <Help />
      </div>
    </header>
  </>
);

const AnimationEditorHeader = (props: { children?: any }) => (
  <>
    <header className="flex items-center justify-between bg-bg/40 py-6 px-8  backdrop-blur">
      <div className="w-1/4 md:w-1/3">{props.children}</div>

      <Logo showSubtitle subtitle="edit strip" />

      <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
        <Help />
      </div>
    </header>
  </>
);

const ZoetropeHeader = (props: { children?: any }) => (
  <>
    <header className="fixed z-20 w-full">
      <div className="flex items-center justify-between bg-bg/40 py-6 px-8  backdrop-blur">
        <div className="w-1/4 md:w-1/3">
          <StyledLink to="/animations">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9B86F3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="hidden md:block">editor</span>
          </StyledLink>
        </div>

        <Logo showSubtitle subtitle="3d zoetrope" />

        <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
        </div>
      </div>
    </header>
  </>
);

export default function Header(props: {
  type: "menu" | "editor" | "zoetrope";
  children?: any;
}) {
  return (
    <>
      {
        {
          menu: <AnimationMenuHeader>{props.children}</AnimationMenuHeader>,
          editor: <AnimationEditorHeader>{props.children}</AnimationEditorHeader>,
          zoetrope: <ZoetropeHeader>{props.children}</ZoetropeHeader>,
        }[props.type]
      }
    </>
  );
}

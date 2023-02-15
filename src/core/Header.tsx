import Button from "./Button";
import IconButton from "./IconButton";
import Logo from "./Logo";
import Help from "../components/Tools/Help/Help";

const AnimationMenuHeader = (props: { children?: any }) => (
  <>
    <div className="w-1/4 md:w-1/3">{props.children}</div>

    <Logo showSubtitle subtitle="select strip" />

    <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
      <Help />
    </div>
  </>
);

const AnimationEditorHeader = (props: { children?: any }) => (
  <>
    <div className="w-1/4 md:w-1/3">{props.children}</div>

    <Logo showSubtitle subtitle="edit strip" />

    <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
      <Help />
    </div>
  </>
);
export default function Header(props: { type: "menu" | "editor"; children?: any }) {
  return (
    <>
      <header className="wrapper flex items-center justify-between bg-bg drop-shadow-sm">
        {props.type === "menu" ? (
          <AnimationMenuHeader>{props.children}</AnimationMenuHeader>
        ) : (
          <AnimationEditorHeader>{props.children}</AnimationEditorHeader>
        )}
      </header>
    </>
  );
}

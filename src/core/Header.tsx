import Button from "./Button";
import IconButton from "./IconButton";
import Logo from "./Logo";

const AnimationSelectionHeader = () => (
  <>
    <div className="w-1/4 md:w-1/3"></div>

    <Logo />

    <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
      <IconButton tooltip="help">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </IconButton>
    </div>
  </>
);

const AnimationEditorHeader = () => (
  <>
    <div className="w-1/4 md:w-1/3">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="hidden md:block">all strips</span>
      </Button>
    </div>

    <Logo showSubtitle subtitle="strip editor" />

    <div className="flex w-1/4 justify-end gap-4 md:w-1/3">
      <IconButton tooltip="help">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </IconButton>
    </div>
  </>
);
export default function Header(props: { type: "menu" | "editor" }) {
  return (
    <>
      <header className="wrapper flex items-center justify-between border-b-[3px] border-smoke">
        {props.type === "menu" ? <AnimationSelectionHeader /> : <AnimationEditorHeader />}
      </header>
    </>
  );
}

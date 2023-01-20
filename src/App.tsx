import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Library from "./components/Library";
import DropCard from "./components/DropCard";

export default function App() {
  return (
    <>
      <div className="h-full">
        <Header></Header>
        <Toolbar />
        <div className="flex flex-wrap h-full">
          <Library />
          <div className="flex w-fit flex-wrap justify-center">
            <DropCard id="001" />
            <DropCard id="002" />
            <DropCard id="003" />
            <DropCard id="004" />
          </div>
        </div>
      </div>
    </>
  );
}

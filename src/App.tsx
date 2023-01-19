import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Library from "./components/Library";

export default function App() {
  return (
    <>
      <div className="h-full">
        <Header></Header>
        <Toolbar />
        <Library />
      </div>
    </>
  );
}

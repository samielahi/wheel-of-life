import Header from "./core/Header/Header";
import Toolbar from "./core/Toolbar/Toolbar";
import Library from "./core/Library/Library";

function App() {
  return (
    <div>
      <Header></Header>
      <Toolbar />
      <div>
        <Library />
      </div>
    </div>
  );
}

export default App;

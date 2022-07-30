import Content from "./layout/content/Content";
import NavBars from "./layout/navbar/NavBars";
import SlideBar from "./layout/slideBar/SlideBar";
import Routers from "./routers/Routers";

function App() {
  return (
    <div className="App">
      <SlideBar />
      <NavBars />
      <Content>
        <Routers />
      </Content>
    </div>
  );
}

export default App;

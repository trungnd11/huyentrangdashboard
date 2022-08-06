import { ToastContainer } from "react-toastify";
import Content from "./layout/content/Content";
import Footer from "./layout/footer/Footer";
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
        <Footer />
      </Content>
      <ToastContainer />
    </div>
  );
}

export default App;

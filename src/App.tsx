import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Content from "./layout/content/Content";
import Footer from "./layout/footer/Footer";
import NavBarMobile from "./layout/navbar/NavBarMobile";
import NavBars from "./layout/navbar/NavBars";
import SlideBar from "./layout/slideBar/SlideBar";
import Home from "./page/home/Home";
import AuthRouter from "./routers/AuthRouter";
import PublicRouter from "./routers/PublicRouter";
import Routers from "./routers/Routers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <PublicRouter>
              <Home />
            </PublicRouter>
          }
        />
        <Route
          path="*"
          element={
            <AuthRouter>
              <>
                <SlideBar />
                <NavBars />
                <NavBarMobile />
                <Content>
                  <Routers />
                  <Footer />
                </Content>
              </>
            </AuthRouter>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

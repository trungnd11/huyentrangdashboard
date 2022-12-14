import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AxiosConfig from "./axiosConfig/AxiosConfig";
import { getCookie } from "./components/function/function";
import { Author } from "./enum/Enum";
import Content from "./layout/content/Content";
import Footer from "./layout/footer/Footer";
import NavBarMobile from "./layout/navbar/NavBarMobile";
import NavBars from "./layout/navbar/NavBars";
import SlideBar from "./layout/slideBar/SlideBar";
import Home from "./page/home/Home";
import AuthRouter from "./routers/AuthRouter";
import PublicRouter from "./routers/PublicRouter";
import Routers from "./routers/Routers";
import { getLoginStore, login, logout } from "./stores/login/login";

function App() {
  const { isAuthorization } = useSelector(getLoginStore);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = getCookie(Author.USER);


  useEffect(() => {
    user ? dispatch(login(JSON.parse(user))) : dispatch(logout(Author.USER));
  }, [dispatch, pathname, user]);

  useEffect(() => {
    isAuthorization ? <Navigate to="/" /> : <Navigate to="/home" />
  }, [isAuthorization]);

  return (
    <div className="App">
      { <AxiosConfig /> }
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

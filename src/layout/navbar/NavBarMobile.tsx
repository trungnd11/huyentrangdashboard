import { useCallback, useState } from "react";
import avatar from "../../statics/avatar/avatar-1.jpg";
import { NavBarMobileStyle } from "./NavBarMobileStyle";
import SlideItem from "../slideBar/SlideItem";

export default function NavBarMobile() {
  const [showListMenu, setshowListMenu] = useState(false);

  const handleShowListMenu = useCallback(
    () => {
      setshowListMenu(pre => !pre);
    },
    [],
  )

  return (
    <NavBarMobileStyle className="d-block d-lg-none shadow">
      <div className="navbar-mobile">
        <div className="btn-list-menu" onClick={handleShowListMenu}>
          <i className="fa-solid fa-bars" />
        </div>
        <div className="brand-name">
          <h5>Huyen Trang Tran</h5>
        </div>
        <div className="auth-avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
      {showListMenu && <div className="overlay" onClick={handleShowListMenu} />}
      {showListMenu && (
        <div className="list-menu">
          <SlideItem onHide={handleShowListMenu} />
        </div>
      )}
    </NavBarMobileStyle>
  );
}

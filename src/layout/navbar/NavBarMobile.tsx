import { useCallback, useState } from "react";
import avatar from "../../statics/avatar/avatar-1.jpg";
import { BrandName, BtnIcon, DivAvatar, DivListMenu, NavBarMobileStyle } from "./NavBarMobileStyle";
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
          {showListMenu ? (
            <BtnIcon className="fa-solid fa-xmark" />
          ) : (
            <BtnIcon className="fa-solid fa-bars" />
          )}
        </div>
        <div className="brand-name">
          <BrandName>Huyen Trang Tran</BrandName>
        </div>
        <div className="auth-avatar">
          <DivAvatar src={avatar} alt="" />
        </div>
      </div>
      {showListMenu && <div className="overlay" onClick={handleShowListMenu} />}
      {showListMenu && (
        <DivListMenu className="list-menu">
          <SlideItem onHide={handleShowListMenu} />
          <div className="author-code text-white text-center">
            Copy rigth 2022 by <i className="fa-solid fa-heart" />
            <a className="mx-1" href="https://nguyendinhtrung.herokuapp.com/">
              Trungg
            </a>
            <i className="fa-solid fa-heart" />
          </div>
        </DivListMenu>
      )}
    </NavBarMobileStyle>
  );
}

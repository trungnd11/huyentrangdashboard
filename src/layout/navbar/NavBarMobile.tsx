import { useCallback, useState } from "react";
import user from "../../statics/avatar/avatar-1.jpg";
import {
  BrandName,
  BtnIcon,
  DivAvatar,
  DivListMenu,
  ListMenuInfo,
  NavBarMobileStyle,
} from "./NavBarMobileStyle";
import SlideItem from "../slideBar/SlideItem";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStore, logout } from "../../stores/login/login";
import { SweetAlertComfirm } from "../../components/alert/Alert";
import { Author } from "../../enum/Enum";

export default function NavBarMobile() {
  const [showListMenu, setshowListMenu] = useState(false);
  const [showMenuInfo, setshowMenuInfo] = useState(false);
  const dispatch = useDispatch();
  const { avatar, username } = useSelector(getLoginStore);

  const handleShowListMenu = useCallback(() => {
    setshowListMenu((pre) => !pre);
  }, []);

  const handleShowInfoMenu = useCallback(
    () => setshowMenuInfo((pre) => !pre),
    []
  );

  const handleLogout = () => {
    setshowMenuInfo(pre => !pre);
    SweetAlertComfirm("Đăng xuất", "Bạn có chắc chắn thoát tài khoản", () => {
      dispatch(
        logout({
          user: Author.USER,
          token: Author.TOKEN,
          refreshToken: Author.REFRESH_TOKEN,
        })
      );
    });
  }

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
          <BrandName>{username || "Huyen Trang Tran"}</BrandName>
        </div>
        <div className="auth-avatar">
          <DivAvatar src={avatar || user} alt="" onClick={handleShowInfoMenu} />
          {showMenuInfo && (
            <ListMenuInfo className="info-menu">
              <ul className="list-group">
                <li className="list-group-item active" aria-current="true">
                  {username}
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-circle-info pe-1"></i>
                  Thông tin tài khoản
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-comment pe-1"></i>
                  Tin nhắn
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-bell pe-1"></i>Thông báo
                </li>
                <li
                  className="list-group-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-to-bracket pe-1"></i>
                  Đăng xuất
                </li>
              </ul>
            </ListMenuInfo>
          )}
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

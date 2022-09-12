import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlertComfirm } from "../../components/alert/Alert";
import { Author } from "../../enum/Enum";
import avatarImg from "../../statics/avatar/avatar-1.jpg";
import { getLoginStore, logout } from "../../stores/login/login";

export default function SlideInfo() {
  const [showMenuInfo, setshowMenuInfo] = useState(false);
  const dispatch = useDispatch();
  const { avatar, username } = useSelector(getLoginStore);

  const handleShowInfoMenu = useCallback(
    () => setshowMenuInfo((pre) => !pre),
    []
  );

  const handleLogout = () => {
    setshowMenuInfo((pre) => !pre);
    SweetAlertComfirm("Đăng xuất", "Bạn có chắc chắn thoát tài khoản", () => {
      dispatch(
        logout({
          user: Author.USER,
          token: Author.TOKEN,
          refreshToken: Author.REFRESH_TOKEN,
        })
      );
    });
  };

  return (
    <div className="slide-info p-3" onClick={handleShowInfoMenu}>
      <div className="avatar">
        <div className="status-active"></div>
        <img src={avatar || avatarImg} alt="1" />
      </div>
      <div className="name mt-3">
        <p>{username}</p>
      </div>
      {showMenuInfo && (
        <div className="info-menu">
          <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
              {username}
            </li>
            <li className="list-group-item text-start">
              <i className="fa-solid fa-circle-info pe-1"></i>
              Thông tin tài khoản
            </li>
            <li className="list-group-item text-start">
              <i className="fa-solid fa-comment pe-1"></i>
              Tin nhắn
            </li>
            <li className="list-group-item text-start">
              <i className="fa-solid fa-bell pe-1"></i>Thông báo
            </li>
            <li
              className="list-group-item text-start text-danger"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-to-bracket pe-1"></i>
              Đăng xuất
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

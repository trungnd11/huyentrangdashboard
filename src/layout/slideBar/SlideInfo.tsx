import avatar from "../../statics/avatar/avatar-1.jpg";

export default function SlideInfo() {
  return (
    <div className="slide-info p-3">
      <div className="avatar">
        <div className="status-active"></div>
        <img src={avatar} alt="1" />
      </div>
      <div className="name mt-3">
        <p>Huyen Trang Tran</p>
      </div>
    </div>
  );
}

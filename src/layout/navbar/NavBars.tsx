import logo from "../../statics/logo/logo.png";

export default function NavBars() {
  return (
    <div className="nav-bars py-1">
      <div className="logo">
        <img src={logo} alt="1" />
      </div>
      <div className="brand-spa mt-1">
        <h5 className="mb-0">Huyen Trang Tran Beauty Center Dashboard</h5>
      </div>
      <div className="logo">
        <img src={logo} alt="1" />
      </div>
    </div>
  );
}

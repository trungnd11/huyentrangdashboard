/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-12 col-md-6">
            {new Date().getFullYear()} © <a href="#">Huyen Trang Tran</a>
          </div>
          <div className="col-12 col-md-6">
            Design & Develop by <i className="fa-solid fa-heart me-1" />
            <a href="https://nguyendinhtrung.herokuapp.com/">A</a>{" "}
            <i className="fa-solid fa-heart" />
          </div>
        </div>
      </div>
    </div>
  );
}

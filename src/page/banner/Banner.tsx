import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetBanners } from "../../stores/banner/banners";
import { getBannerStore } from "../../stores/banner/bannerSelector";
import ModalCommom from "../../components/modal/ModalCommom";

export default function Banner() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch<any>();
  const banners = useSelector(getBannerStore);

  const FromBanner = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn ảnh</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <input type="file" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tiêu đề</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tiêu đề ảnh..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-2">
          <label htmlFor="">Nội dung</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập nội dung ảnh..."
          />
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    dispatch(fetBanners());
  }, [dispatch])
  return (
    <div className="banners-page">
      <div className="row mt-3">
        <div className="col-12 col-md-6 col-lg-3">
          <button
            className="btn btn-primary"
            onClick={() => setModalShow(true)}
          >
            Thêm ảnh mới
          </button>
        </div>
      </div>
      <div className="row">
        {!banners.loading &&
          banners.banners.map((item) => (
            <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
              <Card img={item.img} title={item.title} content={item.content} />
            </div>
          ))}
      </div>
      <ModalCommom
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Thêm ảnh mới"
        handleClick={() => console.log("hello")}
      >
        {FromBanner}
      </ModalCommom>
    </div>
  );
}

import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { createBanners, fetBanners } from "../../stores/banner/banners";
import { getBannerStore } from "../../stores/banner/bannerSelector";
import ModalCommom from "../../components/modal/ModalCommom";

interface BannerType {
  _id: string,
  img: string,
  title: string,
  content: string
}

export default function Banner() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch<any>();
  const banners = useSelector(getBannerStore);
  const [banner, setBanner] = useState<BannerType>({
    img: "",
    title: "",
    content: "",
    _id: ""
  });

  const handleCreateBanner = () => {
    dispatch(createBanners({
      img: banner.img,
      title: banner.title,
      content: banner.content
    }));
    setModalShow(false);
  } 

  const FromBanner = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn ảnh</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <FileBase64
            value={banner?.img}
            onDone={(file: any) =>
              setBanner((pre) => ({ ...pre, img: file.base64 }))
            }
          />
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
            value={banner?.title}
            onChange={(e) =>
              setBanner((pre) => ({ ...pre, title: e.target.value }))
            }
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
            value={banner?.content}
            onChange={(e) =>
              setBanner((pre) => ({ ...pre, content: e.target.value }))
            }
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
        handleClick={handleCreateBanner}
      >
        {FromBanner}
      </ModalCommom>
    </div>
  );
}

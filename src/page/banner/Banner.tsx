import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBanners,
  fetBanners,
  updateBanners,
} from "../../stores/banner/banners";
import Card from "../../components/card/Card";
import { getBannerStore } from "../../stores/banner/bannerSelector";
import ModalCommom from "../../components/modal/ModalCommom";
import { BannerModel } from "../../model/BannerModel"
import Alert, { SweetAlertComfirm } from "../../components/alert/Alert";
import { deleteBanner } from "../../api/bannerApi";
import { deleteImageToFireBase, uploadImageToFireBase } from "../../firebase/uploadImage";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";


export default function Banner() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch<any>();
  const banners = useSelector(getBannerStore);
  const [status, setStatus] = useState("Create");
  const [banner, setBanner] = useState<BannerModel>({
    img: "",
    title: "",
    content: "",
    id: "",
  });
  const [image, setImage] = useState<any>();

  const handleCreateBanner = () => {
    if (!image) {
      Alert("error", "Vui lòng chọn ảnh");
      throw new Error("inValid");
    }
    const saveToDataBase = (imgUrl: string) => {
      try {
        dispatch(
          createBanners({
            img: imgUrl,
            title: banner.title,
            content: banner.content,
          })
        );
        setImage(null);
        setBanner({
          img: "",
          title: "",
          content: "",
          id: "",
        });
        setModalShow(false);
        Alert("success", "Thêm mới ảnh thành công");
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    };
  
    setModalShow(false);
    uploadImageToFireBase("banner", image, (url: string) =>
      saveToDataBase(url)
    );
  };

  const handleEditBanner = (banners: BannerModel) => {
    setStatus("Update");
    const { img, title, content, id } = banners;
    setBanner({
      img,
      title,
      content,
      id,
    });
    setModalShow(true);
  };

  const updateBanner = () => {
    const updateToDataBase = (url: string) => {
      try {
        dispatch(
          updateBanners({
            ...banner,
            img: url,
          })
        );
        setImage(null);
        setBanner({
          img: "",
          title: "",
          content: "",
          id: "",
        });
        setModalShow(false);
        Alert("success", "Cập nhật ảnh thành công");
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    };

    const updateNotImage = () => {
      try {
        dispatch(updateBanners(banner));
        setImage(null);
        setBanner({
          img: "",
          title: "",
          content: "",
          id: "",
        });
        setModalShow(false);
        Alert("success", "Cập nhật ảnh thành công");
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    };
  
    setModalShow(false);
    image
      ? uploadImageToFireBase("banner", image, (url: string) =>
          updateToDataBase(url)
        )
      : updateNotImage();
  };

  const handleDeleteBanner = (banner: BannerModel) => {
    const deleteBanners = async () => {
      try {
        await deleteBanner(banner);
        Alert("error", "Xoá ảnh thành công");
        deleteImageToFireBase(banner.img);
        dispatch(fetBanners());
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    };
    SweetAlertComfirm(
      "Xác nhận",
      `Bạn chắc chắn xoá ảnh ${banner.title}`,
      deleteBanners
    );
  };

  const handleChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const FromBanner = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn ảnh</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <div className="filebase64-upload">
            {banner.img || image ? (
              <div className="img-update mb-3">
                <img
                  src={(image && URL.createObjectURL(image)) || banner.img}
                  alt={banner.title}
                />
              </div>
            ) : null}
            <input
              type="file"
              className="form-control"
              onChange={(e: any) => {
                console.log(e.target.files[0]);
                handleChangeImg(e);
              }}
            />
          </div>
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
          <textarea
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
    document.title = "Admin - Ảnh bìa";
    dispatch(fetBanners());
  }, [dispatch]);
  return (
    <div className="container-fluid">
      <div className="banners-page">
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-3">
            <ButtonCreated handleClick={() => {
              setStatus("Create");
              setModalShow(true);
            }}>
              Thêm ảnh mới
            </ButtonCreated>
          </div>
        </div>
        <div className="row">
          {!banners.loading &&
            banners.banners.map((item) => (
              <div className="col-12 col-md-6 col-lg-4 mt-3" key={item.id}>
                <Card
                  img={item.img}
                  title={item.title}
                  content={item.content}
                  handleEdit={() => handleEditBanner(item)}
                  handleDelete={() => handleDeleteBanner(item)}
                />
              </div>
            ))}
        </div>
        <ModalCommom
          show={modalShow}
          onHide={() => {
            setImage(null);
            setBanner({
              img: "",
              title: "",
              content: "",
              id: "",
            });
            setModalShow(false);
          }}
          title={status === "Create" ? "Thêm ảnh mới" : "Cập nhật ảnh"}
          handleClick={status === "Create" ? handleCreateBanner : updateBanner}
        >
          {FromBanner}
        </ModalCommom>
      </div>
    </div>
  );
}

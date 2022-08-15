import { useEffect, useState } from "react";
import { getExperts } from "../../api/expertApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Card from "../../components/card/Card";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";

interface ExpertType {
  _id: string,
  avatar: string
  name: string
  positon: string
  description: string
  linkFb: string
  linkInsta: string
  linkZalo: string
  linkMess: string
}

export default function Expert() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const [image, setImage] = useState<any>();
  const { data, loading } = useFetch(getExperts);

  const handleEditExpert = (expert: ExpertType) => {
    setStatus("Update");
    setModalShow(true);
  };

  const handleChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const FromExpert = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn avatar</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <div className="filebase64-upload">
            {image ? (
              <div className="img-update mb-3">
                <img src={image && URL.createObjectURL(image)} alt={``} />
              </div>
            ) : null}
            <input
              type="file"
              className="form-control"
              onChange={handleChangeImg}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Họ tên</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ tên..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chức vụ</label>
        </div>
        <div className="col-12 col-md-10">
          <input className="form-control" placeholder="Nhập chức vụ..." />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link facebook</label>
        </div>
        <div className="col-12 col-md-10">
          <input className="form-control" placeholder="Nhập link facebook..." />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link Zalo</label>
        </div>
        <div className="col-12 col-md-10">
          <input className="form-control" placeholder="Nhập link zalo..." />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link messenger</label>
        </div>
        <div className="col-12 col-md-10">
          <input className="form-control" placeholder="Nhập messenger..." />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link Instagram</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            className="form-control"
            placeholder="Nhập link instagram..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả thêm</label>
        </div>
        <div className="col-12 col-md-10">
          <textarea className="form-control" placeholder="Nhập mô tả..." />
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    document.title = "Admin - Chuyên gia";
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="expert-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated
                handleClick={() => {
                  setStatus("Create");
                  setModalShow(true);
                }}
              >
                Thêm chuyên gia mới
              </ButtonCreated>
            </div>
          </div>
          <div className="row">
            {!loading &&
              data.map((item: ExpertType) => (
                <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
                  <Card
                    img={item.avatar}
                    title={item.positon}
                    content={item.description}
                    linkZalo={item.linkZalo}
                    linkFb={item.linkFb}
                    linkInsta={item.linkInsta}
                    linkInMess={item.linkMess}
                    handleEdit={handleEditExpert}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ModalCommom
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        title={
          status === "Create" ? "Thêm chuyên gia mới" : "Cập nhật chuyên gia"
        }
      >
        { FromExpert }
      </ModalCommom>
    </>
  );
}

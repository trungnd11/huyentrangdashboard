import { useState } from "react";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ModalCommom from "../../components/modal/ModalCommom";
import TextEditor from "../../components/textEdit/TextEditor";

export default function Blog() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");

  const FormBlog = (
    <div className="form-blog">
      <div className="row">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tiêu để</label>
        </div>
        <div className="col-12 col-md-10">
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Nội dung</label>
        </div>
        <div className="col-12 col-md-10">
          <TextEditor />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="container-fluid">
        <div className="blog-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated
                handleClick={() => {
                  setStatus("Create");
                  setModalShow(true);
                }}
              >
                Đăng Blog
              </ButtonCreated>
            </div>
          </div>
        </div>
      </div>
      <ModalCommom
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        title={status === "Create" ? "Đăng blog mới" : "Cập nhật blog"}
      >
        {FormBlog}
      </ModalCommom>
    </>
  );
}

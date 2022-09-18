import { useCallback, useEffect, useState } from "react";
import { getBlogs } from "../../api/blogsApi";
import Alert from "../../components/alert/Alert";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Card from "../../components/card/Card";
import ModalCommom from "../../components/modal/ModalCommom";
import TextEditor from "../../components/textEdit/TextEditor";
import { BlogModel } from "../../model/BlogsModel";

export default function Blog() {
  const [modalShow, setModalShow] = useState(false);
  const [blogs, setBlogs] = useState<BlogModel[]>();
  const [status, setStatus] = useState("Create");

  const handleChangeTextEdit = useCallback(
    (text: string) => {
      console.log(text);
    },
    [],
  );

  const handleEditBlog = useCallback((item: BlogModel) => {
    setModalShow(true);
    console.log("OKkkk");
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs("3");
      setBlogs(res.data);
    } catch (error) {
      Alert("error", "Lỗi hệ thống");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const FormBlog = (
    <div className="form-blog">
      <div className="row">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tiêu để</label>
        </div>
        <div className="col-12 col-md-10">
          <input type="text" className="form-control" placeholder="Nhập tiêu đề bài đăng" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Nội dung</label>
        </div>
        <div className="col-12 col-md-10">
          <TextEditor onEdit={(text: string) => handleChangeTextEdit(text)} />
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
                Đăng bài
              </ButtonCreated>
            </div>
          </div>
          <div className="row mt-3">
            {blogs &&
              blogs.map((item) => (
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                  <Card
                    title={item.title}
                    handleEdit={() => handleEditBlog(item)}
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
        title={status === "Create" ? "Đăng bài mới" : "Cập nhật blog"}
        size="xl"
      >
        {FormBlog}
      </ModalCommom>
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import { getAbouts, updateAbout } from "../../api/aboutApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import useFetch from "../../customHook/useFetch";
import { AboutModel } from "../../model/AboutModel";
import ItemList from "../../components/list/ItemList";
import Alert, { RemoveAlert } from "../../components/alert/Alert";
import ModalCommom from "../../components/modal/ModalCommom";
import Input from "../../components/input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextEditor from "../../components/textEdit/TextEditor";
import { deleteImageToFireBase, uploadImageToFireBase } from "../../firebase/uploadImage";

export default function About() {
  const { item, loading, setReset } = useFetch(getAbouts);
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const [image, setImage] = useState<any>();

  const handleDelete = () => {
    Alert("error", "Thông tin này chỉ có thể sửa")
  };

  const handleChangeTextEdit = useCallback((text: string) => {
    console.log(text);
  }, []);

  const handleChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const fetCreateNewAbout = (value: AboutModel, reset: any) => {

  }

  const fetUpdateAbout = (value: AboutModel, reset: any) => {
    const savaToDataBaseNotImage = async () => {
      try {
        await updateAbout(value);
        RemoveAlert();
        Alert("success", "Cập nhật thành công");
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    };

    const saveToDatabase = async (urlImage: string) => {
      try {
        await updateAbout({
          ...value,
          avatar: urlImage,
        });
        RemoveAlert();
        Alert("success", "Cập nhật thành công");
        setReset((pre) => !pre);
        validate.values.avatar && deleteImageToFireBase(validate.values.avatar);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    };
    setModalShow(false);
    image
      ? uploadImageToFireBase("about", image, (url: string) =>
          saveToDatabase(url)
        )
      : savaToDataBaseNotImage();
  };

  const handleSubmit = (value: AboutModel, reset: any) => {
    status === "Create"
      ? fetCreateNewAbout(value, reset)
      : fetUpdateAbout(value, reset);
  };

  const validate = useFormik({
    initialValues: {
      id: "",
      avatar: "",
      title: "",
      description1: "",
      description2: "",
      description3: "",
      description4: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
    }),
    onSubmit: (value, resetForm) => {
      setModalShow(false);
      handleSubmit(value, resetForm);
    },
  });

  useEffect(() => {
    document.title = "Admin - Thông tin chính";
  }, []);

  const FromAbout = (
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
                <img
                  src={
                    (image && URL.createObjectURL(image))
                  }
                  alt={``}
                />
              </div>
            ) : (
              <div className="img-update mb-3">
                <img
                  src={
                    validate.values.avatar
                  }
                  alt={``}
                />
              </div>
            )}
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
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <div className="filebase64-upload">
            <Input
              name="title"
              value={validate.values.title}
              className="form-control"
              placeholder="Nhập mô tả..."
              onChange={validate.handleChange}
              isValid={
                validate.errors.title && validate.touched.title ? true : false
              }
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            textarea
            name="description1"
            value={validate.values.description1}
            type="text"
            className="form-control"
            placeholder="Nhập mô tả..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.description1 && validate.touched.description1
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            textarea
            name="description2"
            value={validate.values.description2}
            className="form-control"
            placeholder="Nhập mô tả..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.description2 && validate.touched.description2
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            textarea
            name="description3"
            value={validate.values.description3}
            className="form-control"
            placeholder="Nhập mô tả...."
            onChange={validate.handleChange}
            isValid={
              validate.errors.description3 && validate.touched.description3
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            textarea
            name="description4"
            value={validate.values.description4}
            className="form-control"
            placeholder="Nhập mô tả..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.description4 && validate.touched.description4
                ? true
                : false
            }
          />
        </div>
      </div>
    </form>
  );

  const FromDescriptionAbout = (
    <div className="row">
      <div className="col-12">
        <TextEditor onEdit={(text: string) => handleChangeTextEdit(text)} />
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="about-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated handleClick={() => {
                setStatus("Create");
                setModalShow(true);
              }}>Thêm bài viết mới</ButtonCreated>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {!loading && (
                <ItemList
                  img={item?.avatar}
                  title={item?.title}
                  description={[
                    item?.description1,
                    item?.description2,
                    item?.description3,
                    item?.description4,
                  ]}
                  handleDelete={handleDelete}
                  handleEdit={() => {
                    setModalShow(true);
                    setStatus("Update");
                    validate.setFieldValue("id", item?.id);
                    validate.setFieldValue("avatar", item?.avatar);
                    validate.setFieldValue("title", item?.title);
                    validate.setFieldValue("description1", item?.description1);
                    validate.setFieldValue("description2", item?.description2);
                    validate.setFieldValue("description3", item?.description3);
                    validate.setFieldValue("description4", item?.description4);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalCommom
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          validate.resetForm();
          setImage(null);
        }}
        title={status === "Create" ? "Thêm bài viết mới" : "Cập nhật thông tin"}
        type="submit"
        validation={validate.handleSubmit}
      >
        {status === "Create" ? FromDescriptionAbout : FromAbout}
      </ModalCommom>
    </>
  );
}

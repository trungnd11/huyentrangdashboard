import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExperts, deleteExperts, getExperts, updateExperts } from "../../api/expertApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Card from "../../components/card/Card";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { ExpertModel } from "../../model/ExpertModel";
import Input from "../../components/input/Input";
import Alert, { RemoveAlert, SweetAlertComfirm } from "../../components/alert/Alert";
import { deleteImageToFireBase, uploadImageToFireBase } from "../../firebase/uploadImage";

export default function Expert() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const [image, setImage] = useState<any>();
  const { data, loading, setReset } = useFetch(getExperts);

  const handleEditExpert = (expert: ExpertModel) => {
    setStatus("Update");
    setModalShow(true);
    validate.setFieldValue("_id", expert._id);
    validate.setFieldValue("avatar", expert.avatar);
    validate.setFieldValue("name", expert.name);
    validate.setFieldValue("positon", expert.positon);
    validate.setFieldValue("linkFb", expert.linkFb);
    validate.setFieldValue("linkInsta", expert.linkInsta);
    validate.setFieldValue("linkMess", expert.linkMess);
    validate.setFieldValue("linkZalo", expert.linkZalo);
    validate.setFieldValue("description", expert.description);
  };

  const handleChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      validate.setFieldValue("avatar", "");
    }
  };

  const fetCreateExpert = (value: ExpertModel, reset: any) => {
    if (!image) {
      Alert("error", "Vui lòng chọn ảnh");
      return;
    }
    const saveToDataBase = async (urlImage: string) => {
      try {
        await createExperts({
          avatar: urlImage,
          name: value.name,
          positon: value.positon,
          linkFb: value.linkFb,
          linkInsta: value.linkInsta,
          linkMess: value.linkMess,
          linkZalo: value.linkZalo,
          description: value.description
        });
        RemoveAlert();
        Alert("success", "Thêm mới thành công");
        setReset(pre => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    }

    setModalShow(false);
    uploadImageToFireBase("expert", image, (url: string) =>
      saveToDataBase(url)
    );

  };

  const fetUpdateExpert = (value: ExpertModel, reset: any) => {
    const savaToDataBaseNotImage = async () => {
      try {
        await updateExperts(value);
        RemoveAlert();
        Alert("success", "Cập nhật thành công");
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    }

    const saveToDatabase = async (urlImage: string) => {
      try {
        await updateExperts({
          ...value,
          avatar: urlImage,
        });
        RemoveAlert();
        Alert("success", "Cập nhật thành công");
        deleteImageToFireBase(validate.values.avatar.toString());
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    }
    setModalShow(false);
    image
      ? uploadImageToFireBase("expert", image, (url: string) =>
        saveToDatabase(url)
        )
      : savaToDataBaseNotImage();
  };

  const handleSubmit = (value: ExpertModel, reset: any) => {
    status === "Create"
      ? fetCreateExpert(value, reset)
      : fetUpdateExpert(value, reset);
  };

  const handleDeleteExprt = (id: string | undefined, image: string) => {
    const fetDeleteExpert = async () => {
      try {
        id && await deleteExperts(id);
        Alert("success", "Đã xoá thành công");
        deleteImageToFireBase(image);
        setReset(pre => !pre);
      } catch (error: any) {
        Alert("error", error.response.statusText);
      }
    }

    SweetAlertComfirm("Xác nhận", "Xoá vĩnh viễn người này này", () => fetDeleteExpert());
  }

  const validate = useFormik({
    initialValues: {
      _id: "",
      avatar: "",
      name: "",
      positon: "",
      description: "",
      linkFb: "",
      linkInsta: "",
      linkZalo: "",
      linkMess: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      positon: Yup.string().required(),
    }),
    onSubmit: (value, resetForm) => {
      handleSubmit(value, resetForm);
    },
  });

  const FromExpert = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn avatar</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <div className="filebase64-upload">
            {image && (
              <div className="img-update mb-3">
                <img
                  src={
                    validate.values.avatar ||
                    (image && URL.createObjectURL(image))
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
        </div>
        <div className="col-12 col-md-10">
          <Input
            type="text"
            className="form-control"
            placeholder="Nhập họ tên..."
            name="name"
            value={validate.values.name}
            onChange={validate.handleChange}
            isValid={
              validate.errors.name && validate.touched.name ? true : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chức vụ</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            className="form-control"
            placeholder="Nhập chức vụ..."
            name="positon"
            value={validate.values.positon}
            onChange={validate.handleChange}
            isValid={
              validate.errors.positon && validate.touched.positon ? true : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link facebook</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            className="form-control"
            placeholder="Nhập link facebook..."
            name="linkFb"
            value={validate.values.linkFb}
            onChange={validate.handleChange}
            isValid={
              validate.errors.linkFb && validate.touched.linkFb ? true : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link Zalo</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            className="form-control"
            placeholder="Nhập link zalo..."
            name="linkZalo"
            value={validate.values.linkZalo}
            onChange={validate.handleChange}
            isValid={
              validate.errors.linkZalo && validate.touched.linkZalo
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link messenger</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            className="form-control"
            placeholder="Nhập messenger..."
            name="linkMess"
            value={validate.values.linkMess}
            onChange={validate.handleChange}
            isValid={
              validate.errors.linkMess && validate.touched.linkMess
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Link Instagram</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            className="form-control"
            placeholder="Nhập link instagram..."
            name="linkInsta"
            value={validate.values.linkInsta}
            onChange={validate.handleChange}
            isValid={
              validate.errors.linkInsta && validate.touched.linkInsta
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả thêm</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            textarea
            className="form-control"
            placeholder="Nhập mô tả..."
            name="description"
            value={validate.values.description}
            onChange={validate.handleChange}
            isValid={
              validate.errors.description && validate.touched.description
                ? true
                : false
            }
          />
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
              data.map((item: ExpertModel) => (
                <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
                  <Card
                    img={item.avatar}
                    title={item.positon}
                    content={item.description}
                    linkZalo={item.linkZalo}
                    linkFb={item.linkFb}
                    linkInsta={item.linkInsta}
                    linkMess={item.linkMess}
                    handleEdit={() => handleEditExpert(item)}
                    handleDelete={() => handleDeleteExprt(item._id, item.avatar)}
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
          setImage(null);
          validate.resetForm();
        }}
        title={
          status === "Create" ? "Thêm chuyên gia mới" : "Cập nhật chuyên gia"
        }
        type="submit"
        validation={validate.handleSubmit}
      >
        {FromExpert}
      </ModalCommom>
    </>
  );
}

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { createExperience, deleteExperience, getExperience, updateExperience } from "../../api/experienceApi";
import Alert, { RemoveAlert, SweetAlertComfirm } from "../../components/alert/Alert";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Input from "../../components/input/Input";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { ExperienceModel } from "../../model/ExperienceModel";

export default function Experience() {
  const { data, loading, setReset } = useFetch(getExperience);
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");

  const fetCreateExperience = async (value: ExperienceModel, resetFomr: any) => {
    try {
      await createExperience({
        name: value.name,
      });
      RemoveAlert();
      Alert("success", "Thêm mới thành công");
      setReset((pre) => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const fetUpdateExperience = async (value: ExperienceModel, resetFomr: any) => {
    try {
      await updateExperience(value);
      RemoveAlert();
      Alert("success", "Cập nhật thành công");
      setReset((pre) => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const handleSubmit = (value: ExperienceModel, reset: any) => {
    Alert("loading", "Vui lòng chờ");
    status === "Create"
      ? fetCreateExperience(value, reset)
      : fetUpdateExperience(value, reset);
  };

  const handleDeleteExperience = (id: string | undefined) => {
    const fetDeleteExperience = async () => {
      Alert("loading", "Vui lòng chờ");
      try {
        id && (await deleteExperience(id));
        RemoveAlert();
        Alert("success", "Đã xoá thành công");
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    };

    SweetAlertComfirm("Xác nhận", "Xoá vĩnh viễn kinh nghiệm này", () =>
      fetDeleteExperience()
    );
  }

  const validate = useFormik({
    initialValues: {
      _id: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: (value, resetForm) => {
      setModalShow(false);
      handleSubmit(value, resetForm);
    },
  });

  const FormPhone = (
    <div className="form-submit">
      <div className="row mt-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Kinh nghiệm</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="name"
            value={validate.values.name}
            type="text"
            className="form-control"
            placeholder="Nhập kinh nghiệm..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.name && validate.touched.name ? true : false
            }
          />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    document.title = "Admin - Kinh nghiệm";
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="experience-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated handleClick={() => {
                setStatus("Create");
                setModalShow(true);
              }}>Thêm kinh nghiệm mới</ButtonCreated>
            </div>
          </div>
          <div className="row">
            {!loading &&
              data?.map((item: ExperienceModel) => (
                <div className="col-12 col-lg-6 mt-3" key={item._id}>
                  <ItemList
                    title={item.name}
                    content={`Ngày tạo: ${item.updatedAt}`}
                    handleEdit={() => {
                      setStatus("Update");
                      validate.setFieldValue("_id", item._id);
                      validate.setFieldValue("name", item.name);
                      setModalShow(true);
                    }}
                    handleDelete={() => handleDeleteExperience(item._id)}
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
          validate.resetForm();
        }}
        title={status === "Create" ? "Thêm kinh nghiệm mới" : "Cập nhật kinh nghiệm"}
        type="submit"
        validation={validate.handleSubmit}
      >
        {FormPhone}
      </ModalCommom>
    </>
  );
}

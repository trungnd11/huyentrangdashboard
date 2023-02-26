import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPhone, deletePhone, getPhone, updatePhone } from "../../api/phoneApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { PhoneModel } from "../../model/PhoneModel";
import Alert, { RemoveAlert, SweetAlertComfirm } from "../../components/alert/Alert";
import Input from "../../components/input/Input";

export default function PhoneNumber() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { data, loading, setReset } = useFetch(getPhone);

  const fetCreatePhone = async (value: PhoneModel, resetFomr: any) => {
    try {
      await createPhone({
        nameUser: value.nameUser,
        phoneNumber: value.phoneNumber,
        position: value.position,
      });
      RemoveAlert();
      Alert("success", "Thêm mới thành công");
      setReset((pre) => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const fetUpdatePhone = async (value: PhoneModel, resetFomr: any) => {
    try {
      await updatePhone(value);
      RemoveAlert();
      Alert("success", "Cập nhật thành công");
      setReset((pre) => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const handleSubmit = (value: PhoneModel, reset: any) => {
    Alert("loading", "Vui lòng chờ");
    status === "Create"
      ? fetCreatePhone(value, reset)
      : fetUpdatePhone(value, reset);
  };

  const handleDeletePhone = (id: string | undefined) => {
    const fetDeleteAddress = async () => {
      Alert("loading", "Vui lòng chờ");
      try {
        id && (await deletePhone(id));
        RemoveAlert();
        Alert("success", "Đã xoá thành công");
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    };

    SweetAlertComfirm("Xác nhận", "Xoá vĩnh viễn số điện thoại này", () =>
      fetDeleteAddress()
    );
  };

  const validate = useFormik({
    initialValues: {
      id: "",
      nameUser: "",
      phoneNumber: 0,
      position: "",
    },
    validationSchema: Yup.object({
      nameUser: Yup.string().required(),
      phoneNumber: Yup.string()
        .required()
        .matches(/^[0-9]+$/)
        .min(9)
        .max(10),
      position: Yup.string().required(),
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
          <label htmlFor="">Số điện thoại</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="phoneNumber"
            value={validate.values.phoneNumber}
            type="number"
            className="form-control"
            placeholder="Nhập số diện thoại..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.phoneNumber && validate.touched.phoneNumber
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Họ tên</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="nameUser"
            value={validate.values.nameUser}
            type="text"
            className="form-control"
            placeholder="Nhập họ tên..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.nameUser && validate.touched.nameUser
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chức vụ</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="position"
            value={validate.values.position}
            type="text"
            className="form-control"
            placeholder="Nhập chức vụ..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.position && validate.touched.position
                ? true
                : false
            }
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="address-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated
                handleClick={() => {
                  setStatus("Create");
                  setModalShow(true);
                }}
              >
                Thêm số điện thoại mới
              </ButtonCreated>
            </div>
          </div>
          <div className="row">
            {!loading &&
              data.map((item: PhoneModel) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <ItemList
                    key={item.id}
                    phone={{
                      phoneNumber: item.phoneNumber,
                      nameUser: item.nameUser,
                      position: item.position,
                    }}
                    handleEdit={() => {
                      setModalShow(true);
                      setStatus("Update");
                      validate.setFieldValue("phoneNumber", item.phoneNumber);
                      validate.setFieldValue("nameUser", item.nameUser);
                      validate.setFieldValue("position", item.position);
                      validate.setFieldValue("id", item.id);
                    }}
                    handleDelete={() => handleDeletePhone(item.id)}
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
        title={status === "Create" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
        type="submit"
        validation={validate.handleSubmit}
      >
        {FormPhone}
      </ModalCommom>
    </>
  );
}

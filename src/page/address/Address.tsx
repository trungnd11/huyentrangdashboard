import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAddress, deleteAddress, getAddress, updateAddress } from "../../api/addressApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { AddressModel } from "../../model/AddressModel";
import Input from "../../components/input/Input";
import Alert, { RemoveAlert, SweetAlertComfirm } from "../../components/alert/Alert";

export default function Address() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { data, loading, setReset } = useFetch(getAddress);

  const fetCreateAddress = async (value: AddressModel, resetFomr: any) => {
    try {
      await createAddress({
        apartmentNumber: value.apartmentNumber,
        commune: value.commune,
        conscious: value.conscious,
        district: value.district,
      });
      RemoveAlert();
      Alert("success", "Thêm mới thành công");
      setReset((pre) => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const fetUpdateAddress = async (value: AddressModel, resetFomr: any) => {
    try {
      await updateAddress(value);
      RemoveAlert();
      Alert("success", "Cập nhật thành công");
      setReset(pre => !pre);
    } catch (error: any) {
      RemoveAlert();
      Alert("error", error.response.statusText);
    }
  };

  const handleSubmit = (value: AddressModel, reset: any) => {
    Alert("loading", "Vui lòng chờ");
    status === "Create" ? fetCreateAddress(value, reset) : fetUpdateAddress(value, reset);
  };

  const handleDeleteAddress = (id: string | undefined) => {
    const fetDeleteAddress = async () => {
      Alert("loading", "Vui lòng chờ");
      try {
        id && await deleteAddress(id);
        RemoveAlert();
        Alert("success", "Đã xoá thành công");
        setReset((pre) => !pre);
      } catch (error: any) {
        RemoveAlert();
        Alert("error", error.response.statusText);
      }
    };

    SweetAlertComfirm("Xác nhận", "Xoá vĩnh viễn địa chỉ này", () => fetDeleteAddress());
  }

  const validate = useFormik({
    initialValues: {
      id: "",
      apartmentNumber: "",
      commune: "",
      conscious: "",
      district: "",
    },
    validationSchema: Yup.object({
      apartmentNumber: Yup.string().required(),
      commune: Yup.string().required(),
      conscious: Yup.string().required(),
      district: Yup.string().required(),
    }),
    onSubmit: (value, resetForm) => {
      setModalShow(false);
      handleSubmit(value, resetForm);
    },
  });

  const FromAddress = (
    <form className="form-submit">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Địa chỉ</label>
          <i className="fa-solid fa-asterisk" />
        </div>
        <div className="col-12 col-md-10">
          <div className="filebase64-upload">
            <Input
              textarea
              name="apartmentNumber"
              value={validate.values.apartmentNumber}
              className="form-control"
              placeholder="Nhập số nhà, tên đường,.."
              onChange={validate.handleChange}
              isValid={
                validate.errors.apartmentNumber && validate.touched.apartmentNumber
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Xã/ phường</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="commune"
            value={validate.values.commune}
            type="text"
            className="form-control"
            placeholder="Nhập xã, phường..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.commune && validate.touched.commune
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Quận / huyện</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="conscious"
            value={validate.values.conscious}
            className="form-control"
            placeholder="Nhập quận/ huyện..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.conscious && validate.touched.conscious
                ? true
                : false
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tỉnh / thành phố</label>
        </div>
        <div className="col-12 col-md-10">
          <Input
            name="district"
            value={validate.values.district}
            className="form-control"
            placeholder="Nhập tỉnh/ thành phố..."
            onChange={validate.handleChange}
            isValid={
              validate.errors.district && validate.touched.district
                ? true
                : false
            }
          />
        </div>
      </div>
    </form>
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
                Thêm địa chỉ mới
              </ButtonCreated>
            </div>
          </div>
          <div className="row">
            {!loading &&
              data.map((item: AddressModel, index: number) => (
                <div
                  key={item.id}
                  className={`col-12 col-md-6 col-lg-4 ${
                    index !== 0 && "mt-3 mt-lg-0"
                  }`}
                >
                  <ItemList
                    key={item.id}
                    address={{
                      apartmentNumber: item.apartmentNumber,
                      commune: item.commune,
                      conscious: item.conscious,
                      district: item.district,
                    }}
                    handleEdit={() => {
                      setModalShow(true);
                      setStatus("Update");
                      validate.setFieldValue(
                        "apartmentNumber",
                        item.apartmentNumber
                      );
                      validate.setFieldValue("commune", item.commune);
                      validate.setFieldValue("conscious", item.conscious);
                      validate.setFieldValue("district", item.district);
                      validate.setFieldValue("id", item.id);
                    }}
                    handleDelete={() => handleDeleteAddress(item.id)}
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
        {FromAddress}
      </ModalCommom>
    </>
  );
}

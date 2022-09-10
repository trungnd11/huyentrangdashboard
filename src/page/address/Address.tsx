import { useState } from "react";
import { getAddress } from "../../api/addressApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { AddressModel } from "../../model/AddressModel";

export default function Address() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { data, loading } = useFetch(getAddress);
  const [address, setAddress] = useState<AddressModel>({
    _id: "",
    apartmentNumber: "",
    commune: "",
    conscious: "",
    district: ""
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
            <textarea
              value={address.apartmentNumber}
              className="form-control"
              placeholder="Nhập số nhà, tên đường,.."
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Xã/ phường</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            value={address.commune}
            type="text"
            className="form-control"
            placeholder="Nhập xã, phường..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Quận / huyện</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            value={address.conscious}
            className="form-control"
            placeholder="Nhập quận/ huyện..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tỉnh / thành phố</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            value={address.district}
            className="form-control"
            placeholder="Nhập tỉnh/ thành phố..."
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
              data.map((item: AddressModel) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-4">
                  <ItemList
                    key={item._id}
                    address={{
                      apartmentNumber: item.apartmentNumber,
                      commune: item.commune,
                      conscious: item.conscious,
                      district: item.district,
                    }}
                    handleEdit={() => {
                      setModalShow(true);
                      setStatus("Update");
                      setAddress({
                        _id: item._id,
                        apartmentNumber: item.apartmentNumber,
                        commune: item.commune,
                        conscious: item.conscious,
                        district: item.district
                      })
                    }}
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
        title={status === "Create" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
      >
        {FromAddress}
      </ModalCommom>
    </>
  );
}

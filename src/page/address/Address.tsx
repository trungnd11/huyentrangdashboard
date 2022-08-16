import { useState } from "react";
import { getAddress } from "../../api/addressApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";

interface AddressModel {
  _id: string;
  apartmentNumber: string;
  commune: string;
  district: string;
  conscious: string;
}

export default function Address() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { data, loading } = useFetch(getAddress);

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
          <input className="form-control" placeholder="Nhập quận/ huyện..." />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tỉnh / thành phố</label>
        </div>
        <div className="col-12 col-md-10">
          <input
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
                Thêm chuyên gia mới
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

import { useState } from "react";
import { getPhone } from "../../api/phoneApi";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { PhoneModel } from "../../model/PhoneModel";

export default function PhoneNumber() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { data, loading } = useFetch(getPhone);

  console.log(loading && data);

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
                <div key={item._id} className="col-12 col-md-6 col-lg-4">
                  <ItemList
                    key={item._id}
                    phone={{
                      phoneNumber: item.phoneNumber,
                      nameUser: item.nameUser,
                      position: item.position,
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
        {}
      </ModalCommom>
    </>
  );
}

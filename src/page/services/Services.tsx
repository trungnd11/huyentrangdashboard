/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServicesByType } from "../../api/servicesApi";
import { getServiceType } from "../../api/serviceTypeApi";
import { TypeServiceModel } from "../../model/TypeServiceModel";
import Alert from "../../components/alert/Alert";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Card from "../../components/card/Card";
import ModalCommom from "../../components/modal/ModalCommom";
import useFetch from "../../customHook/useFetch";
import { ServiceModel } from "../../model/ServiceModel";


export default function Services() {
  const { type } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const [services, setServices] = useState({
    loading: true,
    data: [{
      description: "",
      name: "",
      serviceType: "",
      image: "",
      _id: "",
    }],
    error: ""
  });
  const { loading, data } = useFetch(getServiceType);
  const [service, setService] = useState<ServiceModel>();
  const [image, setImage] = useState<any>();

  const getServicesByTypes = async (typeService: { serviceType?: string }) => {
    try {
      const res = await getServicesByType(typeService);
      setServices(pre => ({
        ...pre,
        loading: false,
        data: res.data
      }));

    } catch (error) {
      Alert("error", "Lỗi hệ thống");
    }
  };

  const handleCreateService = () => {
    console.log(service);
  }

  const handleUpdateService = () => {
    console.log("Update");
  };

  const FromService = (
    <form className="form-service">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn loại dịch vụ</label>
        </div>
        <div className="col-12 col-md-10">
          <select
            className="form-control"
            name=""
            id=""
            onChange={(e: any) =>
              setService((pre: any) => ({
                ...pre,
                serviceType: e.target.value,
              }))
            }
          >
            <option value="">Chọn loại dịch vụ</option>
            {!loading &&
              data.map((item: TypeServiceModel) => (
                <option key={item._id} value={item._id}>
                  {item.serviceType}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn ảnh</label>
        </div>
        <div className="col-12 col-md-10">
          {service?.image || image ? (
            <div className="img-update mb-3">
              <img
                src={(image && URL.createObjectURL(image)) || service?.image}
                alt={service?.name}
              />
            </div>
          ) : null}
          <input
            type="file"
            className="form-control"
            onChange={(e: any) => {
              if (e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Tên dịch vụ</label>
        </div>
        <div className="col-12 col-md-10">
          <input
            type="text"
            className="form-control"
            value={service?.name}
            onChange={(e: any) =>
              setService((pre: any) => ({
                ...pre,
                name: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Mô tả</label>
        </div>
        <div className="col-12 col-md-10">
          <textarea
            className="form-control"
            value={service?.description}
            onChange={(e: any) =>
              setService((pre: any) => ({
                ...pre,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    document.title = `Dịch vụ - ${services.data[0].serviceType}`;
    getServicesByTypes({ serviceType: type });
  }, [type])

  return (
    <>
      <div className="container-fluid">
        <div className="services-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated
                handleClick={() => {
                  setStatus("Create");
                  setModalShow(true);
                }}
              >
                Thêm dịch vụ mới
              </ButtonCreated>
            </div>
          </div>
          <div className="row">
            {!services.loading &&
              services.data.map((item: ServiceModel) => (
                <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
                  <Card
                    img={item.image}
                    title={item.name}
                    content={item.description}
                    handleEdit={() => {
                      setStatus("Update");
                      setService(item);
                      setModalShow(true);
                    }}
                    handleDelete={() => alert("OK")}
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
          setService({
            description: "",
            name: "",
            serviceType: "",
            image: "",
            _id: "",
          });
        }}
        title={status === "Create" ? "Thêm dịch vụ mới" : "Cập nhật dịch vụ"}
        handleClick={status === "Create" ? handleCreateService : handleUpdateService}
      >
        {FromService}
      </ModalCommom>
    </>
  );
}

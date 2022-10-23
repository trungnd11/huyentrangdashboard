/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createService, getServicesByType, updateService } from "../../api/servicesApi";
import Alert from "../../components/alert/Alert";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import Card from "../../components/card/Card";
import ModalCommom from "../../components/modal/ModalCommom";
import { AlertMessage, AlertType, TypeModal } from "../../enum/Enum";
import { uploadImageToFireBase } from "../../firebase/uploadImage";
import { ServiceModel } from "../../model/ServiceModel";
import FormService from "./FormService";
import { validationForm } from "./Validate";

export default function Services() {
  const { type } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState(TypeModal.CREATE);
  const [services, setServices] = useState({
    loading: true,
    data: [
      {
        description: "",
        name: "",
        serviceType: "",
        image: "",
        _id: "",
      },
    ],
    error: "",
  });
  const [service, setService] = useState<ServiceModel>();
  const refForm = useRef<{ image: File }>();
  const [reset, setReset] = useState(false);

  const getServicesByTypes = async (typeService: { serviceType?: string }) => {
    try {
      const res = await getServicesByType(typeService);
      setServices((pre) => ({
        ...pre,
        loading: false,
        data: res.data,
      }));
    } catch (error) {
      Alert(AlertType.ERROR, AlertMessage.ERROR);
    }
  };

  const saveServiceToDataBase = async (service: ServiceModel, url: string, type: string) => {
    if (type === TypeModal.CREATE) {
      try {
        await createService({ ...service, image: url });
        Alert(AlertType.SUCCESS, AlertMessage.SUCCESS_CREATE);
        setModalShow(false);
        setReset((pre) => !pre);
      } catch (error) {
        setModalShow(false);
        Alert(AlertType.ERROR, AlertMessage.ERROR);
      }
    }
    else if (type === TypeModal.UPDATE) {
      try {
        await updateService({ ...service, image: url });
        Alert(AlertType.SUCCESS, AlertMessage.SUCCESS_UPDATE);
        setModalShow(false);
        setReset((pre) => !pre);
      } catch (error) {
        setModalShow(false);
        Alert(AlertType.ERROR, AlertMessage.ERROR);
      }
    }
  };

  const handleCreateService = () => {
    if (validationForm(service, refForm.current?.image)) {
      uploadImageToFireBase(
        `services-${type}`,
        refForm.current?.image,
        (url: string) => {
          service && saveServiceToDataBase(service, url, TypeModal.CREATE);
        }
      );
    }
  };

  const handleUpdateService = () => {
    if (service?.image && validationForm(service, service?.image)) {
      service &&
        saveServiceToDataBase(service, service.image, TypeModal.UPDATE);
    } else if (validationForm(service, refForm.current?.image)) {
      uploadImageToFireBase(
        `services-${type}`,
        refForm.current?.image,
        (url: string) => {
          service && saveServiceToDataBase(service, url, TypeModal.UPDATE);
        }
      );
    }
  };

  useEffect(() => {
    document.title = `Dịch vụ - ${services.data[0].serviceType}`;
    getServicesByTypes({ serviceType: type });
  }, [type, reset]);

  return (
    <>
      <div className="container-fluid">
        <div className="services-page">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-3">
              <ButtonCreated
                handleClick={() => {
                  setStatus(TypeModal.CREATE);
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
                      setStatus(TypeModal.UPDATE);
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
        title={
          status === TypeModal.CREATE ? "Thêm dịch vụ mới" : "Cập nhật dịch vụ"
        }
        handleClick={
          status === TypeModal.CREATE
            ? handleCreateService
            : handleUpdateService
        }
      >
        <FormService service={service} setService={setService} ref={refForm} />
      </ModalCommom>
    </>
  );
}

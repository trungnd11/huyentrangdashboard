/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useFetch from "../../customHook/useFetch";
import {
  getServiceType,
  createServiceType,
  deleteServiceType,
  updateServiceType,
} from "../../api/serviceTypeApi";
import { TypeServiceType } from "../../model/serviceTypeModel";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";
import ItemList from "../../components/list/ItemList";
import ModalCommom from "../../components/modal/ModalCommom";
import Alert, { SweetAlertComfirm } from "../../components/alert/Alert";
import { uploadImageToFireBase } from "../../firebase/uploadImage";

export default function TypeService() {
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("Create");
  const { loading, data } = useFetch(getServiceType);
  const [listTypeService, setListTypeService] = useState<any>();
  const [typeService, setTypeService] = useState<TypeServiceType>({
    _id: "",
    image: "",
    description: "",
    serviceType: ""
  });
  const [showImg, setShowImg] = useState<any>();

  const handleEditTypeService = (item: TypeServiceType) => {
    setStatus("Update");
    setTypeService(pre => ({
      image: item.image,
      serviceType: item.serviceType,
      description: item.description,
      _id: item._id
    }));
    setModalShow(true);
  };

  const handleDeleteTypeService = (item: TypeServiceType) => {
    const deleteTypeService = async () => {
      try {
        await deleteServiceType(item._id);
        Alert("error", "Xoá ảnh thành công");
        setListTypeService((pre: any) => pre.filter((type: TypeServiceType) => type._id !== item._id));
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    }

    SweetAlertComfirm(
      "Xác nhận",
      `Bạn chắc chắn xoá dịch vụ ${item.serviceType}`,
      deleteTypeService
    );
  };

  const handleChangeImg = (e: any) =>
    e.target.files[0] && setShowImg(e.target.files[0]);
  
  const handleCreateTypeService = () => {
    const saveToDataBase = async (imgUrl: string) => {
      try {
        const respone = await createServiceType({
          image: imgUrl,
          serviceType: typeService.serviceType,
          description: typeService.description
        });
        setModalShow(false);
        Alert("success", "Thêm mới ảnh thành công");
        setListTypeService((pre: any) => ([ ...pre, respone.data ]));
      } catch (error) {
        console.log(error);
        Alert("error", "Lỗi hệ thống");
      }
    };

    setModalShow(false);
    uploadImageToFireBase("Type-service", showImg, (url: string) =>
      saveToDataBase(url)
    );
  }

  const handleUpdateTypeService = () => {
    const updateToDataBase = async (urlImg: string) => {
      try {
        const res = await updateServiceType({
          ...typeService,
          image: urlImg
        });
        setModalShow(false);
        Alert("success", "Cập nhật ảnh thành công");
        const updateTypes = listTypeService.filter(
          (item: TypeServiceType) => res.data._id !== item._id
        );
        setListTypeService([
          ...updateTypes,
          res.data
        ]);
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    }

    const updateNotImage = async () => {
      try {
        const res = await updateServiceType(typeService);
        setModalShow(false);
        Alert("success", "Cập nhật ảnh thành công");
        const updateTypes = listTypeService.filter(
          (item: TypeServiceType) => res.data._id !== item._id
        );
        setListTypeService([...updateTypes, res.data]);
      } catch (error) {
        Alert("error", "Lỗi hệ thống");
      }
    }

    setModalShow(false);
    showImg
      ? uploadImageToFireBase("Type-service", showImg, (url: string) =>
          updateToDataBase(url)
        )
      : updateNotImage();
  };

  const FormServicesType = (
    <form className="from-serviceType">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Chọn ảnh</label>
        </div>
        <div className="col-12 col-md-10">
          {showImg || typeService.image ? (
            <div className="img-update mb-3">
              <img
                src={(showImg && URL.createObjectURL(showImg)) || typeService.image}
                alt={typeService.serviceType}
              />
            </div>
          ) : null}
          <input
            type="file"
            className="form-control"
            onChange={handleChangeImg}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <label htmlFor="">Loại dịch vụ</label>
          <i className="fa-solid fa-asterisk required" />
        </div>
        <div className="col-12 col-md-10">
          <input
            value={typeService.serviceType}
            type="text"
            className="form-control"
            onChange={(e) =>
              setTypeService((pre) => ({ ...pre, serviceType: e.target.value }))
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
            value={typeService.description}
            className="form-control"
            onChange={(e) =>
              setTypeService((pre) => ({ ...pre, description: e.target.value }))
            }
          />
        </div>
      </div>
    </form>
  );

   useEffect(() => {
     document.title = "Admin - Loại dịch vụ";
     !loading && setListTypeService(data);
   }, [data]);
  return (
    <>
      <div className="container-fluid">
        <div className="serviceType-page">
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
          <div className="list-serviceType">
            {listTypeService &&
              listTypeService.map((item: TypeServiceType) => (
                <ItemList
                  key={item._id}
                  img={item.image}
                  title={item.serviceType}
                  content={item.description}
                  handleEdit={() => handleEditTypeService(item)}
                  handleDelete={() => handleDeleteTypeService(item)}
                />
              ))}
          </div>
        </div>
      </div>
      <ModalCommom
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setTypeService({
            _id: "",
            image: "",
            description: "",
            serviceType: "",
          });
          setShowImg(null);
        }}
        title={status === "Create" ? "Thêm dịch vụ mới" : "Cập nhật dịch vụ"}
        handleClick={
          status === "Create"
            ? handleCreateTypeService
            : handleUpdateTypeService
        }
      >
        {FormServicesType}
      </ModalCommom>
    </>
  );
}

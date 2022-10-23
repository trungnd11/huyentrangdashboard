import { forwardRef, useImperativeHandle, useState } from "react";
import { getServiceType } from "../../api/serviceTypeApi";
import Label from "../../components/label/Label";
import useFetch from "../../customHook/useFetch";
import { ServiceModel } from "../../model/ServiceModel";
import { TypeServiceModel } from "../../model/TypeServiceModel";

type Props = {
  service: ServiceModel | undefined;
  setService: Function;
}

function FormService({ service, setService }: Props, ref: any) {
  const { loading, data } = useFetch(getServiceType);
  const [image, setImage] = useState<any>();

  useImperativeHandle(
    ref,
    () => ({
      image,
    }),
    [image]
  );

  return (
    <form className="form-service">
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <Label title="Chọn loại dịch vụ" required />
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
          <Label title="Chọn ảnh" required />
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
                setService((pre: ServiceModel) => ({ ...pre, image: "" }));
              }
            }}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-2">
          <Label title="Tên dịch vụ" required />
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
}

export default forwardRef(FormService);

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServicesByType } from "../../api/servicesApi";
import Card from "../../components/card/Card";

interface ServiceType {
  description: string;
  name: string;
  serviceType: string;
  image: string
  _id: string;
}

export default function Services() {
  const { type } = useParams();
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
  })

  const getServicesByTypes = async (typeService: { serviceType?: string }) => {
    try {
      const res = await getServicesByType(typeService);
      setServices(pre => ({
        ...pre,
        loading: false,
        data: res.data
      }));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = `Dịch vụ - ${services.data[0].serviceType}`;
    getServicesByTypes({ serviceType: type });
  }, [type])

  return <div className="container-fluid">
    <div className="services-page">
      <div className="row mt-3">
        <div className="col-12 col-md-6 col-lg-3">
          <button
            className="btn btn-success"
          >
            Thêm dịch vụ mới
          </button>
        </div>
      </div>
      <div className="row">
        {
          !services.loading && services.data.map((item: ServiceType)  => (
            <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
              <Card
                img={item.image}
                title={item.name}
                content={item.description}
              />
            </div>
          ))
        }
      </div>
    </div>
  </div>;
}

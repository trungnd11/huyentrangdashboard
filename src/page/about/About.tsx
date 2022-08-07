import { useEffect } from "react";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";

export default function About() {

  useEffect(() => {
    document.title = "Admin - Thông tin chính";
  }, []);

  return (
    <div className="container-fluid">
      <div className="about-page">
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-3">
            <ButtonCreated>Thêm thông tin mới</ButtonCreated>
          </div>
        </div>
      </div>
    </div>
  );
}

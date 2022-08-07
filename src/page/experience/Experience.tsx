import { useEffect } from "react";
import ButtonCreated from "../../components/buttoncreate/ButtonCreated";

export default function Experience() {

  useEffect(() => {
    document.title = "Admin - Kinh nghiệm";
  }, []);

  return (
    <div className="container-fluid">
      <div className="experience-page">
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-3">
            <ButtonCreated>Thêm kinh nghiệm mới</ButtonCreated>
          </div>
        </div>
      </div>
    </div>
  );
}

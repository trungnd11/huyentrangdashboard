import { NavLink } from "react-router-dom";

export default function SlideItem() {
  return (
    <div className="slide-item">
      <ul>
        <NavLink to="#" >
          <li>Ảnh Banner</li>
        </NavLink>
        <NavLink to="#">
          <li>Dịch vụ</li>
        </NavLink>
      </ul>
    </div>
  );
}

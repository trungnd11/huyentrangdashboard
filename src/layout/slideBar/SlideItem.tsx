import { NavLink } from "react-router-dom";
import { PageRouters } from "../../routers/allRouter";

export default function SlideItem() {
  return (
    <div className="slide-item">
      <ul>
        {PageRouters.map((router, index) => (
          <NavLink key={index} to={router.path}>
            <li>{ router.name }</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

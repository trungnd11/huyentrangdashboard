import { useState } from "react";
import { NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { PageRouters } from "../../routers/allRouter";
import useFetch from "../../customHook/useFetch";
import { getServiceType } from "../../api/serviceTypeApi";

export default function SlideItem(props: { onHide?: Function }) {
  const [open, setOpen] = useState(false);
  const { loading, data } = useFetch(getServiceType);
  const { onHide } = props;

  return (
    <div className="slide-item">
      <ul className="parents">
        {PageRouters.map((router, index) => (
          <div key={index}>
            {!router.children ? (
              <NavLink
                className="item"
                key={index}
                to={router.path}
                onClick={() => setOpen(false)}
              >
                <li onClick={() => onHide && onHide()}>{router.name}</li>
              </NavLink>
            ) : (
              <div>
                <div
                  className="d-flex justify-content-between item"
                  onClick={() => setOpen(!open)}
                >
                  <li className="text-white">{router.name}</li>
                  {open ? (
                    <i
                      className="fa-solid fa-angle-up pt-1 pe-3 text-white"
                      onClick={() => setOpen(!open)}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-angle-down pt-1 pe-3 text-white"
                      onClick={() => setOpen(!open)}
                    />
                  )}
                </div>
                <Collapse in={open}>
                  <ul className="ps-2">
                    {!loading &&
                      data.map((item: any, index: number) => (
                        <NavLink
                          className="item"
                          key={index}
                          to={`services/type-${item.id}`}
                        >
                          <li
                            className="ms-3"
                            onClick={() => onHide && onHide()}
                          >
                            {item.serviceType}
                          </li>
                        </NavLink>
                      ))}
                  </ul>
                </Collapse>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

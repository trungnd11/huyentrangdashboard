import { Navigate, Route, Routes } from "react-router-dom";
import { PageRouters } from "./allRouter";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/banner" />} />
      {PageRouters.map((router, index) => (
        <Route key={index} path={router.path} element={<router.component />} />
      ))}
    </Routes>
  );
}

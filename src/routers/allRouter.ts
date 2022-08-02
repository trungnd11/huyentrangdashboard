import { FC } from "react";
import About from "../page/about/About";
import Banner from "../page/banner/Banner";
import Experience from "../page/experience/Experience";
import Expert from "../page/expert/Expert";
import Services from "../page/services/Services";
import TypeService from "../page/typeService/TypeService";

interface RoutersType {
  name: string,
  path: string,
  component: FC
}

export const PageRouters: RoutersType[] = [
  {
    name: "Ảnh Banner",
    path: "/banner",
    component: Banner,
  },
  {
    name: "Thông tin chính",
    path: "/about",
    component: About,
  },
  {
    name: "Kinh nghiệm làm việc",
    path: "/experience",
    component: Experience,
  },
  {
    name: "Loại dịch vụ",
    path: "/type-services",
    component: TypeService,
  },
  {
    name: "Dịch vụ",
    path: "/services",
    component: Services,
  },
  {
    name: "Chuyên gia",
    path: "/experts",
    component: Expert,
  }
];
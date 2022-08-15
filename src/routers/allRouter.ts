import { FC } from "react";
import About from "../page/about/About";
import Address from "../page/address/Address";
import Banner from "../page/banner/Banner";
import Experience from "../page/experience/Experience";
import Expert from "../page/expert/Expert";
import PhoneNumber from "../page/phone/PhoneNumber";
import Services from "../page/services/Services";
import TypeService from "../page/typeService/TypeService";
interface RoutersType {
  name: string,
  path: string,
  component: FC,
  children?: boolean
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
    path: "/services/type-:type",
    component: Services,
    children: true,
  },
  {
    name: "Chuyên gia",
    path: "/experts",
    component: Expert,
  },
  {
    name: "Địa chỉ",
    path: "/address",
    component: Address,
  },
  {
    name: "Số điện thoại",
    path: "/phone",
    component: PhoneNumber,
  },
];

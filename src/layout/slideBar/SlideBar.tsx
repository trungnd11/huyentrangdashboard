import Banner from "../../page/banner/Banner";
import Content from "../content/Content";
import NavBars from "../navbar/NavBars";
import SlideInfo from "./SlideInfo";
import SlideItem from "./SlideItem";

export default function SlideBar() {
  return (
    <>
      <div className="slide-bar">
      <SlideInfo />
      <SlideItem />
      </div>
      <NavBars />
      <Content>
        <Banner />
      </Content>
    </>
  )
}

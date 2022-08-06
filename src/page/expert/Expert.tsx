import { getExperts } from "../../api/expertApi";
import Card from "../../components/card/Card";
import useFetch from "../../customHook/useFetch";

interface ExpertType {
  description: string
  linkFb: string
  linkInsta: string
  linkZalo: string
  linkMess: string
  name: string
  positon: string
  _id: string,
  avatar: string
}

export default function Expert() {
  const { data, loading } = useFetch(getExperts);
  return (
    <div className="container-fluid">
      <div className="expert-page">
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-3">
            <button className="btn btn-primary">Thêm chuyên gia mới</button>
          </div>
        </div>
        <div className="row">
          {!loading &&
            data.map((item: ExpertType) => (
              <div className="col-12 col-md-6 col-lg-4 mt-3" key={item._id}>
                <Card
                  img={item.avatar}
                  title={item.positon}
                  content={item.description}
                  linkZalo={item.linkZalo}
                  linkFb={item.linkFb}
                  linkInsta={item.linkInsta}
                  linkInMess={item.linkMess}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

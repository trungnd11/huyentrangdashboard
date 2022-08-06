import zalo from "../../statics/Icons/zalo.png";
import facebook from "../../statics/Icons/facebook.png";
import messenger from "../../statics/Icons/messenger.png";
import instagram from "../../statics/Icons/instagram.png";

export default function Card(prop: any) {
  const { img, title, content, ...rest } = prop;
  return (
    <div className="card h-100 card-style">
      <img src={img} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="description">
          <h5 className="card-title">{title || "Nhấn sửa để thêm tiêu đề"}</h5>
          <p className="card-text">{content || "Nhấn sửa để thêm nội dung"}</p>
        </div>
        <div className="social mt-2 text-center">
          {rest.linkFb && (
            <a href={rest.linkFb}>
              <img
                title="link Facebook"
                className="icon-img"
                src={facebook}
                alt="zalo icon"
              />
            </a>
          )}
          {rest.linkInsta && (
            <a href={rest.linkInsta}>
              <img
                title="link Instagram"
                className="icon-img"
                src={instagram}
                alt="zalo icon"
              />
            </a>
          )}
          {rest.linkMess && (
            <a href={rest.linkMess}>
              <img
                title="link Messenger"
                className="icon-img"
                src={messenger}
                alt="zalo icon"
              />
            </a>
          )}
          {rest.linkZalo && (
            <a href={rest.linkZalo}>
              <img
                title="link Zalo"
                className="icon-img"
                src={zalo}
                alt="zalo icon"
              />
            </a>
          )}
        </div>
      </div>
      <div className="text-center py-3 border-top">
        <button className="btn btn-success me-2 w-25" onClick={rest.handleEdit}>
          {rest.edit || "Sửa"}
        </button>
        <button className="btn btn-danger w-25" onClick={rest.handleDelete}>
          {rest.delete || "Xoá"}
        </button>
      </div>
    </div>
  );
}

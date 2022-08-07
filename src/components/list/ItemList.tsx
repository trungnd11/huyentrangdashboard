import image from "../../statics/avatar/avatar-1.jpg";

export default function ItemList(prop: { img?: string, title?: string, content?: string, handleEdit?: any, handleDelete?: any }) {
  const { img, title, content, handleEdit, handleDelete } = prop;
  return (
    <div className="item-list shadow mt-3">
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="img">
            <img src={img || image} alt="" />
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="h-100 d-flex justify-content-between flex-column">
            <div className="mt-3 mt-md-0">
              <h4>{ title }</h4>
              <p>
                { content }
              </p>
            </div>
            <div className="">
              <button
                className="btn btn-success me-2 w-25"
                onClick={handleEdit}
              >Sửa
              </button>
              <button
                className="btn btn-danger w-25"
                onClick={handleDelete}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

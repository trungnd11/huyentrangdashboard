
export default function Card(prop: any) {
  const { img, title, content, ...rest } = prop;
  return (
    <div className="card h-100 card-style">
      <img src={img} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="description">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-success me-2" onClick={rest.handleEdit}>
            {rest.edit || "Sửa"}
          </button>
          <button className="btn btn-danger" onClick={rest.handleDelete}>
            {rest.delete || "Xoá"}
          </button>
        </div>
      </div>
    </div>
  );
}

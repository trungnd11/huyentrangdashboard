
export default function Card(prop: { img?: string, title?: string, content?: string }) {
  return (
    <div className="card h-100 card-style">
      <img src={prop.img} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="description">
          <h5 className="card-title">{prop.title}</h5>
          <p className="card-text">{prop.content}</p>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-success me-2">Sửa</button>
          <button className="btn btn-danger">Xóa</button>
        </div>
      </div>
    </div>
  );
}

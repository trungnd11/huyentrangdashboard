import image from "../../statics/avatar/avatar-1.jpg";

export default function ItemList(prop: {
  img?: string;
  title?: string;
  content?: string;
  address?: {
    _id?: string;
    apartmentNumber: string;
    commune: string;
    district: string;
    conscious: string;
  };
  phone?: {
    phoneNumber: number;
    nameUser: string;
    position: string;
  };
  handleEdit?: any;
  handleDelete?: any;
}) {
  const { img, title, content, address, phone, handleEdit, handleDelete } = prop;
  return (
    <div className="item-list shadow mt-3 h-100">
      <div className="row h-100">
        {img && (
          <div className="col-12 col-md-3">
            <div className="img">
              <img src={img || image} alt="" />
            </div>
          </div>
        )}
        <div className={`col-12 ${address ? "col-md-12" : "col-md-9"}`}>
          <div className="h-100 d-flex justify-content-between flex-column">
            <div className="mt-3 mt-md-0">
              {address ? (
                <div className="mb-3">
                  <h4>{address.apartmentNumber}</h4>
                  <div>
                    <span>{address.commune}</span>
                    <span className="mx-2">{address.conscious}</span>
                    <span>{address.district}</span>
                  </div>
                </div>
              ) : phone ? (
                <div className="mb-3">
                  <h4>Số điện thoại: 0{phone.phoneNumber}</h4>
                  <div>
                    <h5>{phone.nameUser}</h5>
                    <p className="">{phone.position}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h4>{title}</h4>
                  <p>{content}</p>
                </>
              )}
            </div>
            <div className="">
              <button
                className="btn btn-success me-2 w-25"
                onClick={handleEdit}
              >
                Sửa
              </button>
              <button className="btn btn-danger w-25" onClick={handleDelete}>
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

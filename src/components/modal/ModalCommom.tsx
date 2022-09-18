import Modal from "react-bootstrap/Modal";

export default function ModalCommom(props: {
  children: any;
  title?: string;
  show: boolean;
  size?: "lg" | "sm" | "xl";
  type?: "submit" | "detail";
  style?: React.CSSProperties | undefined;
  fullscreen?: string | true | undefined;
  onHide?: any;
  handleClick?: any;
  cancelBtnTex?: string;
  submitBtnText?: string;
  validation?: Function;
}) {
  const { handleClick, ...rest } = props;
  return (
    <Modal
      {...rest}
      size={rest.size || "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {rest.title || "Modal"}
        </Modal.Title>
      </Modal.Header>
      {rest.type === "submit" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rest.validation && rest.validation();
            return false;
          }}
        >
          <Modal.Body>{rest.children}</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={rest.onHide}>
              {rest.cancelBtnTex || "Hủy"}
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleClick}
            >
              {rest.submitBtnText || "Lưu"}
            </button>
          </Modal.Footer>
        </form>
      ) : (
        <>
          <Modal.Body>{rest.children}</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={rest.onHide}>
              {rest.cancelBtnTex || "Hủy"}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              {rest.submitBtnText || "Lưu"}
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

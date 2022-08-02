import Modal from "react-bootstrap/Modal";

export default function ModalCommom(props: any) {
  const { handleClick, ...rest } = props;
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {rest.title || "Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{rest.children}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={rest.onHide}>
          {rest.cancel || "Hủy"}
        </button>
        <button className="btn btn-success" onClick={handleClick}>
          {rest.submit || "Lưu"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

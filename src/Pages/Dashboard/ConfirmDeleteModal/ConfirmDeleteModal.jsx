import { Modal, Button } from "react-bootstrap";

export default function ConfirmDeleteModal({ show, onHide, onConfirm, word }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are You Sure You Want To Delete This {word}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
        Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
        Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  activeModal,
  onClose,
  onDelete,
  selectedCard,
}) {
  return (
    <div className={`modal ${activeModal === "delete" ? "modal_opened" : ""}`}>
      <div className="modal__confirmation-overlay">
        <p className="modal__warning">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button onClick={onClose} type="button" className="modal__close-btn" />
        <button
          onClick={() => onDelete(selectedCard)}
          type="button"
          className="modal__delete-btn"
        >
          Yes, delete item
        </button>
        <button type="button" className="modal__cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;

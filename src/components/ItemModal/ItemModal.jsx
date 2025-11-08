import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn item__close-btn"
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={() => onDelete(card)}
              type="button"
              className="modal__delete-btn"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

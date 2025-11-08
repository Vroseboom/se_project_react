import "./ModalWithForm.css";

function ModalWithForm({
  children,
  btnText,
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__overlay">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close-btn" />
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

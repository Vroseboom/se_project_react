import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, handleReset);
  }

  return (
    <ModalWithForm
      btnText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__input-container">
        <label className="modal__label" htmlFor="name">
          Name{""}
          <input
            className="modal__input"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__input-container">
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            className="modal__input"
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

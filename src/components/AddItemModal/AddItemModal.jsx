import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const {
    values,
    errors,
    isSubmitted,
    handleChange,
    handleBlur,
    handleReset,
    validateForm,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (validateForm()) {
      onAddItem(values, handleReset);
    }
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
            className={`modal__input ${
              isSubmitted && errors.name ? "modal__input_invalid" : ""
            }`}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {isSubmitted && errors.name && (
          <span className="modal__error modal__error_visible">
            {errors.name}
          </span>
        )}
      </div>
      <div className="modal__input-container">
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            className={`modal__input ${
              isSubmitted && errors.imageUrl ? "modal__input_invalid" : ""
            }`}
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        {isSubmitted && errors.imageUrl && (
          <span className="modal__error modal__error_visible">
            {errors.imageUrl}
          </span>
        )}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          Cold
        </label>
        {isSubmitted && errors.weather && (
          <span className="modal__error modal__error_visible">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

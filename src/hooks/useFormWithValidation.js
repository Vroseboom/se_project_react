import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation rules for each field
  const validationRules = {
    name: (value) => {
      if (!value || value.trim() === "") {
        return "Name is required";
      }
      return "";
    },
    imageUrl: (value) => {
      if (!value || value.trim() === "") {
        return "Image URL is required";
      }
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL";
      }
    },
    weather: (value) => {
      if (!value || !["hot", "warm", "cold"].includes(value)) {
        return "Please select a weather type";
      }
      return "";
    },
  };

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const validator = validationRules[name];
    if (!validator) return "";
    return validator(value);
  }, []);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsSubmitted(true);
    // Mark all fields as touched so subsequent changes update errors
    const allFieldsTouched = {};
    Object.keys(values).forEach((fieldName) => {
      allFieldsTouched[fieldName] = true;
    });
    setTouched(allFieldsTouched);
    return isValid;
  }, [values, validateField]);

  // Check if form is valid (no errors)
  const isValid =
    Object.keys(errors).length === 0 &&
    Object.keys(values).every((key) => values[key] !== "");

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setValues((prevValues) => ({ ...prevValues, [name]: value }));

      // Only clear error if field has been touched (user left the field once)
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (evt) => {
      const { name } = evt.target;
      setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));

      // Validate the field on blur
      setValues((prevValues) => {
        const error = validateField(name, prevValues[name]);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        return prevValues;
      });
    },
    [validateField]
  );

  const handleReset = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  }, [defaultValues]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    isSubmitted,
    handleChange,
    handleBlur,
    handleReset,
    validateForm,
  };
}

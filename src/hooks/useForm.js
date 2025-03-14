import { useState } from "react";

export default function useForm(
  initialFormData,
  submitCallbackHandler,
  validateFunction = null
) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const onChange = (e) => {
    const currentValue = e.target.value;
    const currentKey = e.target.name;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [currentKey]: currentValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    // Run validation if a validation function was provided
    if (validateFunction) {
      const error = validateFunction(formData);
      if (error) {
        setFormError(error);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await submitCallbackHandler();
    } catch (error) {
      setFormError(error.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return [formData, onChange, onSubmit, isSubmitting, formError, setFormError];
}

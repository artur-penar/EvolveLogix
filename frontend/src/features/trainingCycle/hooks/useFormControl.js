import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMacrocycle } from "../trainingCycle";

export const useFormControls = (initialValues) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "macrocycle") {
      dispatch(setSelectedMacrocycle(e.target.value));
    }
  };

  return [values, handleInputChange];
};

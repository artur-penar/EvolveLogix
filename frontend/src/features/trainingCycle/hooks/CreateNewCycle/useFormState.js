import { useEffect, useRef, useState } from "react";

const useFormState = (initialState) => {
  const [formState, setFormState] = useState(initialState);
  const [warnings, setWarnings] = useState({});
  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    // Reset warnings when cycle type is changed
    if (id === "cycleType") {
      setWarnings({});
    }
    setFormState({ ...formState, [id]: value });
  };

  const validateForm = () => {
    const newWarning = {};
    if (!formState.cycleName) {
      newWarning.cycleName = "Name required!";
    }
    if (!formState.mesocycleStartDate && formState.cycleType === "Mesocycle") {
      // Check only Mesocycle start date because Macrocycle start date is not required YET
      newWarning.mesocycleStartDate = "Start date required!";
    }
    setWarnings(newWarning);
    return Object.keys(newWarning).length === 0;
  };

  useEffect(() => {
    console.log("mesocycleStartDate changed:", formState.mesocycleStartDate);
    console.log("mesocycleDuration changed:", formState.mesocycleDuration);
    // Calculate end date when start date and duration are set
    const calculateEndDate = () => {
      const startDate = new Date(formState.mesocycleStartDate);
      const endDate = new Date(
        startDate.getTime() +
          Number(formState.mesocycleDuration) * 7 * 24 * 60 * 60 * 1000
      );
      const formattedEndDate = endDate.toISOString().split("T")[0];
      setFormState({ ...formState, mesocycleEndDate: formattedEndDate });
      console.log("End date:", formattedEndDate);
    };

    if (formState.mesocycleStartDate && formState.mesocycleDuration) {
      calculateEndDate();
    }
  }, [formState.mesocycleStartDate, formState.mesocycleDuration]);

  return {
    formState,
    setFormState,
    warnings,
    setWarnings,
    handleFormChange,
    validateForm,
    nameInputRef,
    dateInputRef,
  };
};

export default useFormState;

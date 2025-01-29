import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMesocycle } from "features/trainingCycle/trainingCycle";

const useMesocycleForm = ({
  initialState,
  setAddCycleStatus,
  setIsCreateCycleVisible,
  selectedMacrocycleId,
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialState);
  const [warnings, setWarnings] = useState({});

  const availableDurationOptions = [...Array(12).keys()].map(
    (number, i) => number + 1
  );

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
    if (!formState.mesocycleStartDate) {
      // Check only Mesocycle start date because Macrocycle start date is not required YET
      newWarning.mesocycleStartDate = "Start date required!";
    }
    setWarnings(newWarning);
    return Object.keys(newWarning).length === 0;
  };

  useEffect(() => {
    // Calculate end date when start date and duration are set
    const calculateEndDate = () => {
      const startDate = new Date(formState.mesocycleStartDate);
      const endDate = new Date(
        startDate.getTime() +
          Number(formState.mesocycleDuration) * 7 * 24 * 60 * 60 * 1000
      );
      const formattedEndDate = endDate.toISOString().split("T")[0];
      setFormState({ ...formState, mesocycleEndDate: formattedEndDate });
    };

    if (formState.mesocycleStartDate && formState.mesocycleDuration) {
      calculateEndDate();
    }
  }, [formState.mesocycleStartDate, formState.mesocycleDuration]);

  const handleError = (error) => {
    if (error.non_field_errors) {
      const newWaring = {};
      newWaring.mesocycleStartDate =
        error.non_field_errors[0] + "Check Mesocycles duration!";
      setWarnings(newWaring);
    }
  };

  const handleSuccess = () => {
    setAddCycleStatus("Cycle added successfully");
    setIsCreateCycleVisible(false);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        addMesocycle({
          name: formState.cycleName,
          macrocycle: selectedMacrocycleId,
          start_date: formState.mesocycleStartDate,
          duration: Number(formState.mesocycleDuration),
        })
      ).unwrap();
      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
    }
  };
  return {
    formState,
    setFormState,
    warnings,
    handleFormChange,
    onSubmit,
    availableDurationOptions,
  };
};

export default useMesocycleForm;

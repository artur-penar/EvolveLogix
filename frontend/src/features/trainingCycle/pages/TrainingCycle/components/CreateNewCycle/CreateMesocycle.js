import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "./FormGroup";
import useFormState from "features/trainingCycle/hooks/CreateNewCycle/useFormState";
import { addMesocycle } from "features/trainingCycle/trainingCycle";
import "./CreateNewCycle.css";

const CreateMesocycle = ({ selectedMacrocycleId, setAddCycleStatus }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const { formState, validateForm, handleFormChange, warnings, setWarnings } =
    useFormState({
      cycleName: "",
      mesocycleStartDate: "",
      mesocycleEndDate: "",
      mesocycleDuration: 1,
    });
  const { cycleName, mesocycleStartDate, mesocycleDuration, mesocycleEndDate } =
    formState;

  const availableDurationOptions = [...Array(12).keys()].map(
    (number, i) => number + 1
  );

  useEffect(() => {
    if (warnings.cycleName) {
      nameInputRef.current.focus();
    } else if (warnings.mesocycleStartDate) {
      dateInputRef.current.focus();
    }
  }, [warnings]);

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
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        addMesocycle({
          name: cycleName,
          macrocycle: selectedMacrocycleId,
          start_date: mesocycleStartDate,
          duration: Number(mesocycleDuration) + 1,
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

  return (
    <div className="cnc-container">
      <div className="cnc-header-container">
        <h4>Create Mesocycle</h4>
      </div>
      <div className="cnc-form-container">
        <FormGroup
          id="cycleName"
          label="Name"
          type="text"
          value={cycleName}
          handleChange={handleFormChange}
          inputRef={nameInputRef}
          warning={warnings.cycleName}
        />
        <FormGroup
          id="mesocycleStartDate"
          label="Start date"
          type="date"
          value={mesocycleStartDate}
          handleChange={handleFormChange}
          inputRef={dateInputRef}
          warning={warnings.mesocycleStartDate}
        />
        <FormGroup
          id="mesocycleDuration"
          label="Duration"
          type="select"
          value={mesocycleDuration}
          options={availableDurationOptions}
          handleChange={handleFormChange}
        />
        <FormGroup
          id="mesocycleEndDate"
          label="End date"
          type="date"
          value={mesocycleEndDate}
          disabled={true}
        />
        <button className="cnc-button" onClick={onSubmit}>
          Create Mesocycle
        </button>
      </div>
    </div>
  );
};

export default CreateMesocycle;

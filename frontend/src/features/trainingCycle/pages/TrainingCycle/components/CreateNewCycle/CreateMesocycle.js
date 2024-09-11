import React, { useEffect, useRef, useState } from "react";
import FormGroup from "./FormGroup";
import useFormState from "features/trainingCycle/hooks/CreateNewCycle/useFormState";

const CreateMesocycle = () => {
  const { formState, validateForm, handleFormChange, warnings, setWarnings } =
    useFormState({
      cycleName: "",
      mesocycleStartDate: "",
      mesocycleEndDate: "",
      mesocycleDuration: 1,
    });
  const {
    mesocycleName,
    mesocycleStartDate,
    mesocycleDuration,
    mesocycleEndDate,
  } = formState;

  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submit");
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
          value={mesocycleName}
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

import React, { useEffect, useRef, useState } from "react";
import FormGroup from "./FormGroup";
import { createMacrocycle } from "features/trainingCycle/trainingCycle";
import { useDispatch, useSelector } from "react-redux";
import "./CreateNewCycle.css";

const CreateMacrocycle = ({ macrocyclesData, setMacrocycleFormVisible }) => {
  const dispatch = useDispatch();
  const selectedTrainingLogId = useSelector((state) =>
    state.log.selectedTrainingLog ? state.log.selectedTrainingLog.id : null
  );
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(Date.UTC(currentYear, 0, 1))
    .toISOString()
    .split("T")[0];
  const yearEnd = new Date(Date.UTC(currentYear, 11, 31))
    .toISOString()
    .split("T")[0];

  const [formState, setFormState] = useState({
    macrocycleName: "",
    macrocycleStartDate: yearStart,
    macrocycleEndDate: yearEnd,
  });
  const { macrocycleName, macrocycleStartDate, macrocycleEndDate } = formState;
  const [warnings, setWarnings] = useState({});
  const nameInputRef = useRef(null);

  const canCreateMacrocycle = (macrocyclesData) => {
    const hasMacrocycleInCurrentYear = macrocyclesData.some(
      (macrocycle) =>
        macrocycle.start_date && macrocycle.start_date.includes(currentYear)
    );

    if (hasMacrocycleInCurrentYear) {
      return false;
    }
    return true;
  };

  if (macrocyclesData.length > 0) {
    if (canCreateMacrocycle(macrocyclesData)) {
      setMacrocycleFormVisible(true);
    } else {
      setMacrocycleFormVisible(false);
    }
  }
  const validateForm = () => {
    const newWarning = {};
    if (!formState.macrocycleName) {
      newWarning.macrocycleName = "Name required!";
    }
    setWarnings(newWarning);
    return Object.keys(newWarning).length === 0;
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleError = (error) => {
    console.log("Error:", error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      response = await dispatch(
        createMacrocycle({
          name: macrocycleName,
          training_log_id: selectedTrainingLogId,
          start_date: macrocycleStartDate,
          end_date: macrocycleEndDate,
        })
      ).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (e) => {
    if (!validateForm()) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="cnc-container">
      <div className="cnc-header-container">
        <h4>Create Macrocycle </h4>
      </div>
      <div className="cnc-form-container">
        <FormGroup
          id="macrocycleName"
          label="Name"
          type="text"
          value={macrocycleName}
          handleChange={handleFormChange}
          inputRef={nameInputRef}
          warning={warnings.macrocycleName}
        />
        <FormGroup
          id="macrocycleStartDate"
          label="Start date"
          type="date"
          value={macrocycleStartDate}
          disabled={true}
        />
        <FormGroup
          id="macrocycleEndDate"
          label="End date"
          type="date"
          value={macrocycleEndDate}
          disabled={true}
        />
        <div className="cnc-info-container">
          <p>
            Start date and end date are automatically set to the current year.
          </p>
        </div>
        <button className="submit-button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateMacrocycle;

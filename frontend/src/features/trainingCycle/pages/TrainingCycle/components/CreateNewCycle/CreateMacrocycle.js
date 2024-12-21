import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import useMacrocycleForm from "./useMacrocycleForm";
import "./CreateNewCycle.css";

const CreateMacrocycle = ({ macrocyclesData, setMacrocycleFormVisible }) => {
  const selectedTrainingLogId = useSelector((state) =>
    state.log.selectedTrainingLog ? state.log.selectedTrainingLog.id : null
  );

  const currentYear = new Date().getFullYear();

  const { formState, handleFormChange, onSubmit, warnings } = useMacrocycleForm(
    {
      selectedTrainingLogId,
      currentYear,
    }
  );

  const { macrocycleName, macrocycleStartDate, macrocycleEndDate } = formState;
  const nameInputRef = useRef(null);

  const canCreateMacrocycle = (macrocyclesData) => {
    return !macrocyclesData.some(
      (macrocycle) =>
        macrocycle.start_date && macrocycle.start_date.includes(currentYear)
    );
  };

  useEffect(() => {
    if (macrocyclesData.length > 0) {
      setMacrocycleFormVisible(canCreateMacrocycle(macrocyclesData));
    }
  }, [macrocyclesData, setMacrocycleFormVisible]);

  return (
    <div className="cnc-container">
      <div className="cnc-header-container">
        <h4>Create Macrocycle</h4>
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

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormGroup from "./FormGroup";
import useMacrocycleForm from "../../../../hooks/CreateNewCycle/useMacrocycleForm";

import "./CreateNewCycle.css";
import ContainerHeader from "shared/components/ContainerHeader";

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
        <ContainerHeader headerContent={"Create Macrocycle"} />
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

        <Button
          style={{ width: "67%", marginTop: "1rem" }}
          type="submit"
          variant="outlined"
          sx={{
            color: "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
              borderColor: "green",
            },
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateMacrocycle;

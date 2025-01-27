import React, { useEffect, useRef } from "react";
import FormGroup from "./FormGroup";
import useMesocycleForm from "features/trainingCycle/hooks/CreateNewCycle/useMesocycleForm";
import Button from "@mui/material/Button";
import "./CreateNewCycle.css";
import ContainerHeader from "shared/components/ContainerHeader";

const CreateMesocycle = ({
  selectedMacrocycleId,
  setAddCycleStatus,
  setIsCreateCycleVisible,
}) => {
  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const initialState = {
    cycleName: "",
    mesocycleStartDate: "",
    mesocycleEndDate: "",
    mesocycleDuration: 1,
  };

  const {
    formState,
    handleFormChange,
    warnings,
    onSubmit,
    availableDurationOptions,
  } = useMesocycleForm({
    initialState,
    setAddCycleStatus,
    setIsCreateCycleVisible,
    selectedMacrocycleId,
  });

  const { cycleName, mesocycleStartDate, mesocycleDuration, mesocycleEndDate } =
    formState;

  useEffect(() => {
    if (warnings.cycleName) {
      nameInputRef.current.focus();
    } else if (warnings.mesocycleStartDate) {
      dateInputRef.current.focus();
    }
  }, [warnings]);

  return (
    <div className="cnc-container">
      <ContainerHeader headerContent="Create Mesocycle" />
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
      </div>
      <div className="tcf-button-container">
        <Button
          className="tcf-button"
          variant="outlined"
          size="large"
          sx={{
            color: "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
              borderColor: "green",
            },
          }}
          onClick={onSubmit}
        >
          Create Mesocycle
        </Button>
      </div>
    </div>
  );
};

export default CreateMesocycle;

import React from "react";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import CycleSelectGroupOptions from "./CycleSelectGroupOptions";
import ContainerHeader from "shared/components/ContainerHeader";
import Button from "@mui/material/Button";

const CycleSelectGroup = ({
  type,
  value,
  options,
  handleInputChange,
  startDate,
  endDate,
  handleCreateNewCycleClick,
  isCreateCycleVisible,
  additionalProps,
}) => {
  const name = type.toLowerCase();
  return (
    <div className="tcf-select-group-container bg-containers">
      <ContainerHeader headerContent={type} />
      {(type === "Phase" || type === "Mesocycle") && (
        <CycleSelectGroupOptions options={additionalProps.options} />
      )}
      <div className="tcf-select-container">
        <div className="tcf-flex-column">
          <SelectInput
            name={name}
            label="Name"
            value={value}
            options={options}
            handleChange={handleInputChange}
          />
          {type === "Phase" && (
            <SelectInput
              name="trainingDays"
              label="Training days"
              value={additionalProps.trainingDays}
              options={[...Array(7).keys()].map((n) => n + 1)}
              handleChange={handleInputChange}
            />
          )}
          {type === "Mesocycle" && (
            <SelectInput
              name="mesocycleDurationInWeeks"
              label="Duration in weeks"
              value={additionalProps.mesocycleDurationInWeeks}
              options={[...Array(11).keys()]}
              handleChange={handleInputChange}
              disabled={true}
            />
          )}
        </div>
        <div className="tcf-flex-column">
          {type === "Phase" && (
            <SelectInput
              name="phaseDurationInWeeks"
              label="Duration in weeks"
              value={additionalProps.phaseDurationInWeeks}
              options={[...Array(10).keys()].map((n) => n + 1)}
              handleChange={handleInputChange}
            />
          )}
          <DateInput label="Start date:" value={startDate} />
          <DateInput label="End date:" value={endDate} />
        </div>
      </div>
      {type === "Mesocycle" && (
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
            onClick={handleCreateNewCycleClick}
          >
            {isCreateCycleVisible ? "Hide" : "Create new Mesocycle"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CycleSelectGroup;

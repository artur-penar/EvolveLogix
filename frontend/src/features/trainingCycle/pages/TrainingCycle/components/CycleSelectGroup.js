import React from "react";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import CycleSelectGroupOptions from "./CycleSelectGroupOptions";

const CycleSelectGroup = ({
  type,
  value,
  options,
  handleInputChange,
  startDate,
  endDate,
  additionalProps,
}) => {
  const name = type.toLowerCase();
  return (
    <div className="tcf-select-group-container">
      <h3>{type}</h3>
      {(type === "Phase" || type === "Mesocycle") && (
        <CycleSelectGroupOptions options={additionalProps.options} />
      )}
      <div className="tcf-select-container">
        <div className="flex-column">
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
        <div className="flex-column">
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
    </div>
  );
};

export default CycleSelectGroup;

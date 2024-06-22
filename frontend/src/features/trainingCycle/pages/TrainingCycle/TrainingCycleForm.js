import React from "react";
import "./TrainingCycleForm.css";
import DateInput from "./components/DateInput";
import SelectInput from "./components/SelectInput";

const TrainingCycleForm = ({
  macrocycle,
  macrocycles,
  mesocycle,
  mesocycles,
  phase,
  phases,
  trainingDays,
  mesocycleDurationInWeeks,
  mesocycleStartDate,
  mesocycleEndDate,
  phaseStartDate,
  phaseEndDate,
  phaseDurationInWeeks,
  handleMacrocycleChange,
  handleMesocycleChange,
  handlePhaseChange,
  handleTrainingDaysChange,
  handlePhaseDurationChange,
}) => {
  return (
    <div className="tcf-parent-container">
      <div className="tcf-select-group-container">
        <h4>Macrocycle</h4>
        <div className="tcf-select-container">
          <SelectInput
            name="macrocycle"
            label="Name"
            value={macrocycle}
            options={macrocycles}
            handleChange={handleMacrocycleChange}
          />
        </div>
      </div>
      <div className="tcf-select-group-container">
        <h4>Mesocycle</h4>
        <div className="tcf-select-container">
          <div className="flex-column">
            <SelectInput
              name="mesocycle"
              label="Name"
              value={mesocycle}
              options={mesocycles}
              handleChange={handleMesocycleChange}
            />
            <SelectInput
              name="mesocycleDurationInWeeks"
              label="Duration in weeks"
              value={mesocycleDurationInWeeks}
              options={[...Array(11).keys()]}
              handleChange={handleMesocycleChange}
              disabled={true}
            />
          </div>
          <div className="flex-column">
            <DateInput label="Start date:" value={mesocycleStartDate} />
            <DateInput label="End date:" value={mesocycleEndDate} />
          </div>
        </div>

        {/* // Phase selection */}
        <h4>Phase</h4>
        <div className="tcf-select-container" style={{ marginLeft: "2px" }}>
          <div className="flex-column">
            <SelectInput
              name="phase"
              label="Type"
              value={phase}
              options={phases}
              handleChange={handlePhaseChange}
            />
            <SelectInput
              name="trainingDays"
              label="Training days"
              value={trainingDays}
              options={[...Array(7).keys()]}
              handleChange={handleTrainingDaysChange}
            />
          </div>
          <div className="flex-column">
            <SelectInput
              name="phaseDurationInWeeks"
              label="Duration in weeks"
              value={phaseDurationInWeeks}
              options={[...Array(10).keys()]}
              handleChange={handlePhaseDurationChange}
            />

            <DateInput label="Start date:" value={phaseStartDate} />
            <DateInput label="End date:" value={phaseEndDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCycleForm;

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
      <div className="tcf-macrocycle-container">
        <div
          className="tcf-select-group"
          style={{
            width: "50%",
            marginTop: "1rem",
          }}
        >
          <label className="tcf-select-label">Macrocycle:</label>
          <select
            className="form-control tcf-select-control"
            name="macrocycle"
            value={macrocycle}
            onChange={handleMacrocycleChange}
          >
            {macrocycles.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="tcf-select-group-container">
        <div className="tcf-select-container">
          <SelectInput
            name="mesocycle"
            label="Mesocycle"
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
          <DateInput label="Start date:" value={mesocycleStartDate} />
          <DateInput label="End date:" value={mesocycleEndDate} />
        </div>

        {/* // Phase selection */}
        <div className="tcf-select-container" style={{ marginLeft: "2px" }}>
          <SelectInput
            name="phase"
            label="Phase"
            value={phase}
            options={phases}
            handleChange={handlePhaseChange}
          />
          <SelectInput
            name="trainingDays"
            label="Training days:"
            value={trainingDays}
            options={[...Array(7).keys()]}
            handleChange={handleTrainingDaysChange}
          />
          <SelectInput
            name="phaseDurationInWeeks"
            label="Duration in weeks:"
            value={phaseDurationInWeeks}
            options={[...Array(10).keys()]}
            handleChange={handlePhaseDurationChange}
          />

          <DateInput label="Start date:" value={phaseStartDate} />
          <DateInput label="End date:" value={phaseEndDate} />
        </div>
      </div>
    </div>
  );
};

export default TrainingCycleForm;

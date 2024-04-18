import React from "react";
import "./TrainingCycleForm.css";

const TrainingCycleForm = ({
  macrocycle,
  macrocycles,
  mesocycle,
  mesocycles,
  phase,
  phases,
  trainingDays,
  weekNumber,
  handleMacrocycleChange,
  handleMesocycleChange,
  handlePhaseChange,
  handleTrainingDaysChange,
  handleWeeksChange,
}) => {
  return (
    <div className="tcf-parent-container">
      <div className="tcf-select-container">
        <div className="tcf-select-group">
          <label className="tcf-select-label">Macrocycle:</label>
          <select
            className="form-control tcf-select-control"
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
        <div className="tcf-select-group">
          <label className="tcf-select-label">Phase:</label>
          <select
            className="form-control tcf-select-control"
            value={phase}
            onChange={handlePhaseChange}
          >
            {phases.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tcf-select-container">
        <div className="tcf-select-group">
          <label className="tcf-select-label">Mesocycle:</label>
          <select
            className="form-control tcf-select-control"
            value={mesocycle}
            onChange={handleMesocycleChange}
          >
            {mesocycles.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="tcf-select-group">
          <label className="tcf-select-label">Duration in weeks:</label>
          <select
            className="form-control tcf-select-control"
            value={weekNumber}
            onChange={handleWeeksChange}
          >
            {[...Array(10).keys()].map((number, i) => (
              <option key={i} value={number}>
                {number + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="tcf-select-group">
          <label className="tcf-select-label">Training days:</label>
          <select
            className="form-control tcf-select-control"
            value={trainingDays}
            onChange={handleTrainingDaysChange}
          >
            {[...Array(7).keys()].map((number, i) => (
              <option key={i} value={number}>
                {number + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TrainingCycleForm;
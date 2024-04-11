import React from "react";

const TrainingCycleForm = ({
  macrocycle,
  macrocycles,
  mesocycle,
  mesocycles,
  phase,
  phases,
  handleMacrocycleChange,
  handleMesocycleChange,
  handlePhaseChange,
}) => {
  return (
    <div>
      <div className="tc-select-container">
        <div className="tc-select-group">
          <label className="tc-select-label">Macrocycle:</label>
          <select
            className="form-control tc-select-control"
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
        <div className="tc-select-group">
          <label className="tc-select-label">Phase:</label>
          <select
            className="form-control tc-select-control"
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

      <div className="tc-select-container">
        <div className="tc-select-group">
          <label className="tc-select-label">Mesocycle:</label>
          <select
            className="form-control tc-select-control"
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

        <div className="tc-select-group">
          <label className="tc-select-label">Duration in weeks:</label>
          <select
            className="form-control tc-select-control"
            value={macrocycle}
            onChange={handleMacrocycleChange}
          >
            {[...Array(10).keys()].map((number, i) => (
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

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
  mesocycleDurationInWeeks,
  handleMesocycleDurationChange,
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
          <div className="tcf-select-group">
            <label className="tcf-select-label">Mesocycle:</label>
            <select
              className="form-control tcf-select-control"
              name="mesocycle"
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
              name="mesocycleDurationInWeeks"
              value={mesocycleDurationInWeeks}
              onChange={handleMesocycleDurationChange}
            >
              {[...Array(10).keys()].map((number, i) => (
                <option key={i} value={number}>
                  {number + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tcf-select-container" style={{ marginLeft: "2px" }}>
          <div className="tcf-select-group">
            <label className="tcf-select-label">Phase:</label>
            <select
              className="form-control tcf-select-control"
              name="phase"
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
          <div className="tcf-select-group">
            <label className="tcf-select-label">Duration in weeks:</label>
            <select
              className="form-control tcf-select-control"
              name="phaseDurationInWeeks"
              value={phaseDurationInWeeks}
              onChange={handlePhaseDurationChange}
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
              name="trainingDays"
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
    </div>
  );
};

export default TrainingCycleForm;

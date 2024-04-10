import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import React, { useState } from "react";
import "./TrainingCycle.css";

const TrainingCycle = () => {
  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];
  const [phase, setPhase] = useState(phases[0]);

  const mesocycles = ["Competition prep", "Off-season", "Transition"];
  const [mesocycle, setMesocycle] = useState(mesocycles[0]);

  const macrocycles = ["2024Cycle", "Quadrennial"];
  const [macrocycle, setMacrocycle] = useState(macrocycles[0]);

  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);

  const handleCreateCycleClick = () => {
    setIsCreateCycleVisible(true);
  };

  const handlePhaseChange = (e) => {
    setPhase(e.target.value);
  };

  const handleMesocycleChange = (e) => {
    setMesocycle(e.target.value);
  };

  const handleMacrocycleChange = (e) => {
    setMacrocycle(e.target.value);
  };

  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="tc-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
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
        {!isCreateCycleVisible && (
          <div className="tc-button-container">
            <button className="tc-button" onClick={handleCreateCycleClick}>
              Create Cycle
            </button>
          </div>
        )}
        {isCreateCycleVisible && <div>hahaha</div>}
      </div>
    </Layout>
  );
};

export default TrainingCycle;

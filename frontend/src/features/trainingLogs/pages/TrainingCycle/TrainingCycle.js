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
      <div className="training-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
        <label>Macrocycle:</label>
        <select
          className="form-control"
          value={macrocycle}
          onChange={handleMacrocycleChange}
          style={{ width: "60%" }}
        >
          {macrocycles.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>Mesocycle:</label>
        <select
          className="form-control"
          value={mesocycle}
          onChange={handleMesocycleChange}
          style={{ width: "60%" }}
        >
          {mesocycles.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>Phase</label>
        <select
          className="form-control"
          value={phase}
          onChange={handlePhaseChange}
          style={{ width: "60%" }}
        >
          {phases.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>Duration:</label>
        <select
          className="form-control"
          value={macrocycle}
          onChange={handleMacrocycleChange}
          style={{ width: "60%" }}
        >
          {[...Array(10).keys()].map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>Weeks</label>
      </div>
    </Layout>
  );
};

export default TrainingCycle;

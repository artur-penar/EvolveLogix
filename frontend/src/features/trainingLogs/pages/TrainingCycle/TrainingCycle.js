import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import React, { useState } from "react";
import "./TrainingCycle.css";

const TrainingCycle = () => {
  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];
  const [phase, setPhase] = useState(phases[0]);

  const handlePhaseChange = (e) => {
    setPhase(e.target.value);
  };

  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="training-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
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
      </div>
    </Layout>
  );
};

export default TrainingCycle;

import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import React, { useState } from "react";
import "./TrainingCycle.css";
import TrainingCycleForm from "./TrainingCycleForm";

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
        <TrainingCycleForm
          macrocycle={macrocycle}
          macrocycles={macrocycles}
          mesocycle={mesocycle}
          mesocycles={mesocycles}
          phase={phase}
          phases={phases}
          handleMacrocycleChange={handleMacrocycleChange}
          handleMesocycleChange={handleMesocycleChange}
          handlePhaseChange={handlePhaseChange}
        />

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

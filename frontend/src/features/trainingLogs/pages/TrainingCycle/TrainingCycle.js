import React, { useState } from "react";
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import TrainingCycleForm from "./TrainingCycleForm";
import CreateNewCycle from "./CreateNewCycle";
import PhaseForm from "./PhaseForm";
import "./TrainingCycle.css";

const TrainingCycle = () => {
  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];
  const [phase, setPhase] = useState(phases[0]);

  const mesocycles = ["Competition prep", "Off-season", "Transition"];
  const [mesocycle, setMesocycle] = useState(mesocycles[0]);

  const macrocycles = ["2024Cycle", "Quadrennial"];
  const [macrocycle, setMacrocycle] = useState(macrocycles[0]);

  const [trainingDays, setTrainingDays] = useState(0);
  const [weekNumber, setWeekNumber] = useState(0);
  const [dayExercisesNumber, setDayExerciseNumber] = useState(1);

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

  const handleTrainingDaysChange = (e) => {
    setTrainingDays(e.target.value);
  };

  const handleWeeksChange = (e) => {
    setWeekNumber(e.target.value);
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
          trainingDays={trainingDays}
          weekNumber={weekNumber}
          handleMacrocycleChange={handleMacrocycleChange}
          handleMesocycleChange={handleMesocycleChange}
          handlePhaseChange={handlePhaseChange}
          handleTrainingDaysChange={handleTrainingDaysChange}
          handleWeeksChange={handleWeeksChange}
        />

        {!isCreateCycleVisible && (
          <div className="tc-button-container">
            <button className="tc-button" onClick={handleCreateCycleClick}>
              Create Cycle
            </button>
          </div>
        )}
        {isCreateCycleVisible && <CreateNewCycle />}
        <PhaseForm
          weekNumber={weekNumber}
          trainingDays={trainingDays}
          dayExercisesNumber={dayExercisesNumber}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;

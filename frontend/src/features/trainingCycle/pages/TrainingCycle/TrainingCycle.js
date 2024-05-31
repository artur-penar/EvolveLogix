import React, { useEffect, useState } from "react";
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import TrainingCycleForm from "./TrainingCycleForm";
import CreateNewCycle from "./CreateNewCycle";
import PhaseForm from "./PhaseForm";
import "./TrainingCycle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrainingCycles,
  setSelectedMacrocycle,
} from "features/trainingCycle/trainingCycle";

const getMacrocycleNames = (trainingCycles) => {
  return trainingCycles.map((macrocycle) => macrocycle.name);
};

const TrainingCycle = () => {
  const dispatch = useDispatch();
  const trainingCycleState = useSelector(
    (state) => state.trainingCycle.trainingCycles
  );

  useEffect(() => {
    if (trainingCycleState.length === 0) dispatch(getTrainingCycles());
  }, []);

  const selectedMacrocycle = useSelector(
    (state) => state.trainingCycle.selectedMacrocycle
  );

  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];
  const [phase, setPhase] = useState(phases[0]);

  const mesocycles = ["Competition prep", "Off-season", "Transition"];
  const [mesocycle, setMesocycle] = useState(mesocycles[0]);

  const macrocycles = getMacrocycleNames(trainingCycleState);
  const [macrocycle, setMacrocycle] = useState(macrocycles[0]);

  const [trainingDays, setTrainingDays] = useState(0);
  const [phaseDurationInWeeks, setPhaseDurationInWeeks] = useState(0);

  const [mesocycleDurationInWeeks, setMesocycleDurationInWeeks] = useState(0);

  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);

  useEffect(() => {
    dispatch(setSelectedMacrocycle(macrocycle));
  }, [macrocycle]);

  useEffect(() => {
    console.log(selectedMacrocycle);
  }, [selectedMacrocycle]);

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
    setSelectedMacrocycle(e.target.value);
  };

  const handleTrainingDaysChange = (e) => {
    setTrainingDays(e.target.value);
  };

  const handlePhaseDurationChange = (e) => {
    setPhaseDurationInWeeks(e.target.value);
  };

  const handleMesocycleDurationChange = (e) => {
    setMesocycleDurationInWeeks(e.target.value);
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
          phaseDurationInWeeks={phaseDurationInWeeks}
          mesocycleDurationInWeeks={mesocycleDurationInWeeks}
          handleMesocycleDurationChange={handleMesocycleDurationChange}
          handleMacrocycleChange={handleMacrocycleChange}
          handleMesocycleChange={handleMesocycleChange}
          handlePhaseChange={handlePhaseChange}
          handleTrainingDaysChange={handleTrainingDaysChange}
          handlePhaseDurationChange={handlePhaseDurationChange}
        />
        {/* <CycleTimeline trainingCycle={trainingCycle} /> */}

        {!isCreateCycleVisible && (
          <div className="tc-button-container">
            <button className="tc-button" onClick={handleCreateCycleClick}>
              Create Cycle
            </button>
          </div>
        )}
        {isCreateCycleVisible && <CreateNewCycle />}
        <PhaseForm
          weekNumber={phaseDurationInWeeks}
          trainingDays={trainingDays}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;

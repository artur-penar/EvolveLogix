import Layout from "components/shared/Layout";
import React from "react";
import { useSelector } from "react-redux";
import PhaseDisplay from "../TrainingCycle/components/PhaseDisplay";
import CycleTimeline from "../TrainingCycle/CycleTimeline";
import "./ViewTrainingCycles.css";

// What i want to do here is to display the selected macrocycle and its mesocycles and phases
// I need to consider the way of displaying the data
// One possibility is to use PhaseDisplay component to display the phases
// It could be a good idea to use timeline to display the mesocycles chronology and duration

const ViewTrainingCycles = () => {
  const trainingCyclesState = useSelector((state) => state.trainingCycle);
  const selectedMacrocycle = useSelector(
    (state) => state.trainingCycle.selectedMacrocycle
  );
  const selectedMacrocycleData = trainingCyclesState.trainingCycles.find(
    (macrocycle) => macrocycle.name === selectedMacrocycle
  );
  const selectedMacrocycleMesocycles = selectedMacrocycleData?.mesocycles || [];
  const firstPhase = selectedMacrocycleMesocycles[0]?.phases[0] || [];
  const phasesData = [];
  phasesData.push(firstPhase);

  console.log("ViewTrainingCycles.js");
  console.log(trainingCyclesState);
  console.log(selectedMacrocycle);
  console.log(selectedMacrocycleData);
  console.log(selectedMacrocycleMesocycles);
  console.log(firstPhase);
  console.log(firstPhase.length);

  const Mesocycle = ({ mesocycle }) => (
    <div key={mesocycle.id}>
      <h3>{mesocycle.name}</h3>
      <div className="vtc-timeline-container">
        <CycleTimeline
          mesocycleDuration={mesocycle.duration}
          phasesData={mesocycle.phases}
        />
      </div>
      {mesocycle.phases.map((phase) => (
        <PhaseDisplay
          key={phase.id}
          phasesData={[phase]}
          enableSelect={false}
        />
      ))}
    </div>
  );
  return (
    <Layout title="Evolve Logix | View Training Cycles">
      <div className="vtc-container">
        <h1>View Training Cycles</h1>
        {selectedMacrocycleMesocycles.map((mesocycle) => (
          <>
            <h3>Mesocycle</h3>
            <Mesocycle key={mesocycle.id} mesocycle={mesocycle} />
          </>
        ))}
      </div>
    </Layout>
  );
};

export default ViewTrainingCycles;

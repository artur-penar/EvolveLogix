// React-related imports
import React, { useEffect, useState } from "react";

// Third-party libraries
import { useDispatch, useSelector } from "react-redux";

// Absolute imports
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";

// Features
import { setSelectedMacrocycle } from "features/trainingCycle/trainingCycle";
import { useTrainingCycle } from "features/trainingCycle/hooks/useTrainingCycle";
import { useFormControls } from "features/trainingCycle/hooks/useFormControl";

// Relative imports
import CreateNewCycle from "./CreateNewCycle";
import PhaseForm from "./PhaseForm";
import TrainingCycleForm from "./TrainingCycleForm";

// CSS/other assets
import "./TrainingCycle.css";

// Helper functions
const getCyclesName = (trainingCycles) => {
  return trainingCycles.map((cycle) => {
    return cycle.name;
  });
};

const getMesocycles = (trainingCycles, macrocycleName) => {
  const macrocycle = trainingCycles.find(
    (macrocycle) => macrocycle.name === macrocycleName
  );
  return macrocycle ? macrocycle.mesocycles : [];
};

const getCycleIdByName = (cycleName, cycles) => {
  const cycle = cycles.find((cycle) => cycle.name === cycleName);
  return cycle ? cycle.id : null;
};

// Component
const TrainingCycle = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const trainingCycleState = useTrainingCycle();
  const selectedMacrocycle = useSelector(
    (state) => state.trainingCycle.selectedMacrocycle
  );
  // Variables
  const macrocycleNames = getCyclesName(trainingCycleState);
  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];

  // State hooks

  const [mesocyclesData, setMesocyclesData] = useState([]);
  const mesocycleNames = getCyclesName(mesocyclesData);
  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);
  const [values, handleInputChange] = useFormControls({
    macrocycle: macrocycleNames[0],
    mesocycle: mesocycleNames[0],
    phase: phases[0],
    trainingDays: 0,
    phaseDurationInWeeks: 0,
    mesocycleDurationInWeeks: 0,
  });

  // Use effect hooks
  useEffect(() => {
    setMesocyclesData(getMesocycles(trainingCycleState, selectedMacrocycle));
    console.log("Mesocycle data fetched");
  }, [selectedMacrocycle, trainingCycleState]);

  useEffect(() => {
    if (values["mesocycle"] === null)
      handleInputChange({
        target: { name: "mesocycle", value: mesocycleNames[0] },
      });
  }, [mesocycleNames]);

  useEffect(() => {
    dispatch(setSelectedMacrocycle(values["macrocycle"]));
  }, [values["macrocycle"]]);

  // Event handlers
  const handleCreateCycleClick = () => {
    setIsCreateCycleVisible(true);
  };

  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="tc-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
        <TrainingCycleForm
          macrocycle={values["macrocycle"]}
          macrocycles={macrocycleNames}
          mesocycle={values["mesocycle"]}
          mesocycles={mesocycleNames}
          phase={values["phase"]}
          phases={phases}
          trainingDays={values["trainingDays"]}
          phaseDurationInWeeks={values["phaseDurationInWeeks"]}
          mesocycleDurationInWeeks={values["mesocycleDurationInWeeks"]}
          handleMesocycleDurationChange={handleInputChange}
          handleMacrocycleChange={handleInputChange}
          handleMesocycleChange={handleInputChange}
          handlePhaseChange={handleInputChange}
          handleTrainingDaysChange={handleInputChange}
          handlePhaseDurationChange={handleInputChange}
        />
        {/* <CycleTimeline trainingCycle={trainingCycle} /> */}

        {!isCreateCycleVisible && (
          <div className="tc-button-container">
            <button className="tc-button" onClick={handleCreateCycleClick}>
              Create Cycle
            </button>
          </div>
        )}
        {isCreateCycleVisible && (
          <CreateNewCycle
            selectedMacrocycle={getCycleIdByName(
              selectedMacrocycle,
              trainingCycleState
            )}
          />
        )}
        <PhaseForm
          phase={values["phase"]}
          mesocycle={getCycleIdByName(values["mesocycle"], mesocyclesData)}
          weeksNumber={values["phaseDurationInWeeks"]}
          trainingDays={values["trainingDays"]}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;

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
  const [values, handleInputChange, handleMultipleInputChanges] =
    useFormControls({
      macrocycle: macrocycleNames[0],
      macrocycleStartDate: "",
      macrocycleEndDate: "",
      mesocycle: mesocycleNames[0],
      mesocycleStartDate: "",
      mesocycleEndDate: "",
      phase: phases[0],
      trainingDays: 0,
      phaseDurationInWeeks: 0,
      mesocycleDurationInWeeks: 0,
    });

  useEffect(() => {
    console.log(trainingCycleState);
    dispatch(setSelectedMacrocycle(values["macrocycle"]));
    setMesocyclesData(getMesocycles(trainingCycleState, values["macrocycle"]));
    trainingCycleState.forEach((macrocycle) => {
      if (macrocycle.name === values["macrocycle"]) {
        handleMultipleInputChanges({
          macrocycleStartDate: macrocycle.start_date
            ? macrocycle.start_date
            : "",
          macrocycleEndDate: macrocycle.end_date ? macrocycle.end_date : "",
        });
      }
    });
  }, [values["macrocycle"]]);

  useEffect(() => {
    mesocyclesData.forEach((mesocycle) => {
      if (mesocycle.name === values["mesocycle"]) {
        console.log(mesocycle.name, values["mesocycle"]);
        handleMultipleInputChanges({
          mesocycleStartDate: mesocycle.start_date,
          mesocycleEndDate: mesocycle.end_date,
          mesocycleDurationInWeeks: mesocycle.duration,
        });
      }
    });
  }, [values["mesocycle"]]);

  useEffect(() => {
    trainingCycleState.forEach((macrocycle) => {
      if (macrocycle.name === values["macrocycle"]) {
        handleMultipleInputChanges({
          mesocycleStartDate:
            macrocycle.mesocycles && macrocycle.mesocycles[0]
              ? macrocycle.mesocycles[0].start_date
              : "",
          mesocycleEndDate:
            macrocycle.mesocycles && macrocycle.mesocycles[0]
              ? macrocycle.mesocycles[0].end_date
              : "",
          mesocycleDurationInWeeks:
            macrocycle.mesocycles && macrocycle.mesocycles[0]
              ? macrocycle.mesocycles[0].duration
              : "",
        });
      }
    });
  }, [values["macrocycle"]]);

  useEffect(() => {
    // Update mesocycles data when trainingCycleState changes
    if (trainingCycleState.length > 0) {
      setMesocyclesData(trainingCycleState[0].mesocycles);
      // Set the start date of the first mesocycle
      handleMultipleInputChanges({
        mesocycleStartDate: trainingCycleState[0].mesocycles[0].start_date,
        mesocycleEndDate: trainingCycleState[0].mesocycles[0].end_date,
        mesocycleDurationInWeeks: trainingCycleState[0].mesocycles[0].duration,
      });
    }
  }, [trainingCycleState]);

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
          macrocycleStartDate={values["macrocycleStartDate"]}
          macrocycleEndDate={values["macrocycleEndDate"]}
          macrocycles={macrocycleNames}
          mesocycle={values["mesocycle"]}
          mesocycles={mesocycleNames}
          mesocycleStartDate={values["mesocycleStartDate"]}
          mesocycleEndDate={values["mesocycleEndDate"]}
          handleMesocycleStartDateChange={handleInputChange}
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

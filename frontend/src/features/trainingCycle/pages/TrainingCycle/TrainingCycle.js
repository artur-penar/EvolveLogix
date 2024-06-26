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

const getPhases = (mesocyclesData, selectedMesocycle) => {
  console.log(mesocyclesData);
  console.log(selectedMesocycle);
  // Use optional chaining to safely access `phases`
  const phases = mesocyclesData.find(
    (mesocycle) => mesocycle.name === selectedMesocycle
  )?.phases;
  console.log("Phases");
  console.log(phases);
  // Return phases if it's truthy; otherwise, return an empty array
  return phases || [];
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

  const [phasesData, setPhasesData] = useState([]);
  const [mesocyclesData, setMesocyclesData] = useState([]);
  const mesocycleNames = getCyclesName(mesocyclesData);
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
      newPhaseStartDate: "",
    });

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
    dispatch(setSelectedMacrocycle(values["macrocycle"]));
    setMesocyclesData(getMesocycles(trainingCycleState, values["macrocycle"]));
    trainingCycleState.forEach((macrocycle) => {
      if (macrocycle.name === values["macrocycle"]) {
        handleMultipleInputChanges({
          macrocycleStartDate: macrocycle.start_date
            ? macrocycle.start_date
            : "",
          macrocycleEndDate: macrocycle.end_date ? macrocycle.end_date : "",
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
    // In practice it mean first page render
    if (trainingCycleState.length > 0) {
      setMesocyclesData(trainingCycleState[0].mesocycles);
      handleMultipleInputChanges({
        macrocycleStartDate: trainingCycleState[0].start_date,
        macrocycleEndDate: trainingCycleState[0].end_date,
        mesocycleStartDate: trainingCycleState[0].mesocycles[0].start_date,
        mesocycleEndDate: trainingCycleState[0].mesocycles[0].end_date,
        mesocycleDurationInWeeks: trainingCycleState[0].mesocycles[0].duration,
      });
    }
  }, [trainingCycleState]);

  useEffect(() => {
    let phasesData = [];

    // Determine the source of phasesData based on available data
    if (mesocyclesData.length > 0) {
      console.log("Mesocycle data greater than 0");
      phasesData = getPhases(mesocyclesData, values["mesocycle"]) || [];
    } else if (trainingCycleState.length > 0) {
      console.log("Training cycle state greater than 0");
      phasesData = trainingCycleState[0].mesocycles[0].phases;
    }

    // Update phasesData state
    setPhasesData(phasesData);

    // Calculate newPhaseStartDate if phasesData is not empty
    let newPhaseStartDate = "";
    if (phasesData.length > 0) {
      const lastPhaseEndDate = new Date(
        phasesData[phasesData.length - 1].end_date
      );
      lastPhaseEndDate.setDate(lastPhaseEndDate.getDate() + 1);
      newPhaseStartDate = lastPhaseEndDate.toISOString().split("T")[0];
    }
    handleMultipleInputChanges({
      newPhaseStartDate: newPhaseStartDate,
    });

    console.log("Phases data", phasesData);
    console.log("New phase start date", newPhaseStartDate);
  }, [trainingCycleState, values["mesocycle"], values["macrocycle"]]);

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
          phasesData={phasesData}
          newPhaseStartDate={values["newPhaseStartDate"]}
          trainingDays={values["trainingDays"]}
          phaseDurationInWeeks={values["phaseDurationInWeeks"]}
          mesocycleDurationInWeeks={values["mesocycleDurationInWeeks"]}
          handleInputChange={handleInputChange}
          selectedMacrocycleId={getCycleIdByName(
            selectedMacrocycle,
            trainingCycleState
          )}
        />
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

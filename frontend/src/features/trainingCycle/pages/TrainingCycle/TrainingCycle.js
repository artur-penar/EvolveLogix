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
import calculateNewPhaseStartDate from "features/trainingCycle/utils/calculateNewPhaseStartDate";
import determinePhasesData from "features/trainingCycle/utils/determinePhasesData";

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
  const phaseTypes = ["Hypertrophy", "Strength", "Peaking", "Deload"];

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
      phase: phaseTypes[0],
      trainingDays: 0,
      phaseDurationInWeeks: 1,
      mesocycleDurationInWeeks: 0,
      phaseStartDate: "",
      phaseEndDate: "",
    });

  useEffect(() => {
    const calculateEndDate = () => {
      const startDate = new Date(values["phaseStartDate"]);
      const endDate = new Date(
        startDate.getTime() +
          Number(values["phaseDurationInWeeks"]) * 7 * 24 * 60 * 60 * 1000
      );
      return endDate.toISOString().split("T")[0];
    };

    if (values["phaseStartDate"] !== "") {
      let formattedEndDate = calculateEndDate();
      const phaseEndDate = new Date(formattedEndDate);
      const mesocycleEndDate = new Date(values["mesocycleEndDate"]);
      if (phaseEndDate > mesocycleEndDate) {
        formattedEndDate = "";
      }
      handleMultipleInputChanges({
        phaseEndDate: formattedEndDate,
      });
    }
  }, [values["phaseStartDate"], values["phaseDurationInWeeks"]]);

  useEffect(() => {
    mesocyclesData.forEach((mesocycle) => {
      if (mesocycle.name === values["mesocycle"]) {
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
          mesocycle: macrocycle.mesocycles[0].name
            ? macrocycle.mesocycles[0].name
            : "",
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
    // Determine phases data for the Mesocycle
    const phasesData = determinePhasesData(
      mesocyclesData,
      trainingCycleState,
      values["mesocycle"]
    );

    // Update phasesData state
    setPhasesData(phasesData);

    // Calculate the start date for a new phase
    const newPhaseStartDate = calculateNewPhaseStartDate(
      phasesData,
      values["mesocycleStartDate"]
    );

    // Update the phase start date
    handleMultipleInputChanges({
      phaseStartDate: newPhaseStartDate,
    });
  }, [
    trainingCycleState,
    values["macrocycle"],
    values["mesocycleStartDate"],
    mesocyclesData,
  ]);

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
          phases={phaseTypes}
          phasesData={phasesData}
          phaseStartDate={values["phaseStartDate"]}
          phaseEndDate={values["phaseEndDate"]}
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
          isPhaseFormActive={values["phaseEndDate"] ? true : false}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;

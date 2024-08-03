// React-related imports
import React, { useCallback, useEffect, useState } from "react";

// Third-party libraries
import { useDispatch, useSelector } from "react-redux";
// Absolute imports
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import calculateNewPhaseStartDate from "features/trainingCycle/utils/calculateNewPhaseStartDate";
import determinePhasesData from "features/trainingCycle/utils/determinePhasesData";
import {
  calculatePhaseEndDate,
  getCycleIdByName,
  getCycleNames,
  getMesocycles,
} from "features/trainingCycle/utils/trainingCycleUtils";
import {
  setSelectedMacrocycle,
  setSelectedMesocycle,
} from "features/trainingCycle/trainingCycle";
import { useFormControls } from "features/trainingCycle/hooks/useFormControl";
import { useTrainingCycle } from "features/trainingCycle/hooks/useTrainingCycle";
// Relative imports
import PhaseForm from "./PhaseForm";
import TrainingCycleForm from "./TrainingCycleForm";

// CSS/other assets
import "./TrainingCycle.css";
import useUpdatePhaseEndDate from "features/trainingCycle/hooks/TrainingCycle/useUpdatePhaseEndDate";

// Component
const TrainingCycle = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const trainingCycleState = useTrainingCycle();
  const selectedMacrocycle = useSelector(
    (state) => state.trainingCycle.selectedMacrocycle
  );
  const selectedMesocycle = useSelector(
    (state) => state.trainingCycle.selectedMesocycle
  );

  // Variables
  const macrocycleNames = getCycleNames(trainingCycleState);
  const phaseTypes = ["Hypertrophy", "Strength", "Peak", "Deload"];

  // State hooks

  const [phasesData, setPhasesData] = useState([]);
  const [mesocyclesData, setMesocyclesData] = useState([]);
  const mesocycleNames = getCycleNames(mesocyclesData);

  const [cycleFormValues, handleInputChange, handleMultipleInputChanges] =
    useFormControls({
      macrocycle: selectedMacrocycle || macrocycleNames[0],
      macrocycleStartDate: "",
      macrocycleEndDate: "",
      mesocycle: selectedMesocycle || mesocycleNames[0],
      mesocycleStartDate: "",
      mesocycleEndDate: "",
      phase: phaseTypes[0],
      trainingDays: 0,
      phaseDurationInWeeks: 1,
      mesocycleDurationInWeeks: 0,
      phaseStartDate: "",
      phaseEndDate: "",
    });

  useUpdatePhaseEndDate(cycleFormValues, handleMultipleInputChanges);

  const updateMesocycleDetails = useCallback(() => {
    if (cycleFormValues["mesocycle"] !== "") {
      const selectedMesocycle = mesocyclesData.find(
        (mesocycle) => mesocycle.name === cycleFormValues["mesocycle"]
      );
      if (selectedMesocycle) {
        dispatch(setSelectedMesocycle(cycleFormValues["mesocycle"]));
        handleMultipleInputChanges({
          mesocycleStartDate: selectedMesocycle.start_date,
          mesocycleEndDate: selectedMesocycle.end_date,
          mesocycleDurationInWeeks: selectedMesocycle.duration,
        });
      }
    }
  }, [cycleFormValues["mesocycle"]]);

  useEffect(() => {
    updateMesocycleDetails();
  }, [updateMesocycleDetails]);

  const updateSelectedMacrocycleDetails = useCallback(() => {
    dispatch(setSelectedMacrocycle(cycleFormValues["macrocycle"]));
    const selectedMacrocycle = trainingCycleState.find(
      (macrocycle) => macrocycle.name === cycleFormValues["macrocycle"]
    );
    if (selectedMacrocycle) {
      setMesocyclesData(selectedMacrocycle.mesocycles);
      handleMultipleInputChanges({
        macrocycleStartDate: selectedMacrocycle.start_date || "",
        macrocycleEndDate: selectedMacrocycle.end_date || "",
        mesocycle: selectedMacrocycle.mesocycles[0]?.name || "",
        mesocycleStartDate: selectedMacrocycle.mesocycles[0]?.start_date || "",
        mesocycleEndDate: selectedMacrocycle.mesocycles[0]?.end_date || "",
        mesocycleDurationInWeeks:
          selectedMacrocycle.mesocycles[0]?.duration || "",
      });
    }
  }, [cycleFormValues["macrocycle"]]);

  useEffect(() => {
    updateSelectedMacrocycleDetails();
  }, [updateSelectedMacrocycleDetails]);

  const initializeCycleState = useCallback(() => {
    if (trainingCycleState.length > 0) {
      dispatch(setSelectedMacrocycle(trainingCycleState[0].name));
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

  const updateMesocyclesState = useCallback(() => {
    const selectedMacrocycleData = trainingCycleState.find(
      (macrocycle) => macrocycle.name === selectedMacrocycle
    );
    const mesocycles = selectedMacrocycleData.mesocycles;
    setMesocyclesData(mesocycles);
  }, [trainingCycleState]);

  useEffect(() => {
    // Update mesocycles data when trainingCycleState changes
    // In practice it mean first page render
    if (mesocyclesData.length === 0) {
      initializeCycleState();
    } else {
      updateMesocyclesState();
    }
  }, [initializeCycleState, updateMesocyclesState]);

  useEffect(() => {
    // Determine phases data for the Mesocycle
    const phasesData = determinePhasesData(
      mesocyclesData,
      trainingCycleState,
      cycleFormValues["mesocycle"]
    );

    // Update phasesData state
    setPhasesData(phasesData);

    // Calculate the start date for a new phase
    const newPhaseStartDate = calculateNewPhaseStartDate(
      phasesData,
      cycleFormValues["mesocycleStartDate"]
    );

    // Update the phase start date
    handleMultipleInputChanges({
      phaseStartDate: newPhaseStartDate,
    });
  }, [
    trainingCycleState,
    cycleFormValues["macrocycle"],
    cycleFormValues["mesocycleStartDate"],
    mesocyclesData,
  ]);

  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="tc-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
        <TrainingCycleForm
          macrocycle={cycleFormValues["macrocycle"]}
          macrocycleStartDate={cycleFormValues["macrocycleStartDate"]}
          macrocycleEndDate={cycleFormValues["macrocycleEndDate"]}
          macrocycles={macrocycleNames}
          mesocycle={cycleFormValues["mesocycle"]}
          mesocycles={mesocycleNames}
          mesocycleStartDate={cycleFormValues["mesocycleStartDate"]}
          mesocycleEndDate={cycleFormValues["mesocycleEndDate"]}
          handleMesocycleStartDateChange={handleInputChange}
          phase={cycleFormValues["phase"]}
          phases={phaseTypes}
          phasesData={phasesData}
          phaseStartDate={cycleFormValues["phaseStartDate"]}
          phaseEndDate={cycleFormValues["phaseEndDate"]}
          trainingDays={cycleFormValues["trainingDays"]}
          phaseDurationInWeeks={cycleFormValues["phaseDurationInWeeks"]}
          mesocycleDurationInWeeks={cycleFormValues["mesocycleDurationInWeeks"]}
          handleInputChange={handleInputChange}
          selectedMacrocycleId={getCycleIdByName(
            selectedMacrocycle,
            trainingCycleState
          )}
        />
        <PhaseForm
          mesocycleId={getCycleIdByName(
            cycleFormValues["mesocycle"],
            mesocyclesData
          )}
          phaseType={cycleFormValues["phase"]}
          phaseStartDate={cycleFormValues["phaseStartDate"]}
          phaseEndDate={cycleFormValues["phaseEndDate"]}
          phasesData={phasesData}
          setPhasesData={setPhasesData}
          weeksNumber={cycleFormValues["phaseDurationInWeeks"]}
          trainingDays={cycleFormValues["trainingDays"]}
          isPhaseFormActive={cycleFormValues["phaseEndDate"] ? true : false}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;

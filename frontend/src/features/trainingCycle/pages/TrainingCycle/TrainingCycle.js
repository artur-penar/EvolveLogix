// React-related imports
import React, { useCallback, useEffect, useState } from "react";

// Third-party libraries
import { useDispatch, useSelector } from "react-redux";

// Absolute imports
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import calculateNewPhaseStartDate from "features/trainingCycle/utils/calculateNewPhaseStartDate";
import {
  getCycleIdByName,
  getCycleNames,
} from "features/trainingCycle/utils/trainingCycleUtils";
import {
  setSelectedMacrocycle,
  setSelectedMesocycle,
} from "features/trainingCycle/trainingCycle";
import { useFormControls } from "features/trainingCycle/hooks/useFormControl";
import { useTrainingCycle } from "features/trainingCycle/hooks/useTrainingCycle";
import useUpdatePhaseEndDate from "features/trainingCycle/hooks/TrainingCycle/useUpdatePhaseEndDate";
import useUpdateMesocycleDetails from "features/trainingCycle/hooks/TrainingCycle/useUpdateMesocycleDetails";
import useUpdateMacrocycleDetails from "features/trainingCycle/hooks/TrainingCycle/useUpdateMacrocycleDetails";
import useInitializeCycleState from "features/trainingCycle/hooks/TrainingCycle/useInitializeCycleState";
import useUpdateMesocyclesState from "features/trainingCycle/hooks/TrainingCycle/useUpdateMesocyclesState";
import useUpdatePhasesData from "features/trainingCycle/hooks/TrainingCycle/useUpdatePhaseData";

// Relative imports
import PhaseForm from "./PhaseForm";
import TrainingCycleForm from "./TrainingCycleForm";

// CSS/other assets
import "./TrainingCycle.css";

// Component
const TrainingCycle = () => {
  // Redux hooks
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

  // Custom hooks
  const initializeCycleState = useInitializeCycleState(
    trainingCycleState,
    setSelectedMacrocycle,
    setMesocyclesData,
    handleMultipleInputChanges
  );

  useUpdateMacrocycleDetails(
    cycleFormValues,
    setSelectedMacrocycle,
    trainingCycleState,
    setMesocyclesData,
    handleMultipleInputChanges
  );

  useUpdateMesocycleDetails(
    cycleFormValues,
    mesocyclesData,
    setSelectedMesocycle,
    handleMultipleInputChanges
  );

  useUpdateMesocyclesState(
    trainingCycleState,
    selectedMacrocycle,
    mesocyclesData,
    setMesocyclesData,
    initializeCycleState
  );

  useUpdatePhasesData(
    mesocyclesData,
    trainingCycleState,
    cycleFormValues,
    setPhasesData,
    handleMultipleInputChanges,
    calculateNewPhaseStartDate
  );

  useUpdatePhaseEndDate(cycleFormValues, handleMultipleInputChanges);

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

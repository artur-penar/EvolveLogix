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
import CreateNewCycle from "./CreateNewCycle";
import PhaseForm from "./PhaseForm";
import TrainingCycleForm from "./TrainingCycleForm";

// CSS/other assets
import "./TrainingCycle.css";

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
  const [values, handleInputChange, handleMultipleInputChanges] =
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

  const updatePhaseEndDate = useCallback(() => {
    if (values["phaseStartDate"] !== "") {
      let formattedEndDate = calculatePhaseEndDate(
        values["phaseStartDate"],
        values["phaseDurationInWeeks"]
      );
      // Check if the phase end date is greater than the mesocycle end date
      // Phase end date cannot be greater than the mesocycle end date
      const phaseEndDate = new Date(formattedEndDate);
      const mesocycleEndDate = new Date(values["mesocycleEndDate"]);
      // If the phase end date is greater than the mesocycle end date, set the end date to an empty string
      if (phaseEndDate > mesocycleEndDate) {
        formattedEndDate = "";
      }
      handleMultipleInputChanges({
        phaseEndDate: formattedEndDate,
      });
    }
  }, [values["phaseStartDate"], values["phaseDurationInWeeks"]]);

  useEffect(() => {
    updatePhaseEndDate();
  }, [updatePhaseEndDate]);

  const updateMesocycleDetails = useCallback(() => {
    if (values["mesocycle"] !== "") {
      const selectedMesocycle = mesocyclesData.find(
        (mesocycle) => mesocycle.name === values["mesocycle"]
      );
      if (selectedMesocycle) {
        dispatch(setSelectedMesocycle(values["mesocycle"]));
        handleMultipleInputChanges({
          mesocycleStartDate: selectedMesocycle.start_date,
          mesocycleEndDate: selectedMesocycle.end_date,
          mesocycleDurationInWeeks: selectedMesocycle.duration,
        });
      }
    }
  }, [values["mesocycle"]]);

  useEffect(() => {
    updateMesocycleDetails();
  }, [updateMesocycleDetails]);

  const updateSelectedMacrocycleDetails = useCallback(() => {
    dispatch(setSelectedMacrocycle(values["macrocycle"]));
    const selectedMacrocycle = trainingCycleState.find(
      (macrocycle) => macrocycle.name === values["macrocycle"]
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
  }, [values["macrocycle"]]);

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
          phaseStartDate={values["phaseStartDate"]}
          phaseEndDate={values["phaseEndDate"]}
          setPhasesData={setPhasesData}
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

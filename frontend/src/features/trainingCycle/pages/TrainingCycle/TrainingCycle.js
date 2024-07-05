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
import { setSelectedMacrocycle } from "features/trainingCycle/trainingCycle";
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
  // Variables
  const macrocycleNames = getCycleNames(trainingCycleState);
  const phaseTypes = ["Hypertrophy", "Strength", "Peaking", "Deload"];

  // State hooks

  const [phasesData, setPhasesData] = useState([]);
  const [mesocyclesData, setMesocyclesData] = useState([]);
  const mesocycleNames = getCycleNames(mesocyclesData);
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

  const updateMesocycleDates = useCallback(() => {
    if (values["mesocycle"] !== "") {
      const selectedMesocycle = mesocyclesData.find(
        (mesocycle) => mesocycle.name === values["mesocycle"]
      );
      if (selectedMesocycle) {
        handleMultipleInputChanges({
          mesocycleStartDate: selectedMesocycle.start_date,
          mesocycleEndDate: selectedMesocycle.end_date,
          mesocycleDurationInWeeks: selectedMesocycle.duration,
        });
      }
    }
  }, [values["mesocycle"]]);

  useEffect(() => {
    updateMesocycleDates();
  }, [updateMesocycleDates]);

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

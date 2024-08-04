import determinePhasesData from "features/trainingCycle/utils/determinePhasesData";
import { useEffect } from "react";

/**
 * Custom hook to update phases data and calculate the start date for a new phase.
 *
 * @param {Array} mesocyclesData - The data for the mesocycles.
 * @param {Object} trainingCycleState - The current state of the training cycle.
 * @param {Object} cycleFormValues - The form values for the cycle.
 * @param {Function} setPhasesData - Function to update the phases data state.
 * @param {Function} handleMultipleInputChanges - Function to handle multiple input changes.
 * @param {Function} determinePhasesData - Function to determine phases data for the mesocycle.
 * @param {Function} calculateNewPhaseStartDate - Function to calculate the start date for a new phase.
 */
const useUpdatePhasesData = (
  mesocyclesData,
  trainingCycleState,
  cycleFormValues,
  setPhasesData,
  handleMultipleInputChanges,
  calculateNewPhaseStartDate
) => {
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
};

export default useUpdatePhasesData;

import { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to initialize the cycle state.
 *
 * @param {Array} trainingCycleState - The state of the training cycle.
 * @param {Function} setSelectedMacrocycle - Function to set the selected macrocycle.
 * @param {Function} setMesocyclesData - Function to set the mesocycles data.
 * @param {Function} handleMultipleInputChanges - Function to handle multiple input changes.
 * @returns {Function} - The initializeCycleState function.
 */

const useInitializeCycleState = (
  trainingCycleState,
  setSelectedMacrocycle,
  setMesocyclesData,
  handleMultipleInputChanges
) => {
  const dispatch = useDispatch();
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
  return initializeCycleState;
};

export default useInitializeCycleState;

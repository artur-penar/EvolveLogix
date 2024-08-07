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
      const {
        name: macrocycleName,
        start_date: macrocycleStartDate = "",
        end_date: macrocycleEndDate = "",
        mesocycles = [],
      } = trainingCycleState[0];

      const {
        start_date: mesocycleStartDate = "",
        end_date: mesocycleEndDate = "",
        duration: mesocycleDurationInWeeks = "",
      } = mesocycles[0] || {};

      dispatch(setSelectedMacrocycle(macrocycleName));
      setMesocyclesData(mesocycles);
      handleMultipleInputChanges({
        macrocycleStartDate,
        macrocycleEndDate,
        mesocycleStartDate,
        mesocycleEndDate,
        mesocycleDurationInWeeks,
      });
    }
  }, [trainingCycleState]);
  return initializeCycleState;
};

export default useInitializeCycleState;

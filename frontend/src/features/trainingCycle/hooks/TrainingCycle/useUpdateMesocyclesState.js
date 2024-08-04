import { useCallback, useEffect } from "react";

/**
 * Custom hook to update the mesocycles state based on the selected macrocycle.
 *
 * This hook uses a callback to find the selected macrocycle data from the training cycle state
 * and updates the mesocycles data accordingly. It also uses an effect to initialize or update
 * the mesocycles data when the training cycle state changes.
 *
 * @param {Array} trainingCycleState - The state containing all training cycles.
 * @param {string} selectedMacrocycle - The name of the selected macrocycle.
 * @param {Array} mesocyclesData - The current state of mesocycles data.
 * @param {Function} setMesocyclesData - Function to update the mesocycles data state.
 * @param {Function} initializeCycleState - Function to initialize the cycle state.
 *
 * @returns {void}
 */

const useUpdateMesocyclesState = (
  trainingCycleState,
  selectedMacrocycle,
  mesocyclesData,
  setMesocyclesData,
  initializeCycleState
) => {
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
};

export default useUpdateMesocyclesState;

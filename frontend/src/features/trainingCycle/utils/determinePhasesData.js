/**
 * Determine the phases data for the training cycle
 * @param {Array} mesocyclesData - Array of mesocycle data objects.
 * @param {Array} trainingCycleState - Array of training cycle data objects.
 * @param {string} mesocycleName - The name of the current mesocycle.
 */

import { getPhases } from "./trainingCycleUtils";

function determinePhasesData(
  mesocyclesData,
  trainingCycleState,
  mesocycleName
) {
  // Initialize phasesData variable as an empty array
  let phasesData = [];

  // Determine the source of phasesData based on available data
  if (mesocyclesData.length > 0) {
    // Set first mesocycle name if no mesocycleName is provided
    mesocycleName = mesocycleName || mesocyclesData[0].name;

    // Get the phases data for the current mesocycle using the getPhases function
    phasesData = getPhases(mesocyclesData, mesocycleName);
  } else if (trainingCycleState.length > 0) {
    // There is at least one macrocycle in the trainingCycleState
    const firstMacrocycle = trainingCycleState[0];

    if (firstMacrocycle.mesocycles.length > 0) {
      // There is at least one mesocycle in the first macrocycle
      phasesData = firstMacrocycle.mesocycles[0].phases;
    }
  }

  // Return the phasesData
  return phasesData;
}

export default determinePhasesData;
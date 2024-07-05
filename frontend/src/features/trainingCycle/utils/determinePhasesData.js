/**
 * Determine the phases data for the training cycle
 * @param {Array} mesocyclesData - Array of mesocycle data objects.
 * @param {Array} trainingCycleState - Array of training cycle data objects.
 * @param {string} mesocycleName - The name of the current mesocycle.
 */

import getPhases from "./getPhases";

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
    // This is the default behavior when no mesocycleName is provided
    // It mean user is on first page render
    mesocycleName = mesocycleName ? mesocycleName : mesocyclesData[0].name;

    // Get the phases data for the current mesocycle using the getPhases function
    phasesData = getPhases(mesocyclesData, mesocycleName);
    //  If there are no mesocyclesData, get the phases data from the trainingCycleState
  } else if (trainingCycleState.length > 0) {
    // Get the phases data from the first mesocycle of the trainingCycleState
    // This is the default behavior when no mesocyclesData is available
    phasesData = trainingCycleState[0].mesocycles[0].phases;
  }
  console.log("phasesData");
  console.log(phasesData);

  // Return the phasesData
  return phasesData;
}

export default determinePhasesData;

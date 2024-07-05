/**
 * Returns the training cycle names
 * @param {Array} trainingCycles - Array of training cycles
 * @returns {Array} The training cycle names
 */
export function getCycleNames(trainingCycles) {
  // Map over the trainingCycles array and return the name of each cycle
  return trainingCycles.map((cycle) => cycle.name);
}

/**
 * Returns Mesocycles data related to a Macrocycle
 * @param {Array} macrocycles - Array of macrocycles
 * @param {string} macrocycleName - Name of the macrocycle
 * @returns {Array} The macrocycle data
 */
export function getMesocycles(macrocycles, macrocycleName) {
  // Find the macrocycle with the matching name
  const macrocycle = macrocycles.find(
    (macrocycle) => macrocycle.name === macrocycleName
  );
  // Return the mesocycles data if the macrocycle exists
  return macrocycle ? macrocycle.mesocycles : [];
}

/**
 * Returns the cycle ID based on the cycle name
 * @param {string} cycleName - Name of the cycle
 * @param {Array} cycles - Array of cycles
 * @returns {string} The cycle ID
 */
export function getCycleIdByName(cycleName, cycles) {
  // Find the cycle with the matching name
  const cycle = cycles.find((cycle) => cycle.name === cycleName);
  // Return the cycle ID if the cycle exists
  return cycle ? cycle.id : null;
}

/**
 * Get phases for a Mesocycle
 * @param {Array} mesocyclesData - Array of mesocycle data objects.
 * @param {string} mesocycleName - The name of the current mesocycle.
 * @returns {Array} The phases data for the current mesocycle
 */

export function getPhases(mesocyclesData, mesocycleName) {
  // Find phases related to current mesocycle
  // Use optional chaining to safely access `phases`
  const phases = mesocyclesData.find(
    (mesocycle) => mesocycle.name === mesocycleName
  )?.phases;

  // Return phases if it has values; otherwise, return an empty array
  return phases || [];
}

/**
 * Returns calculated Phase end date
 * @param {string} startDate - Start date of the phase
 * @param {string} durationInWeeks - Duration of the phase in weeks
 * @returns {string} The end date of the phase
 */
export function calculatePhaseEndDate(startDate, durationInWeeks) {
  // Create a new Date object from the start date
  const endDate = new Date(startDate);
  // Add the duration in weeks to the start date
  endDate.setDate(endDate.getDate() + Number(durationInWeeks) * 7);
  // Return the end date in the format "YYYY-MM-DD"
  return endDate.toISOString().split("T")[0];
}

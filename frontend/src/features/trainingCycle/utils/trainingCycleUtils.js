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

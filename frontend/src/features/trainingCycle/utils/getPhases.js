/**
 * Get phases for a Mesocycle
 * @param {Array} mesocyclesData - Array of mesocycle data objects.
 * @param {string} mesocycleName - The name of the current mesocycle.
 * @returns {Array} The phases data for the current mesocycle
 */

function getPhases(mesocyclesData, mesocycleName) {
  // Find phases related to current mesocycle
  // Use optional chaining to safely access `phases`
  const phases = mesocyclesData.find(
    (mesocycle) => mesocycle.name === mesocycleName
  )?.phases;

  // Return phases if it has values; otherwise, return an empty array
  return phases || [];
}

export default getPhases;

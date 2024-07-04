/**
 * Calculates the start date for a new phase based on existing phases.
 * @param {Array} phasesData - Array of phase data objects.
 * @param {string} defaultStartDate - Default start date in no phases exist.
 * @returns {string} The calculated start date
 */

function calculateNewPhaseStartDate(phasesData, defaultStartDate) {
  // Initialize newPhaseStartDate variable as a empty string
  let newPhaseStartDate = "";

  // CHeck if phasesData is not empty
  if (phasesData.length > 0) {
    // Get the last phase from phasesData
    const lastPhase = phasesData[phasesData.length - 1];

    // Get the end date of the last phase
    const lastPhaseEndDate = new Date(lastPhase.end_date);

    // Increment the lastPhaseEndDate by one day
    lastPhaseEndDate.setDate(lastPhaseEndDate.getDate() + 1);

    // Format the newPhaseStartDate as a string
    newPhaseStartDate = lastPhaseEndDate.toISOString().split("T")[0];
  } else {
    // If phasesData is empty, set the newPhaseStartDate to the defaultStartDate
    newPhaseStartDate = defaultStartDate;
  }
  return newPhaseStartDate;
}

// Export the calculateNewPhaseStartDate function
export default calculateNewPhaseStartDate;

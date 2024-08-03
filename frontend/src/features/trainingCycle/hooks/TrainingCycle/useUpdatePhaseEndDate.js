import { calculatePhaseEndDate } from "features/trainingCycle/utils/trainingCycleUtils";
import { useCallback, useEffect } from "react";
/**
 * Custom hook to update the phase end date based on the phase start date and duration.
 *
 * This hook calculates the phase end date using the phase start date and phase duration in weeks.
 * It ensures that the phase end date does not exceed the mesocycle end date. If the calculated
 * phase end date is greater than the mesocycle end date, it sets the phase end date to an empty string.
 *
 * @param {Object} cycleFormValues - An object containing form values including phaseStartDate, phaseDurationInWeeks, and mesocycleEndDate.
 * @param {Function} handleMultipleInputChanges - A function to update multiple form values.
 *
 * Dependencies:
 * - calculatePhaseEndDate: A function to calculate the phase end date based on the start date and duration.
 *
 * Usage:
 * Call this hook within a functional component to automatically update the phase end date whenever
 * the phase start date or duration changes.
 */

const useUpdatePhaseEndDate = (cycleFormValues, handleMultipleInputChanges) => {
  const updatePhaseEndDate = useCallback(() => {
    if (cycleFormValues["phaseStartDate"] !== "") {
      let formattedEndDate = calculatePhaseEndDate(
        cycleFormValues["phaseStartDate"],
        cycleFormValues["phaseDurationInWeeks"]
      );
      // Check if the phase end date is greater than the mesocycle end date
      // Phase end date cannot be greater than the mesocycle end date
      const phaseEndDate = new Date(formattedEndDate);
      const mesocycleEndDate = new Date(cycleFormValues["mesocycleEndDate"]);
      // If the phase end date is greater than the mesocycle end date, set the end date to an empty string
      if (phaseEndDate > mesocycleEndDate) {
        formattedEndDate = "";
      }
      handleMultipleInputChanges({
        phaseEndDate: formattedEndDate,
      });
    }
  }, [cycleFormValues, handleMultipleInputChanges]);

  useEffect(() => {
    updatePhaseEndDate();
  }, [updatePhaseEndDate]);
};

export default useUpdatePhaseEndDate;

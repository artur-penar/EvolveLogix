import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to update mesocycle details based on the selected mesocycle.
 *
 * @param {Object} cycleFormValues - An object containing form values including the selected mesocycle.
 * @param {Array} mesocyclesData - An array of mesocycle objects, each containing name, start_date, end_date, and duration.
 * @param {Function} setSelectedMesocycle - A Redux action to set the selected mesocycle.
 * @param {Function} handleMultipleInputChanges - A function to update multiple form values.
 *
 * @returns {void}
 *
 * The hook updates the mesocycle details such as start date, end date, and duration in weeks
 * based on the selected mesocycle from the form values. It dispatches an action to set the selected
 * mesocycle and updates multiple input fields with the corresponding mesocycle details.
 *
 * The updateMesocycleDetails function is memoized using useCallback to prevent unnecessary re-renders.
 * It checks if the selected mesocycle is not an empty string, finds the corresponding mesocycle data,
 * and updates the form values with the mesocycle details.
 *
 * The useEffect hook ensures that the updateMesocycleDetails function is called whenever the selected
 * mesocycle changes.
 */

const useUpdateMesocycleDetails = (
  cycleFormValues,
  mesocyclesData,
  setSelectedMesocycle,
  handleMultipleInputChanges
) => {
  const dispatch = useDispatch();
  const updateMesocycleDetails = useCallback(() => {
    if (cycleFormValues["mesocycle"] !== "") {
      const selectedMesocycle = mesocyclesData.find(
        (mesocycle) => mesocycle.name === cycleFormValues["mesocycle"]
      );
      if (selectedMesocycle) {
        dispatch(setSelectedMesocycle(cycleFormValues["mesocycle"]));
        handleMultipleInputChanges({
          mesocycleStartDate: selectedMesocycle.start_date,
          mesocycleEndDate: selectedMesocycle.end_date,
          mesocycleDurationInWeeks: selectedMesocycle.duration,
        });
      }
    }
  }, [cycleFormValues["mesocycle"]]);

  useEffect(() => {
    updateMesocycleDetails();
  }, [updateMesocycleDetails]);
};

export default useUpdateMesocycleDetails;

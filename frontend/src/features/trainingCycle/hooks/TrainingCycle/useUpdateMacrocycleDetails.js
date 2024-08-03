import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
/**
 * Custom hook to update macrocycle details based on the selected macrocycle.
 *
 * @param {Object} cycleFormValues - An object containing form values including the selected macrocycle.
 * @param {Function} setSelectedMacrocycle - A Redux action to set the selected macrocycle.
 * @param {Array} trainingCycleState - An array of macrocycle objects, each containing name, start_date, end_date, and mesocycles.
 * @param {Function} setMesocyclesData - A function to update the mesocycles data state.
 * @param {Function} handleMultipleInputChanges - A function to update multiple form values.
 *
 * @returns {void}
 *
 * The hook updates the macrocycle details such as start date, end date, and mesocycles
 * based on the selected macrocycle from the form values. It dispatches an action to set the selected
 * macrocycle and updates multiple input fields with the corresponding macrocycle details.
 *
 * The updateMacrocycleDetails function is memoized using useCallback to prevent unnecessary re-renders.
 * It checks if the selected macrocycle is not an empty string, finds the corresponding macrocycle data,
 * and updates the form values with the macrocycle details.
 *
 * The useEffect hook ensures that the updateMacrocycleDetails function is called whenever the selected
 * macrocycle changes.
 */

const useUpdateMacrocycleDetails = (
  cycleFormValues,
  setSelectedMacrocycle,
  trainingCycleState,
  setMesocyclesData,
  handleMultipleInputChanges
) => {
  const dispatch = useDispatch();
  const updateMacrocycleDetails = useCallback(() => {
    dispatch(setSelectedMacrocycle(cycleFormValues["macrocycle"]));
    const selectedMacrocycle = trainingCycleState.find(
      (macrocycle) => macrocycle.name === cycleFormValues["macrocycle"]
    );
    if (selectedMacrocycle) {
      setMesocyclesData(selectedMacrocycle.mesocycles);
      handleMultipleInputChanges({
        macrocycleStartDate: selectedMacrocycle.start_date || "",
        macrocycleEndDate: selectedMacrocycle.end_date || "",
        mesocycle: selectedMacrocycle.mesocycles[0]?.name || "",
        mesocycleStartDate: selectedMacrocycle.mesocycles[0]?.start_date || "",
        mesocycleEndDate: selectedMacrocycle.mesocycles[0]?.end_date || "",
        mesocycleDurationInWeeks:
          selectedMacrocycle.mesocycles[0]?.duration || "",
      });
    }
  }, [cycleFormValues["macrocycle"]]);

  useEffect(() => {
    updateMacrocycleDetails();
  }, [updateMacrocycleDetails]);
};

export default useUpdateMacrocycleDetails;

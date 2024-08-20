import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import { useDispatch } from "react-redux";

/**
 * Custom hook to handle adding a phase.
 *
 * @param {string} mesocycleId - The ID of the mesocycle.
 * @param {string} phaseType - The type of the phase.
 * @param {string} phaseStartDate - The start date of the phase.
 * @param {string} phaseEndDate - The end date of the phase.
 * @param {number} microcyclesNumber - The number of microcycles in the phase.
 * @param {Array} phaseTrainingProgram - The training program for the phase.
 * @param {Function} setAddRequestStatus - Function to set the status of the add request.
 * @returns {Function} - Function to handle adding a phase.
 */

const useAddPhase = (
  mesocycleId,
  phaseType,
  phaseStartDate,
  phaseEndDate,
  microcyclesNumber,
  phaseTrainingProgram,
  setAddRequestStatus
) => {
  const dispatch = useDispatch();
  // Event handler for adding a phase
  const handleAddPhase = async () => {
    const phaseData = {
      mesocycle: mesocycleId,
      type: phaseType,
      start_date: phaseStartDate,
      end_date_: phaseEndDate,
      duration: microcyclesNumber,
      training_sessions: phaseTrainingProgram,
    };

    const resultAction = await dispatch(addPhase(phaseData));
    if (resultAction.meta.requestStatus === "fulfilled") {
      setAddRequestStatus("Phase added successfully");
    } else if (resultAction.meta.requestStatus === "rejected") {
      const errorPayload = resultAction.payload;
      if (errorPayload && errorPayload.mesocycle) {
        setAddRequestStatus(
          <>
            Adding Phase failed
            <br />
            Mesocycle: {errorPayload.mesocycle[0]}
          </>
        );
      }
    }

    dispatch(updateUpdateTrigger());
  };

  return handleAddPhase;
};

export default useAddPhase;

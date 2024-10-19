import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTrainingSession, updateTrainingSession } from "../log";

/**
 * Custom hook to handle form submission for training data.
 *
 * This hook sets up the necessary dispatch and navigation functions,
 * prepares the training data for submission, and handles the form submission
 * logic, including preventing the default form submission behavior.
 *
 * @param {Object} trainingData - The current state of the training data.
 * @param {Object} editData - Data to be edited (if in edit mode).
 * @param {boolean} isEditMode - Flag indicating if the form is in edit mode.
 * @param {number} selectedTrainingLogId - ID of the selected training log.
 * @returns {Function} handleSubmit - Function to handle form submission.
 *
 * The handleSubmit function prevents the default form submission behavior,
 * prepares the training data for submission, and dispatches the appropriate
 * action (add or update) based on the edit mode. It also navigates to the
 * training log page after submission.
 */
const useHandleSubmit = (
  trainingData,
  editData,
  isEditMode,
  selectedTrainingLogId
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prepareExercisesForSubmission = (exercises) => {
    return exercises.map((exercise) => ({
      exercise: exercise.exercise,
      sets: exercise.sets.map((set) => ({
        weight: set.weight,
        repetitions: set.repetitions,
        is_completed: set.is_completed,
      })),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const baseData = {
      description: trainingData.description,
      date: trainingData.date,
      comment: trainingData.comment,
      exercises: prepareExercisesForSubmission(trainingData.exercises),
    };

    const dataToSubmit = isEditMode
      ? {
          id: editData.id,
          ...baseData,
        }
      : {
          training_log_id: selectedTrainingLogId,
          training_session: baseData,
        };

    if (isEditMode) {
      dispatch(updateTrainingSession(dataToSubmit));
    } else {
      dispatch(addTrainingSession(dataToSubmit));
    }
    navigate("/training-log");
  };

  return handleSubmit;
};

export default useHandleSubmit;

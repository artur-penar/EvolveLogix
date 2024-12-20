import { createTrainingLog } from "features/trainingLogs/log";

/**
 * Handles the creation of a new training log.
 *
 * @param {Function} dispatch - The dispatch function to trigger actions.
 * @param {string} newLogName - The name of the new training log to be created.
 */
const handleCreateTrainingLog = (dispatch, newLogName) => {
  dispatch(createTrainingLog({ name: newLogName }));
};

export default handleCreateTrainingLog;

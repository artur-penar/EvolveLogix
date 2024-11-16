import { setSelectedTrainingLog } from "features/trainingLogs/log";

/**
 * Handles the change event for selecting a training log.
 *
 * @param {Object} e - The event object from the change event.
 * @param {Array} trainingLogs - The array of training log objects.
 * @param {Function} setLocalSelectedLog - Function to update the local state with the selected log name.
 * @param {Function} dispatch - The dispatch function to update the global state with the selected training log.
 */
const handleTrainingLogChange = (
  e,
  trainingLogs,
  setLocalSelectedLog,
  dispatch
) => {
  const selectedLogName = e.target.value;
  const selectedLog = trainingLogs.find((log) => log.name === selectedLogName);

  setLocalSelectedLog(selectedLogName);
  dispatch(setSelectedTrainingLog(selectedLog));
};

export default handleTrainingLogChange;

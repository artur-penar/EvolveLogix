import { useEffect } from "react";

/**
 * Custom hook to synchronize the local selected training log with the Redux selected training log.
 *
 * @param {Object} localSelectedLog - The currently selected training log stored locally.
 * @param {Object} reduxSelectedLog - The currently selected training log from the Redux store.
 * @param {Function} setLocalSelectedLog - Function to update the local selected training log.
 */
const useSyncTrainingLog = (
  localSelectedLog,
  reduxSelectedLog,
  setLocalSelectedLog
) => {
  useEffect(() => {
    if (!localSelectedLog && reduxSelectedLog) {
      setLocalSelectedLog(reduxSelectedLog);
    }
  }, [reduxSelectedLog]);
};

export default useSyncTrainingLog;

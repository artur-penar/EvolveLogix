import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to set the initial training log.
 *
 * @param {Array} trainingLogs - Array of training log objects.
 * @param {Object} reduxSelectedLog - The currently selected training log from Redux.
 * @param {Function} setLocalSelectedLog - Function to set the locally selected training log.
 * @param {Function} setSelectedTrainingLog - Redux action to set the selected training log.
 *
 * @returns {void}
 */
const useSetInitialTrainingLog = (
  trainingLogs,
  reduxSelectedLog,
  setLocalSelectedLog,
  setSelectedTrainingLog
) => {
  const dispatch = useDispatch();

  const selectedLog = trainingLogs.find(
    (log) => log.id === reduxSelectedLog.id
  );

  useEffect(() => {
    if (trainingLogs.length > 0 && !selectedLog) {
      const logToSelect = trainingLogs[0].name;
      setLocalSelectedLog(logToSelect);
      dispatch(
        setSelectedTrainingLog(
          trainingLogs.find((log) => log.name === logToSelect)
        )
      );
    }
  }, [dispatch, trainingLogs]);
};

export default useSetInitialTrainingLog;

import { getTrainingLogs } from "features/trainingLogs/log";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to fetch training logs if they are not already provided.
 *
 * @param {Array} trainingLogsData - The current training logs data.
 *
 * @returns {void}
 *
 * @example
 * const trainingLogsData = useSelector(state => state.trainingLogs.data);
 * useGetTrainingLogs(trainingLogsData);
 */

const useGetTrainingLogs = (trainingLogsData) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!trainingLogsData) {
      console.log("fetching training logs");
      dispatch(getTrainingLogs());
    }
  }, [trainingLogsData, dispatch]);
};

export default useGetTrainingLogs;

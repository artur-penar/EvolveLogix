import { getTrainingLogs } from "features/trainingLogs/log";
import { useDispatch } from "react-redux";

/**
 * Custom hook to fetch training logs.
 *
 * This hook dispatches an action to fetch training logs if the provided
 * trainingLogs array is empty.
 *
 * @param {Array} trainingLogs - The array of training logs.
 */
const useFetchTrainingLogs = (trainingLogs) => {
  const dispatch = useDispatch();
  if (trainingLogs.length === 0) {
    dispatch(getTrainingLogs());
  }
};

export default useFetchTrainingLogs;

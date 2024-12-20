import useGetLatestRecords from "features/trainingCycle/hooks/PercentageCalculator/useGetLatestStrengthRecords";
import useFetchStrengthRecords from "features/trainingCycle/hooks/PhaseForm/useFetchStrengthRecords";

/**
 * Custom hook to fetch and process the latest strength records.
 *
 * This hook combines the functionality of fetching strength records and
 * getting the latest records. It processes the fetched records to return
 * an object where each key is an exercise name and the value is the latest
 * record for that exercise.
 *
 * @returns {Object} strengthRecords - An object containing the latest strength records.
 *
 * The returned object has the following structure:
 * {
 *   exerciseName1: latestRecord1,
 *   exerciseName2: latestRecord2,
 *   ...
 * }
 *
 * Each `latestRecord` is the first entry in the array of records for that exercise.
 */
const useStrengthRecords = () => {
  const latestRecords = useGetLatestRecords(useFetchStrengthRecords());
  const strengthRecords = Object.entries(latestRecords).reduce(
    (acc, [exerciseName, record]) => {
      acc[exerciseName] = record[0];
      return acc;
    },
    {}
  );

  return strengthRecords;
};

export default useStrengthRecords;

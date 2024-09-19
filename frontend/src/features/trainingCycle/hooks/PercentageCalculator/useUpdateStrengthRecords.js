import { useMemo } from "react";

/**
 * This hook updates the strength records to include an "Other" exercise.
 * This allows the user to input their own weight and calculate the converted value.
 * @param {Array} strengthRecords - The strength records to update
 * @returns {Array} - The updated strength records
 */

const useUpdateStrengthRecords = (strengthRecords) => {
  return useMemo(() => {
    return strengthRecords.length === 0
      ? [{ record_date: null, exercise: "Other", weight: 0 }]
      : [
          ...strengthRecords,
          { record_date: null, exercise: "Other", weight: 0 },
        ];
  }, strengthRecords);
};

export default useUpdateStrengthRecords;

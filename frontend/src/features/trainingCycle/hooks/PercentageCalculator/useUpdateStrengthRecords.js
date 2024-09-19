import { useMemo } from "react";

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

import { useEffect, useState } from "react";

const useOrganizeStrengthRecords = (strengthRecords) => {
  const defaultPowerliftsRecords = {
    Squat: "0.0",
    "Bench press": "0.0",
    Deadlift: "0.0",
  };

  // State data
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [powerliftsRecords, setPowerliftsRecords] = useState();
  const [otherLiftsRecords, setOtherLiftsRecords] = useState();

  const groupRecordsByExercise = (strengthRecords) => {
    let groupedStrengthRecords = {};
    if (strengthRecords) {
      groupedStrengthRecords = strengthRecords.reduce((acc, record) => {
        const exerciseName = record.exercise;
        if (!acc[exerciseName]) {
          acc[exerciseName] = [];
        }
        acc[exerciseName].push({
          weight: record.weight,
          record_date: record.record_date,
          percent_increase: record.percent_increase,
        });
        return acc;
      }, {});
    } else {
      groupedStrengthRecords = defaultPowerliftsRecords;
    }
    return groupedStrengthRecords;
  };

  const groupLiftsByType = (processedStrengthRecords, isPowerlifts) => {
    const powerlifts = ["Squat", "Bench press", "Deadlift"];
    const processedLifts = Object.fromEntries(
      Object.entries(processedStrengthRecords).filter(([exerciseName]) =>
        isPowerlifts
          ? powerlifts.includes(exerciseName)
          : !powerlifts.includes(exerciseName)
      )
    );
    return processedLifts;
  };

  useEffect(() => {
    let processedStrengthRecords = groupRecordsByExercise(strengthRecords);
    const groupedPowerlifts = groupLiftsByType(processedStrengthRecords, true);
    const groupedOtherLifts = groupLiftsByType(processedStrengthRecords, false);

    setPowerliftsRecords(groupedPowerlifts);
    setOtherLiftsRecords(groupedOtherLifts);
    setIsDataLoading(false);
  }, [strengthRecords]);

  return { powerliftsRecords, otherLiftsRecords, isDataLoading };
};

export default useOrganizeStrengthRecords;

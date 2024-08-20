import RecordDisplay from "features/users/components/StrengthRecords/RecordDisplay";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const POWERLIFTS_EXERCISES = ["Squat", "Bench press", "Deadlift"];

const getLatestRecords = (records) => {
  return records.reduce((latest, record) => {
    if (
      !latest[record.exercise] ||
      record.record_date > latest[record.exercise][0].record_date
    ) {
      latest[record.exercise] = [];
      latest[record.exercise].push(record);
    }
    return latest;
  }, {});
};

const RecordsDisplayContainer = () => {
  const strengthRecords = useSelector((state) => state.strengthRecords.records);

  // Derived state
  const powerlifts = strengthRecords.filter((record) =>
    POWERLIFTS_EXERCISES.includes(record.exercise)
  );
  const otherExercises = strengthRecords.filter(
    (record) => !POWERLIFTS_EXERCISES.includes(record.exercise)
  );

  const latestPowerlifts = useMemo(
    () => getLatestRecords(powerlifts),
    [powerlifts]
  );
  const latestOtherExercises = useMemo(
    () => getLatestRecords(otherExercises),
    [otherExercises]
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <RecordDisplay
          formData={latestPowerlifts}
          isPowerlifts={true}
          simple={true}
          isCycleVersion={true}
          styleClassName={"pf-record-display"}
        />
      </div>
      <div style={{ flex: 1, marginLeft: "5px" }}>
        <RecordDisplay
          formData={latestOtherExercises}
          isPowerlifts={false}
          simple={true}
          isCycleVersion={true}
          styleClassName={"pf-record-display"}
        />
      </div>
    </div>
  );
};

export default RecordsDisplayContainer;

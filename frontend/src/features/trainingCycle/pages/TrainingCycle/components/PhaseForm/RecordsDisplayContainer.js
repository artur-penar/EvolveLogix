import RecordDisplay from "features/users/components/StrengthRecords/RecordDisplay";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getLatestRecords } from "features/trainingCycle/utils/getLatestRecords";
import "./RecordsDisplayContainer.css";

const POWERLIFTS_EXERCISES = ["Squat", "Bench press", "Deadlift"];

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
    <div className="records-container">
      <div className="record-section powerlifts-section">
        <RecordDisplay
          formData={latestPowerlifts}
          isPowerlifts={true}
          simple={true}
          isCycleVersion={true}
          styleClassName={"record-display"}
        />
      </div>
      <div className="record-section other-exercises-section">
        <RecordDisplay
          formData={latestOtherExercises}
          isPowerlifts={false}
          simple={true}
          isCycleVersion={true}
          styleClassName={"record-display"}
        />
      </div>
    </div>
  );
};

export default RecordsDisplayContainer;

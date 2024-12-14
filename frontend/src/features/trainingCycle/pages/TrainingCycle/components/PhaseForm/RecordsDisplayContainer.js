import StrengthRecordsDisplay from "features/users/components/Shared/StrengthRecordsDisplay";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getLatestStrengthRecords } from "features/trainingCycle/utils/getLatestStrengthRecords";
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
    () => getLatestStrengthRecords(powerlifts),
    [powerlifts]
  );
  const latestOtherExercises = useMemo(
    () => getLatestStrengthRecords(otherExercises),
    [otherExercises]
  );

  return (
    <div className="records-container">
      <div className="record-section powerlifts-section">
        <StrengthRecordsDisplay
          formData={latestPowerlifts}
          isPowerlifts={true}
          isSimpleView={true}
          isCycleVersion={true}
          styleClassName={"record-display"}
        />
      </div>
      <div className="record-section other-exercises-section">
        <StrengthRecordsDisplay
          formData={latestOtherExercises}
          isPowerlifts={false}
          isSimpleView={true}
          isCycleVersion={true}
          styleClassName={"record-display"}
        />
      </div>
    </div>
  );
};

export default RecordsDisplayContainer;

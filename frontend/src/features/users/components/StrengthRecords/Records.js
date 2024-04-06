import React, { useEffect, useState } from "react";
import RecordDisplay from "./RecordDisplay";
import { useNavigate } from "react-router-dom";
import "./StrengthRecords.css";
import NewStrengthRecord from "./NewStrengthRecord";

const Records = ({ strengthRecords, simple, styleClassName }) => {
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  // State data
  const [powerliftsRecords, setPowerliftsRecords] = useState();
  const [otherLiftsRecords, setOtherLiftsRecords] = useState();
  const defaultPowerliftsRecords = {
    Squat: "0.0",
    "Bench press": "0.0",
    Deadlift: "0.0",
  };

  useEffect(() => {
    let processedStrengthRecords = {};
    const powerlifts = ["Squat", "Bench press", "Deadlift"];
    if (strengthRecords) {
      processedStrengthRecords = strengthRecords.reduce((acc, record) => {
        const exerciseName = record.exercise.name;
        if (!acc[exerciseName]) {
          acc[exerciseName] = [];
        }
        acc[exerciseName].push({
          weight: record.weight,
          record_date: record.record_date,
        });
        return acc;
      }, {});
    } else {
      processedStrengthRecords = defaultPowerliftsRecords;
    }
    const processedPowerlifts = Object.fromEntries(
      Object.entries(processedStrengthRecords).filter((exercise) =>
        powerlifts.includes(exercise[0])
      )
    );
    const processedOtherLifts = Object.fromEntries(
      Object.entries(processedStrengthRecords).filter(
        (exercise) => !powerlifts.includes(exercise[0])
      )
    );

    setPowerliftsRecords(processedPowerlifts);
    setOtherLiftsRecords(processedOtherLifts);
    setIsDataLoading(false);
  }, [strengthRecords]);

  const handleEdit = () => {
    navigate("/strength-records");
  };

  return (
    <div className="user-details-container">
      {simple && <h3>Strength Records:</h3>}
      {isDataLoading ? (
        <p>Loading</p>
      ) : (
        <>
        <NewStrengthRecord/>
       
          <RecordDisplay
            formData={powerliftsRecords}
            isPowerlifts={true}
            handleEdit={handleEdit}
            simple={simple}
            styleClassName={styleClassName}
          />
          <RecordDisplay
            formData={otherLiftsRecords}
            isPowerlifts={false}
            handleEdit={handleEdit}
            simple={simple}
            styleClassName={styleClassName}
          />
          {simple && (
            <button className="dashboard-button" onClick={handleEdit}>
              Go To
            </button>
          )}
          {!simple && (
            <button
              style={{
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
              }}
            >
              Add new record
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Records;

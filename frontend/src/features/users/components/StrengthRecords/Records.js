import React, { useEffect, useState } from "react";
import RecordDisplay from "./RecordDisplay";
import { useNavigate } from "react-router-dom";
import "./StrengthRecords.css";

const Records = ({ strengthRecords, simple, styleClassName }) => {
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  // State data
  const [strengthRecordsFormData, setStrengthRecordsFormData] = useState([]);
  const defaultStrengthRecords = {
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
        if (powerlifts.includes(exerciseName)) {
          if (!acc[exerciseName]) {
            acc[exerciseName] = [];
          }
          acc[exerciseName].push({
            weight: record.weight,
            record_date: record.record_date,
          });
        }
        return acc;
      }, {});
    } else {
      processedStrengthRecords = defaultStrengthRecords;
    }

    setStrengthRecordsFormData(processedStrengthRecords);
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
          <RecordDisplay
            formData={strengthRecordsFormData}
            handleEdit={handleEdit}
            simple={simple}
            styleClassName={styleClassName}
          />
          <RecordDisplay
            formData={strengthRecordsFormData}
            handleEdit={handleEdit}
            simple={simple}
            styleClassName={styleClassName}
          />
        </>
      )}
    </div>
  );
};

export default Records;

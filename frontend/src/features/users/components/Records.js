import React, { useEffect, useState } from "react";
import RecordDisplay from "./RecordDisplay";
import { useNavigate } from "react-router-dom";
import "./StrengthRecords.css";

const Records = ({ strengthRecords, simple, styleClassName}) => {
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState();

  useEffect(() => {
    let processedStrengthRecords = {};
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
      processedStrengthRecords = {
        Squat: "0.0",
        "Bench press": "0.0",
        Deadlift: "0.0",
      };
    }

    const { updated_at, ...records } = processedStrengthRecords;
    setLastUpdateDate(new Date(updated_at));
    setStrengthRecordsFormData(records);
    setIsDataLoading(false);
  }, [strengthRecords]);

  // State data
  const [strengthRecordsFormData, setStrengthRecordsFormData] = useState([]);

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
        </>
      )}
    </div>
  );
};

export default Records;

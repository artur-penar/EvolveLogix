import React, { useEffect, useMemo, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import DetailEditForm from "./DetailEditForm";
import { useDispatch, useSelector } from "react-redux";
import "./StrengthRecords.css";
import { getAllStrengthRecords } from "../strengthRecordSlice";

const StrengthRecords = () => {
  const dispatch = useDispatch();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState();
  const strengthRecords = useSelector(
    (state) => state.strengthRecordState.strengthRecords
  );

  useEffect(() => {
    if (strengthRecords.length === 0) {
      dispatch(getAllStrengthRecords());
    }
  }, []);

  useEffect(() => {
    let processedStrengthRecords = {};
    if (strengthRecords.length > 0) {
      processedStrengthRecords = strengthRecords.reduce((acc, record) => {
        const exerciseName = record.exercise.name;
        acc[exerciseName] = record.weight;
        acc.updated_at = record.record_date;
        return acc;
      }, {});
    } else {
      processedStrengthRecords = {
        Squat: "0.0",
        "Bench press": "0.0",
        Deadlift: "0.0",
        updated_at: "2000-01-01T00:00:00.000Z",
      };
    }

    const { updated_at, ...records } = processedStrengthRecords;
    setLastUpdateDate(new Date(updated_at));
    setStrengthRecordsFormData(records);
    setIsDataLoading(false);
  }, [strengthRecords]);

  // State data
  const [isStrengthRecordEditing, setIsStrengthRecordEditing] = useState(false);
  const [strengthRecordsFormData, setStrengthRecordsFormData] = useState([]);

  const handleEdit = () => {
    setIsStrengthRecordEditing(true);
  };

  const handleSubmit = () => {
    setIsStrengthRecordEditing(false);
  };

  const handleInputChange = (event) => {
    setStrengthRecordsFormData({
      ...strengthRecordsFormData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="user-details-container">
      <h3>Strength Records:</h3>
      {isDataLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>{`Updated at: ${lastUpdateDate.toLocaleDateString()}`}</p>
          {isStrengthRecordEditing ? (
            <DetailEditForm
              formData={strengthRecordsFormData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : isDataLoading ? (
            <p>Loading</p>
          ) : (
            <DetailDisplay formData={strengthRecordsFormData} handleEdit={handleEdit} />
          )}
        </>
      )}
    </div>
  );
};

export default StrengthRecords;

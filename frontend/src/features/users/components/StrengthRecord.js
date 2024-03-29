import React, { useEffect, useMemo, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import DetailEditForm from "./DetailEditForm";
import { useDispatch, useSelector } from "react-redux";
import "./StrengthRecords.css";
import { getAllStrengthRecords } from "../strengthRecordSlice";

const StrengthRecords = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const strengthRecords = useSelector(
    (state) => state.strengthRecordState.strengthRecords
  );

  const [updatedAtData, setUpdatedAtData] = useState();

  useEffect(() => {
    if (strengthRecords.length === 0) {
      dispatch(getAllStrengthRecords());
    }
  }, []);

  useEffect(() => {
    let processedRecords = {};
    if (strengthRecords.length > 0) {
      processedRecords = strengthRecords.reduce((acc, record) => {
        const exerciseName = record.exercise.name;
        acc[exerciseName] = record.weight;
        acc.updated_at = record.record_date;
        return acc;
      }, {});
    } else {
      processedRecords = {
        Squat: "0.0",
        "Bench press": "0.0",
        Deadlift: "0.0",
        updated_at: "2000-01-01T00:00:00.000Z",
      };
    }

    const { updated_at, ...records } = processedRecords;
    setUpdatedAtData(new Date(updated_at));
    setFormData(records);
    setIsLoading(false);
  }, [strengthRecords]);

  // State data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="user-details-container">
      <h3>Strength Records:</h3>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
          {isEditing ? (
            <DetailEditForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : isLoading ? (
            <p>Loading</p>
          ) : (
            <DetailDisplay formData={formData} handleEdit={handleEdit} />
          )}
        </>
      )}
    </div>
  );
};

export default StrengthRecords;

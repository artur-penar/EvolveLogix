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
      console.log("Strength record dispatching");
      dispatch(getAllStrengthRecords());
      console.log(strengthRecords);
    }
  }, []);

  useEffect(() => {
    const processedRecords = strengthRecords.reduce((acc, record) => {
      const exerciseName = record.exercise.name;
      acc[exerciseName] = record.weight;
      acc.updated_at = record.record_date;
      return acc;
    }, {});

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

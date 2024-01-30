import React, { useEffect, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import DetailEditForm from "./DetailEditForm";
import { useDispatch, useSelector } from "react-redux";
import "./StrengthRecords.css";
import { getAllStrengthRecords } from "../strengthRecordSlice";

const StrengthRecords = () => {
  const dispatch = useDispatch();
  const strengthRecords = useSelector((state) => state.strengthRecords);

  useEffect(() => {
    if (!strengthRecords) {
      console.log("Strength record dispatching");
      dispatch(getAllStrengthRecords());
    } else {
      console.log("Strength record already exists");
      console.log(strengthRecords);
    }
  }, []);

  const userDetail = {
    "bench press": 100,
    deadlift: 200,
    squat: 300,
    "overhead press": 400,
    "barbell row": 500,
    updated_at: "2021-01-01",
  };
  const { updated_at, ...bodyMeasurements } = userDetail;
  const updatedAtData = new Date(updated_at);

  // State data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(bodyMeasurements);

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
      <p>{`Updated at: ${updatedAtData.toLocaleDateString()}`}</p>
      {isEditing ? (
        <DetailEditForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <DetailDisplay formData={formData} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default StrengthRecords;

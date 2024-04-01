import React, { useEffect, useMemo, useState } from "react";
import DetailDisplay from "./DetailDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getAllStrengthRecords } from "../strengthRecordSlice";
import { useNavigate } from "react-router-dom";
import "./StrengthRecords.css";

const StrengthRecords = ({ strengthRecords }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState();
  // const strengthRecords = useSelector((state) => state.strengthRecords.records);

  // useEffect(() => {
  //   if (strengthRecords.length === 0) {
  //     dispatch(getAllStrengthRecords());
  //   }
  // }, []);

  console.log("StrengthRecords component")
  console.log(strengthRecords);
  useEffect(() => {
    let processedStrengthRecords = {};
    if (strengthRecords) {
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
  const [strengthRecordsFormData, setStrengthRecordsFormData] = useState([]);

  const handleEdit = () => {
    navigate("/strength-records");
  };

  return (
    <div className="user-details-container">
      <h3>Strength Records:</h3>
      {isDataLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>{`Updated at: ${lastUpdateDate.toLocaleDateString()}`}</p>

          <DetailDisplay
            formData={strengthRecordsFormData}
            handleEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default StrengthRecords;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StrengthRecordsDisplay from "../Shared/StrengthRecords/StrengthRecordsDisplay";
import NewStrengthRecord from "./NewStrengthRecord";
import PanelHeader from "../PanelHeader/PanelHeader";

const StrengthRecordsPanel = ({
  strengthRecords,
  isSimpleView,
  styleClassName,
}) => {
  const navigate = useNavigate();
  const [isDataLoading, setIsDataLoading] = useState(true);
  // State data
  const [powerliftsRecords, setPowerliftsRecords] = useState();
  const [otherLiftsRecords, setOtherLiftsRecords] = useState();
  const [isAddNewRecordVisible, setIsAddNewRecordVisible] = useState(false);
  const defaultPowerliftsRecords = {
    Squat: "0.0",
    "Bench press": "0.0",
    Deadlift: "0.0",
  };

  const handleAddNewRecord = () => {
    setIsAddNewRecordVisible(true);
  };

  useEffect(() => {
    let processedStrengthRecords = {};
    const powerlifts = ["Squat", "Bench press", "Deadlift"];
    if (strengthRecords) {
      processedStrengthRecords = strengthRecords.reduce((acc, record) => {
        const exerciseName = record.exercise;
        if (!acc[exerciseName]) {
          acc[exerciseName] = [];
        }
        acc[exerciseName].push({
          weight: record.weight,
          record_date: record.record_date,
          percent_increase: record.percent_increase,
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
      {isSimpleView && <PanelHeader title="Strength Records" />}
      {isDataLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <StrengthRecordsDisplay
            formData={powerliftsRecords}
            isPowerlifts={true}
            handleEdit={handleEdit}
            isSimpleView={isSimpleView}
            styleClassName={styleClassName}
          />
          <StrengthRecordsDisplay
            formData={otherLiftsRecords}
            isPowerlifts={false}
            handleEdit={handleEdit}
            isSimpleView={isSimpleView}
            styleClassName={styleClassName}
          />

          {isAddNewRecordVisible && <NewStrengthRecord />}

          {isSimpleView && (
            <button className="user-details-button" onClick={handleEdit}>
              Go To
            </button>
          )}
          {!isSimpleView && !isAddNewRecordVisible && (
            <button
              onClick={handleAddNewRecord}
              style={{
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
                marginTop: "10px",
                backgroundColor: "#007bff",
                padding: "10px 20px",
                color: "white",
              }}
            >
              Add record
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default StrengthRecordsPanel;

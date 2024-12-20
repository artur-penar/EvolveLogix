import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StrengthRecordsDisplay from "../Shared/StrengthRecords/StrengthRecordsDisplay";
import NewStrengthRecord from "./NewStrengthRecord";
import PanelHeader from "../PanelHeader/PanelHeader";
import useOrganizeStrengthRecords from "./useOrganizeStrengthRecords";

const StrengthRecordsPanel = ({
  strengthRecords,
  isSimpleView,
  styleClassName,
}) => {
  const navigate = useNavigate();
  const [isAddNewRecordVisible, setIsAddNewRecordVisible] = useState(false);
  const { powerliftsRecords, otherLiftsRecords, isDataLoading } =
    useOrganizeStrengthRecords(strengthRecords);

  const handleAddNewRecord = () => {
    setIsAddNewRecordVisible(true);
  };

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

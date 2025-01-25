import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StrengthRecordsDisplay from "../Shared/StrengthRecords/StrengthRecordsDisplay";
import NewStrengthRecord from "./NewStrengthRecord";
import PanelHeader from "../PanelHeader/PanelHeader";
import useOrganizeStrengthRecords from "./useOrganizeStrengthRecords";
import Button from "@mui/material/Button";
import "./StrengthRecordsPanel.css";

const StrengthRecordsPanel = ({
  strengthRecords,
  isSimpleView,
  styleClassName,
}) => {
  const navigate = useNavigate();
  const [isAddNewRecordVisible, setIsAddNewRecordVisible] = useState(false);
  const { powerliftsRecords, otherLiftsRecords, isDataLoading } =
    useOrganizeStrengthRecords(strengthRecords);

  const containerClass =
    styleClassName === "body-measurements"
      ? "strength-records-dashboard-page bg-containers"
      : "strength-records-page";

  const handleAddNewRecord = () => {
    setIsAddNewRecordVisible(true);
  };

  const handleEdit = () => {
    navigate("/strength-records");
  };

  return (
    <div className={containerClass}>
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
            <Button
              className="user-details-button"
              variant="outlined"
              sx={{
                color: "green",
                borderColor: "green",
                "&:hover": {
                  backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
                  borderColor: "green",
                },
              }}
              onClick={handleEdit}
            >
              Go To
            </Button>
          )}
          {!isSimpleView && !isAddNewRecordVisible && (
            <div className="sr-button-container">
              <Button
                onClick={handleAddNewRecord}
                className="user-details-button sr-add-new-record-button"
                variant="outlined"
                size="large"
                sx={{
                  color: "green",
                  borderColor: "green",
                  "&:hover": {
                    backgroundColor: "rgba(5, 100, 8, 0.1)", // Very light green background on hover
                    borderColor: "green",
                  },
                }}
              >
                Add New Record
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StrengthRecordsPanel;

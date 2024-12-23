import React from "react";
import { useSelector } from "react-redux";
import Layout from "shared/components/Layout";
import StrengthRecordsPanel from "features/users/components/StrengthRecordsPanel/StrengthRecordsPanel";
import "./StrengthRecords.css";

const StrengthRecords = () => {
  const strengthRecords = useSelector((state) => state.strengthRecords.records);
  const isLoading = useSelector((state) => state.strengthRecords.loading);

  return (
    <Layout title={"EvolveLogix | Records"}>
      <div className="strength-records">
        <div className="records-header-container">
          <h1>Strength Records</h1>
        </div>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <StrengthRecordsPanel
            strengthRecords={strengthRecords}
            styleClassName={"strength-records-container"}
          ></StrengthRecordsPanel>
        )}
      </div>
    </Layout>
  );
};

export default StrengthRecords;

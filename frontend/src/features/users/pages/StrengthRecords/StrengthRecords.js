import React from "react";
import "./StrengthRecords.css";
import Layout from "components/shared/Layout";
import { useSelector } from "react-redux";
import Records from "features/users/components/StrengthRecords/Records";
// frontend/src/features/users/components/StrengthRecords.js
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
          <Records
            strengthRecords={strengthRecords}
            styleClassName={"strength-records-container"}
          ></Records>
        )}
      </div>
    </Layout>
  );
};

export default StrengthRecords;

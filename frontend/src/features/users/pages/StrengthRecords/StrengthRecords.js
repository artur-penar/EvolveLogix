import React from "react";
import "./StrengthRecords.css";
import Layout from "components/shared/Layout";
import { useSelector } from "react-redux";

const StrengthRecords = () => {
  const strengthRecords = useSelector(
    (state) => state.strengthRecordState.strengthRecords
  );

  console.log("Strength Records page");
  console.log(strengthRecords);
  return (
    <Layout title={"EvolveLogix | Records"}>
      <div className="strength-records">
        <div className="records-header-container">
          <h1>Strength Records</h1>
        </div>
        <p>Strength records!</p>
      </div>
    </Layout>
  );
};

export default StrengthRecords;

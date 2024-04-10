import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import React from "react";
import "./TrainingCycle.css";

const TrainingCycle = () => {
  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="training-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
        <label>Macro cycle:</label>
      </div>
    </Layout>
  );
};

export default TrainingCycle;

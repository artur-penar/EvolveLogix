import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingLogs } from "../../log";
import GroupedTrainingSessions from "./components/GroupedTrainingSessions";
import Layout from "shared/components/Layout";
import PageHeader from "shared/components/PageHeader";
import "./ViewTrainingLogs.css";

const ViewTrainingLogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingLogs());
  }, []);

  // Fetch current selected training log
  const selectedTrainingLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );
  const trainingSessions = selectedTrainingLog.training_sessions;
  const loading = useSelector((state) => state.log.loading);

  return (
    <Layout title="EvolveLogix | Training Log">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="view-training-logs-container">
          <PageHeader headerContent={selectedTrainingLog.name} />
          <GroupedTrainingSessions trainingSessions={trainingSessions} />
        </div>
      )}
    </Layout>
  );
};

export default ViewTrainingLogsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingLog } from "./log";
import Layout from "components/shared/Layout";

const TrainingLogDashboardPage = () => {
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);

  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  if (loading) {
    console.log("Loading...");
  } else {
    console.log("Training logs");
    console.log(trainingLogsData);
  }

  return (
    <Layout title="PerformanceTracker| Training Log">
      <h1>Training Log Dashboard</h1>
    </Layout>
  );
};

export default TrainingLogDashboardPage;

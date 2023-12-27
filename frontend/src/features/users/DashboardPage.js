import React, { useEffect, useState } from "react";
import Layout from "components/shared/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserAuthenticated, selectUser } from "features/users/user";
import { Navigate } from "react-router-dom";
import { getTrainingLogs } from "features/trainingLogs/log";
import NewLogForm from "./components/NewLogForm";
import LoadingState from "components/shared/LoadingState";
import "./DashboardPage.css";

const DashboardPage = () => {
  // Redux state selectors
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);

  // State variables
  const [selectedLog, setSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");

  // Redux dispatch
  const dispatch = useDispatch();

  // Side effects
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTrainingLogs());
      if (trainingLogs.length > 0) {
        setSelectedLog(trainingLogs[0].name);
      }
    }
  }, [dispatch]);

  if (!isAuthenticated && !loading) return <Navigate to="/login" />;

  const handleChange = (e) => {
    setSelectedLog(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submited");
  };

  return (
    <Layout title="PerformanceTracker | Dashboard">
      {loading || !user || !trainingLogs ? (
        <LoadingState />
      ) : (
        <>
          <h1>Current log:</h1>
          <select onChange={handleChange} value={selectedLog}>
            {trainingLogs.map((log, index) => (
              <option key={index} value={log.name}>
                {log.name}
              </option>
            ))}
          </select>

          <NewLogForm
            newLogName={newLogName}
            setNewLogName={setNewLogName}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </Layout>
  );
};

export default DashboardPage;

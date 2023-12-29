import React, { useEffect, useState } from "react";
import Layout from "components/shared/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserAuthenticated, selectUser } from "features/users/user";
import { Navigate } from "react-router-dom";
import log, {
  createTrainingLog,
  getTrainingLogs,
  setSelectedTrainingLog,
} from "features/trainingLogs/log";
import NewLogForm from "./components/NewLogForm";
import LoadingState from "components/shared/LoadingState";
import "./DashboardPage.css";
import LogDetails from "./components/LogDetails";
import LogSelector from "./components/LogSelector";

const DashboardPage = () => {
  // Redux state selectors
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);
  const trainingLogss = [];
  // State variables
  const [selectedLog, setSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");
  const [showNewLogForm, setShowNewLogForm] = useState(false);
  // Redux dispatch
  const dispatch = useDispatch();

  // Side effects
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTrainingLogs());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (trainingLogs.length > 0) {
      const firstLogName = trainingLogs[0].name;
      setSelectedLog(firstLogName);
      dispatch(setSelectedTrainingLog(trainingLogs[0]));
    }
  }, [dispatch, trainingLogs]);

  if (!isAuthenticated && !loading) return <Navigate to="/login" />;

  const handleChange = (e) => {
    const selectedLogName = e.target.value;
    const selectedLog = trainingLogs.find(
      (log) => log.name === selectedLogName
    );

    setSelectedLog(selectedLogName);
    console.log("Selected log:");
    console.log(selectedLog);
    dispatch(setSelectedTrainingLog(selectedLog));
  };

  const handleSubmit = () => {
    dispatch(createTrainingLog({ name: newLogName }));
    console.log("Submited");
  };

  return (
    <Layout title="PerformanceTracker | Dashboard">
      {loading || !user ? (
        <LoadingState />
      ) : (
        <div className="dashboard">
          <h1 className="dashboard-title">Dashboard</h1>
          <h2 className="dashboard-subtitle">Current log:</h2>
          {trainingLogs.length > 0 ? (
            <>
              <LogSelector
                trainingLogs={trainingLogs}
                selectedLog={selectedLog}
                handleChange={handleChange}
              />
              <LogDetails />
            </>
          ) : (
            <p>Log has no logs Create yout first log! </p>
          )}
          <div className="create-log">
            <button
              className="dashboard-button"
              onClick={() => setShowNewLogForm(!showNewLogForm)}
            >
              {showNewLogForm ? "Create New Log ʌ" : "Create New Log v"}
            </button>

            {showNewLogForm && (
              <NewLogForm
                newLogName={newLogName}
                setNewLogName={setNewLogName}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;

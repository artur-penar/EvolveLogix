// External libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

// Internal modules
import Layout from "components/shared/Layout";
import LoadingState from "components/shared/LoadingState";
import {
  createTrainingLog,
  getTrainingLogs,
  setSelectedTrainingLog,
} from "features/trainingLogs/log";
import {
  getUserDetail,
  selectIsUserAuthenticated,
  selectUser,
} from "features/users/user";
import LogDetails from "./components/UserDetail";
import LogSelector from "./components/LogSelector";
import NewLogForm from "./components/NewLogForm";
import "./DashboardPage.css";

const DashboardPage = () => {
  // Redux state selectors
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const user = useSelector(selectUser);
  const userDetail = useSelector((state) => state.user.userDetail);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);
  const selectedTrainingLogName =
    useSelector((state) =>
      state.log.selectedTrainingLog ? state.log.selectedTrainingLog.name : null
    ) || null;
  const trainingLogss = [];

  // State variables
  const [selectedLog, setSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");
  const [isNewLogFormVisable, setIsNewLogFormVisable] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Side effects
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (!userDetail) {
      console.log("DashboardPage: dispatching getUserDetail()");
      console.log(user);
      dispatch(getUserDetail(user.id));
    } else {
      console.log("DashboardPage: dont dispatch getUserDetail()");
      console.log(userDetail);
    }

    if (trainingLogs.length === 0) {
      console.log("DashboardPage: dispatching getTrainingLogs()");
      dispatch(getTrainingLogs());
    } else {
      console.log("DashboardPage: dont dispatch getTrainingLogs()");
      console.log(trainingLogs);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedTrainingLogName) {
      setSelectedLog(selectedTrainingLogName);
    } else if (trainingLogs.length > 0) {
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

          {trainingLogs.length > 0 ? (
            <>
              <h2 className="dashboard-subtitle">Current log:</h2>
              <LogSelector
                trainingLogs={trainingLogs}
                selectedLog={selectedLog}
                handleChange={handleChange}
              />
              <LogDetails userDetail={userDetail} />
            </>
          ) : (
            <p>Log has no logs Create yout first log! </p>
          )}
          <div className="create-log">
            <button
              className="dashboard-button"
              onClick={() => setIsNewLogFormVisable(!isNewLogFormVisable)}
            >
              {isNewLogFormVisable ? "Create New Log ʌ" : "Create New Log v"}
            </button>

            {isNewLogFormVisable && (
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

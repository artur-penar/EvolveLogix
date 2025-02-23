// External libraries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Shared components
import Layout from "shared/components/Layout";
import LoadingState from "shared/components/LoadingState";
import PageHeader from "../../../../shared/components/PageHeader";

// Features
import { setSelectedTrainingLog } from "features/trainingLogs/log";
import { selectUser } from "features/users/user";

// Local components
import UserInfoPanel from "../../components/UserInfoPanel/UserInfoPanel";
import NoLogsPanel from "features/users/components/NoLogsPanel/NoLogsPanel";
import TrainingLogPanel from "features/users/components/TrainingLogPanel/TrainingLogPanel";

// Hooks
import useAuth from "shared/hooks/useAuth";
import { useFetchExercises } from "shared/hooks/useFetchExercises";
import useFetchUserDetails from "../../hooks/Dashboard/useFetchUserDetails";
import useFetchTrainingLogs from "../../hooks/Dashboard/useFetchTrainingLogs";
import useFetchStrengthRecords from "../../hooks/Dashboard/useFetchStrengthRecords";
import useSetInitialTrainingLog from "../../hooks/Dashboard/useSetInitialTrainingLog";
import useSyncTrainingLog from "../../hooks/Dashboard/useSyncTrainingLog";

// Handlers
import handleTrainingLogChange from "../../handlers/Dashboard/handleTrainingLogChange";
import handleCreateTrainingLog from "../../handlers/Dashboard/handleCreateTrainingLog";

// Styles
import "./DashboardPage.css";
const DashboardPage = () => {
  // Redux state selectors
  const user = useSelector(selectUser);
  const userDetails = useSelector((state) => state.user.userDetails);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);
  const strengthRecords = useSelector((state) => state.strengthRecords.records);
  const reduxSelectedLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );

  // State variables
  const [localSelectedLog, setLocalSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");

  // Redux dispatch
  const dispatch = useDispatch();

  // Custom hooks
  useAuth();
  useFetchExercises();
  useFetchUserDetails(userDetails);
  useFetchTrainingLogs(trainingLogs);
  useFetchStrengthRecords(strengthRecords);
  useSyncTrainingLog(localSelectedLog, reduxSelectedLog, setLocalSelectedLog);
  useSetInitialTrainingLog(
    trainingLogs,
    reduxSelectedLog,
    setLocalSelectedLog,
    setSelectedTrainingLog
  );

  // Handlers
  const handleLogChange = (e) =>
    handleTrainingLogChange(e, trainingLogs, setLocalSelectedLog, dispatch);
  const handleSubmit = () => handleCreateTrainingLog(dispatch, newLogName);

  // Data objects
  const logData = {
    trainingLogs,
    localSelectedLog,
    handleChange: handleLogChange,
  };

  const formData = {
    newLogName,
    setNewLogName,
    handleSubmit,
  };

  if (loading || !user) {
    return (
      <Layout title="EvolveLogix | Dashboard">
        <LoadingState />
      </Layout>
    );
  }

  return (
    <Layout title="EvolveLogix | Dashboard">
      <div className="dashboard">
        <PageHeader headerContent={"Dashboard"} />
        {trainingLogs.length > 0 && userDetails ? (
          <>
            <TrainingLogPanel logData={logData} formData={formData} />
            <UserInfoPanel
              userDetails={userDetails}
              strengthRecords={strengthRecords}
            />
          </>
        ) : (
          <NoLogsPanel formData={formData} />
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;

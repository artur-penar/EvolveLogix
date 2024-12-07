// External libraries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styles
import "./DashboardPage.css";

// Shared components
import Layout from "shared/components/Layout";
import LoadingState from "shared/components/LoadingState";
import Header from "../../../../shared/components/PageHeader";

// Features
import { setSelectedTrainingLog } from "features/trainingLogs/log";
import { selectUser } from "features/users/user";
import NewLogForm from "features/users/components/NewLogForm";
import TrainingLogPanel from "features/users/components/TrainingLogPanel";

// Local components
import UserInfoPanel from "../../components/UserInfoPanel";

// Hooks
import useAuth from "shared/hooks/useAuth";
import { useFetchExercises } from "shared/hooks/useFetchExercises";
import useFetchUserDetails from "./hooks/useFetchUserDetails";
import useFetchTrainingLogs from "./hooks/useFetchTrainingLogs";
import useFetchStrengthRecords from "./hooks/useFetchStrengthRecords";
import useSetInitialTrainingLog from "./hooks/useSetInitialTrainingLog";
import useSyncTrainingLog from "./hooks/useSyncTrainingLog";

// Handlers
import handleTrainingLogChange from "./handlers/handleTrainingLogChange";
import handleCreateTrainingLog from "./handlers/handleCreateTrainingLog";

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

  return (
    <Layout title="EvolveLogix | Dashboard">
      {loading || !user ? (
        <LoadingState />
      ) : (
        <div className="dashboard">
          <Header headerContent={"Dashboard"} />
          {trainingLogs.length > 0 && userDetails ? (
            <>
              <TrainingLogPanel logData={logData} formData={formData} />
              <UserInfoPanel
                userDetails={userDetails}
                strengthRecords={strengthRecords}
              />
            </>
          ) : (
            <>
              <p className="tcf-info">No logs found. Create your first log!</p>
              <div className="new-log-form-container">
                <NewLogForm formData={formData} />
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;

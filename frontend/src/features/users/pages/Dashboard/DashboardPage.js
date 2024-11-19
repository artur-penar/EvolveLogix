// External libraries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styles
import "./DashboardPage.css";

// Shared components
import Layout from "shared/components/Layout";
import LoadingState from "shared/components/LoadingState";

// Features
import { setSelectedTrainingLog } from "features/trainingLogs/log";
import { selectUser } from "features/users/user";

// Local components
import Header from "../../../../shared/components/PageHeader";
import UserInfoPanel from "../../components/UserInfoPanel";
import NewLogForm from "features/users/components/NewLogForm";
import useAuth from "shared/hooks/useAuth";
import useFetchUserDetails from "./hooks/useFetchUserDetails";
import useFetchTrainingLogs from "./hooks/useFetchTrainingLogs";
import useFetchStrengthRecords from "./hooks/useFetchStrengthRecords";
import { useFetchExercises } from "shared/hooks/useFetchExercises";
import useSetInitialTrainingLog from "./hooks/useSetInitialTrainingLog";
import useSyncTrainingLog from "./hooks/useSyncTrainingLog";
import handleTrainingLogChange from "./handlers/handleTrainingLogChange";
import handleCreateTrainingLog from "./handlers/handleCreateTrainingLog";
import TrainingLogPanel from "features/users/components/TrainingLogPanel";

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

  const logData = {
    trainingLogs,
    localSelectedLog,
    handleChange: (e) =>
      handleTrainingLogChange(e, trainingLogs, setLocalSelectedLog, dispatch),
  };

  const formData = {
    newLogName,
    setNewLogName,
    handleSubmit: () => handleCreateTrainingLog(dispatch, newLogName),
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
              <p>Log has no logs Create your first log! </p>
              <NewLogForm
                newLogName={newLogName}
                setNewLogName={setNewLogName}
                handleSubmit={() =>
                  handleCreateTrainingLog(dispatch, newLogName)
                }
              />
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;

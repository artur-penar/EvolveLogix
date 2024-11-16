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
import Main from "../../components/DashboardMain";
import Footer from "../../components/DashboardFooter";
import NewLogForm from "features/users/components/NewLogForm";
import useAuth from "shared/hooks/useAuth";
import useFetchUserDetail from "./hooks/useFetchUserDetail";
import useFetchTrainingLogs from "./hooks/useFetchTrainingLogs";
import useFetchStrengthRecords from "./hooks/useFetchStrengthRecords";
import { useFetchExercises } from "shared/hooks/useFetchExercises";
import useSetInitialTrainingLog from "./hooks/useSetInitialTrainingLog";
import useSyncTrainingLog from "./hooks/useSyncTrainingLog";
import handleTrainingLogChange from "./handlers/handleTrainingLogChange";
import handleCreateTrainingLog from "./handlers/handleCreateTrainingLog";

const DashboardPage = () => {
  // Redux state selectors
  const user = useSelector(selectUser);
  const userDetail = useSelector((state) => state.user.userDetail);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);
  const strengthRecords = useSelector((state) => state.strengthRecords.records);
  const reduxSelectedLog = useSelector(
    (state) => state.log.selectedTrainingLog
  );

  // State variables
  const [localSelectedLog, setLocalSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");
  const [isNewLogFormVisible, setIsNewLogFormVisible] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  useAuth();
  useFetchExercises();
  useFetchUserDetail(userDetail);
  useFetchTrainingLogs(trainingLogs);
  useFetchStrengthRecords(strengthRecords);
  useSyncTrainingLog(localSelectedLog, reduxSelectedLog, setLocalSelectedLog);

  useSetInitialTrainingLog(
    trainingLogs,
    reduxSelectedLog,
    setLocalSelectedLog,
    setSelectedTrainingLog
  );

  return (
    <Layout title="EvolveLogix | Dashboard">
      {loading || !user ? (
        <LoadingState />
      ) : (
        <div className="dashboard">
          <Header headerContent={"Dashboard"} />
          {trainingLogs.length > 0 && userDetail ? (
            <>
              <Main
                trainingLogs={trainingLogs}
                selectedLog={localSelectedLog}
                handleChange={(e) =>
                  handleTrainingLogChange(
                    e,
                    trainingLogs,
                    setLocalSelectedLog,
                    dispatch
                  )
                }
                userDetail={userDetail}
                strengthRecords={strengthRecords}
              />
              <Footer
                isNewLogFormVisible={isNewLogFormVisible}
                setIsNewLogFormVisible={setIsNewLogFormVisible}
                newLogName={newLogName}
                setNewLogName={setNewLogName}
                handleSubmit={() =>
                  handleCreateTrainingLog(dispatch, newLogName)
                }
              />
            </>
          ) : (
            <>
              <p>Log has no logs Create your first log! </p>
              <NewLogForm
                newLogName={newLogName}
                setNewLogName={setNewLogName}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;

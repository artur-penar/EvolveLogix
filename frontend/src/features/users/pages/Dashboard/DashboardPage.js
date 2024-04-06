// External libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

// Styles
import "./DashboardPage.css";

// Shared components
import Layout from "components/shared/Layout";
import LoadingState from "components/shared/LoadingState";

// Features
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

// Local components
import Header from "../../components/DashboardHeader";
import Main from "../../components/DashboardMain";
import Footer from "../../components/DashboardFooter";
import { getAllStrengthRecords } from "features/users/strengthRecordSlice";

const DashboardPage = () => {
  // Redux state selectors
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const user = useSelector(selectUser);
  const userDetail = useSelector((state) => state.user.userDetail);
  const loading = useSelector((state) => state.user.loading);
  const trainingLogs = useSelector((state) => state.log.trainingLogs);
  const strengthRecords = useSelector((state) => state.strengthRecords.records);

  const selectedTrainingLogName =
    useSelector((state) =>
      state.log.selectedTrainingLog ? state.log.selectedTrainingLog.name : null
    ) || null;

  // State variables
  const [selectedLog, setSelectedLog] = useState("");
  const [newLogName, setNewLogName] = useState("");
  const [isNewLogFormVisible, setIsNewLogFormVisible] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Side effects
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (!userDetail) {
      dispatch(getUserDetail());
    }

    if (trainingLogs.length === 0) {
      dispatch(getTrainingLogs());
    }

    if (strengthRecords.length === 0) {
      dispatch(getAllStrengthRecords());
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
  };

  return (
    <Layout title="EvolveLogix | Dashboard">
      {loading || !user ? (
        <LoadingState />
      ) : (
        <div className="dashboard">
          <Header user={user} />
          {trainingLogs.length > 0 ? (
            <Main
              trainingLogs={trainingLogs}
              selectedLog={selectedLog}
              handleChange={handleChange}
              userDetail={userDetail}
              strengthRecords={strengthRecords}
            />
          ) : (
            <p>Log has no logs Create your first log! </p>
          )}
          <Footer
            isNewLogFormVisible={isNewLogFormVisible}
            setIsNewLogFormVisible={setIsNewLogFormVisible}
            newLogName={newLogName}
            setNewLogName={setNewLogName}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
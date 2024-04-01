import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Import components
// trainingLogs components
import AddTrainingSessionPage from "features/trainingLogs/pages/AddTrainingSession/AddTrainingSession";
import ExerciseListPage from "features/trainingLogs/pages/ExerciseListPage";
import ViewTrainingLogsPage from "features/trainingLogs/pages/ViewTrainingLogsPage";
import TrainingLogDashboardPage from "features/trainingLogs/pages/TrainingLogDashboard/TrainingLogDashboard";
// user components
import DashboardPage from "features/users/pages/Dashboard/DashboardPage";
import HomePage from "features/users/pages/HomePage/HomePage";
import LoginPage from "features/users/pages/LoginPage/LoginPage";
import RegisterPage from "features/users/pages/RegisterPage/RegisterPage";

// Import actions
import { verifyAuth } from "features/users/user";
import EditTrainingSessionPage from "features/trainingLogs/pages/AddTrainingSession/EditTrainingSession";

import backgroundImage from "./images/evolve_eagle.jpg";
import secondBackgroundImage from "./images/evolve_background.jpg";
import StrengthRecords from "features/users/pages/StrengthRecords/StrengthRecords";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

  return (
    <div
      // style={{
        // backgroundColor: "green", // This will set the background color to green
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // backgroundAttachment: "fixed",
        // backgroundSize: "cover",
        // height: "100vh",
      // }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/exercises" element={<ExerciseListPage />} />
          <Route path="/training-log" element={<TrainingLogDashboardPage />} />
          <Route path="/view-logs" element={<ViewTrainingLogsPage />} />
          <Route path="/add-log" element={<AddTrainingSessionPage />} />
          <Route path="/strength-records" element={<StrengthRecords/>} />
          <Route
            path="/edit-training-session/:id"
            element={<EditTrainingSessionPage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

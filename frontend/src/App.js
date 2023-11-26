import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Import components
// trainingLogs components
import AddTrainingSessionPage from "features/trainingLogs/pages/AddTrainingSession/AddTrainingSessionPage";
import ExerciseListPage from "features/trainingLogs/pages/ExerciseListPage";
import ViewTrainingLogsPage from "features/trainingLogs/pages/ViewTrainingLogsPage";
import TrainingLogDashboardPage from "features/trainingLogs/pages/TrainingLogDashboard/TrainingLogDashboardPage";
// user components
import DashboardPage from "features/users/DashboardPage";
import HomePage from "features/users/HomePage";
import LoginPage from "features/users/LoginPage";
import RegisterPage from "features/users/RegisterPage";

// Import actions
import { verifyAuth } from "features/users/user";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyAuth());
  }, []);

  return (
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
      </Routes>
    </Router>
  );
};

export default App;

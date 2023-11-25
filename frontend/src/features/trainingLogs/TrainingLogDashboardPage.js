import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingLog } from "./log";
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const TrainingLogDashboardPage = () => {
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);

  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  const handleDateClick = (info) => {
    alert('Clicked on: ' + info.dateStr);
  };

  if (loading) {
    console.log("Loading...");
  } else {
    console.log("Training logs");
    console.log(trainingLogsData);
  }

  return (
    <Layout title="PerformanceTracker| Training Log">
      <h1>Training Log Dashboard</h1>
      <div style={{ width: "800px", height: "600px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // include the interactionPlugin
          initialView="dayGridMonth"
          dateClick={handleDateClick}
        />
      </div>
    </Layout>
  );
};

export default TrainingLogDashboardPage;
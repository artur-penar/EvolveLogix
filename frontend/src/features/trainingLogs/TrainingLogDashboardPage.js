import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getTrainingLog } from "./log";
import "./TrainingLogDashboardPage.css";

const TrainingLogDashboardPage = () => {
  const dispatch = useDispatch();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrainingLog());
  }, []);

  const handleDateClick = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-log", { state: { selectedDate: date.dateStr } });
  };

  return (
    <Layout title="PerformanceTracker| Training Log">
      <h1>Training Log Dashboard</h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div style={{ width: "800px", height: "600px" }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // include the interactionPlugin
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            firstDay={1}
            events={
              [
                // { title: "[Done] Day A", date: "2023-10-30", color: "green" },
                // { title: "[Done] Day B", date: "2023-11-01", color: "green" },
                // { title: "[Done] Day C", date: "2023-11-03", color: "green" },
                // { title: "[Done] Day A", date: "2023-11-06", color: "green" },
                // { title: "[Done] Day B", date: "2023-11-07", color: "green" },
                // { title: "[Done] Day C", date: "2023-11-10", color: "green" },
                // { title: "[Miss] Day A", date: "2023-11-14", color: "grey" },
                // { title: "[Done] Day B", date: "2023-11-15", color: "green" },
                // { title: "[Done] Day C", date: "2023-11-17", color: "green" },
                // { title: "[Done] Day A", date: "2023-11-19", color: "green" },
                // { title: "[Done] Day B", date: "2023-11-21", color: "green" },
                // { title: "[Done] Day C", date: "2023-11-23", color: "green" },
                // { title: "[ToDo] Day A", date: "2023-11-27" },
                // { title: "[ToDo] Day B", date: "2023-11-29" },
                // { title: "[ToDo] Day C", date: "2023-12-01" },
              ]
            }
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/shared/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getTrainingLog } from "features/trainingLogs/log";
import TrainingLogDashboardModal from "./TrainingLogDashboardModal";
import "./TrainingLogDashboard.css";

const TrainingLogDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainingLogsData = useSelector((state) => state.log.trainingLogs);
  const loading = useSelector((state) => state.log.loading);
  const [eventData, setEventData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTrainingLog());

    console.log(eventData);
  }, []);

  useEffect(() => {
    if (Array.isArray(trainingLogsData) && trainingLogsData.length > 0) {
      setEventData(
        trainingLogsData.flatMap((logData) =>
          logData.training_sessions.map((session) => ({
            title: session.comment,
            date: session.date,
            color: "green",
            ...session,
          }))
        )
      );
    }
    console.log(eventData);
  }, [trainingLogsData]);

  const handleDateClick = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-log", { state: { selectedDate: date.dateStr } });
  };

  const handleEventClic = (e) => {
    setModalIsOpen(true);
    console.log(e.event.extendedProps.exercises.map((exercise) => exercise));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Layout title="PerformanceTracker| Training Log">
      <h1>Training Log Dashboard</h1>
      {loading || !trainingLogsData ? (
        <div
          style={{
            display: "flex",
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
            eventClick={handleEventClic}
            firstDay={1}
            events={eventData}
          />
          <TrainingLogDashboardModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;

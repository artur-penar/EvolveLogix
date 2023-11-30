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
  const [eventsData, setEventsData] = useState();
  const [clickedEventData, setClickedEventData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTrainingLog());
    console.log("First useEffect eventsData");
    console.log(eventsData);
  }, []);

  useEffect(() => {
    if (Array.isArray(trainingLogsData) && trainingLogsData.length > 0) {
      setEventsData(
        trainingLogsData.flatMap((logData) =>
          logData.training_sessions.map((session) => ({
            title: session.comment,
            date: session.date,
            color: "green",
            extendedProps: {
              ...session,
            },
          }))
        )
      );
    }
    console.log("Second useEffect eventsData");
    console.log(eventsData);
  }, [trainingLogsData]);

  const handleDateClick = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-log", { state: { selectedDate: date.dateStr } });
  };

  const handleEventClick = (e) => {
    setModalIsOpen(true);
    const { date, comment, exercises } = e.event.extendedProps;
    console.log("Data from handleEventClick");
    console.log({ date, comment, exercises });
    setClickedEventData({ date, comment, exercises });
  };

  const handleEditClick = () => {
    // const trainingData = e[0].map((exercise) => exercise);
    console.log(clickedEventData);
    const trainingData = clickedEventData;

    navigate("/add-log", { state: { trainingData } });
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
            eventClick={handleEventClick}
            firstDay={1}
            events={eventsData}
          />
          <TrainingLogDashboardModal
            isOpen={modalIsOpen}
            handleEdit={handleEditClick}
            closeModal={closeModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default TrainingLogDashboardPage;
